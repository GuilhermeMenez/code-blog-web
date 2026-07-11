#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const lockFilePath = path.join(rootDir, "package-lock.json");
const packageFilePath = path.join(rootDir, "package.json");
const compromisedListPath = path.join(rootDir, "security", "tanstack-compromised-versions.txt");

const IOC_PATTERNS = [
  { id: "tanstack-optional-dependency", severity: "high", regex: /github:tanstack\/router#/i },
  { id: "tanstack-setup-package", severity: "high", regex: /@tanstack\/setup/i },
  { id: "router-init-js", severity: "high", regex: /router_init\.js/i },
  { id: "hidden-sshd-drop-path", severity: "high", regex: /\/tmp\/\.sshd/i },
  { id: "known-malicious-repo", severity: "high", regex: /systemd-network-helper-aa5c75f/i },
  { id: "known-malicious-actor", severity: "high", regex: /parikhpreyash4/i },
  { id: "suspicious-curl-fragment", severity: "high", regex: /curl\s+-skL/i },
  { id: "suspicious-chmod-fragment", severity: "high", regex: /chmod\s+\+x\s+\/tmp\/\.sshd/i },
  { id: "fake-cache-sync-step", severity: "high", regex: /Dependency Cache Sync/i },
];

const SUSPICIOUS_SCRIPT_PATTERNS = [
  /curl\s+/i,
  /wget\s+/i,
  /Invoke-WebRequest/i,
  /powershell\s+-enc/i,
  /bash\s+-c/i,
  /chmod\s+\+x/i,
  /\/tmp\/\.sshd/i,
  /router_init\.js/i,
];

const FILE_NAME_IOC_PATTERNS = [
  /(^|[\\/])\.sshd$/i,
  /(^|[\\/])router_init\.js$/i,
  /systemd-network-helper-aa5c75f/i,
];

const EXCLUDED_DIRS = new Set(["node_modules", ".git", "dist", "coverage", ".turbo", ".next"]);

// Dependency version prefixes that resolve via git — known supply chain vector.
// The TanStack May/2026 incident used github: scheme in optionalDependencies.
const GIT_SCHEME_PREFIXES = ["github:", "git+", "git://", "bitbucket:", "gitlab:"];

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function safeReadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`ERROR: could not parse ${filePath}: ${error.message}`);
    process.exit(2);
  }
}

function safeReadText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function collectFiles(currentDir, out) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(currentDir, entry.name);
    const relativePath = toPosix(path.relative(rootDir, absolutePath));

    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.has(entry.name)) {
        collectFiles(absolutePath, out);
      }
      continue;
    }

    out.push({ absolutePath, relativePath });
  }
}

function loadCompromisedSet() {
  const lines = safeReadText(compromisedListPath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  return new Set(lines);
}

function isExactVersion(version) {
  return /^[0-9]+\.[0-9]+\.[0-9]+(?:-[A-Za-z0-9.-]+)?(?:\+[A-Za-z0-9.-]+)?$/.test(version);
}

function checkExactVersions(packageJson, findings) {
  const fields = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

  for (const field of fields) {
    const deps = packageJson[field] || {};
    for (const [name, version] of Object.entries(deps)) {
      if (!isExactVersion(String(version))) {
        findings.push({
          severity: "medium",
          source: "package.json",
          message: `${field}.${name} is not exact (${version})`,
        });
      }
    }
  }
}

function checkGitSchemeDependencies(packageJson, findings) {
  const fields = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

  for (const field of fields) {
    const deps = packageJson[field] || {};
    for (const [name, version] of Object.entries(deps)) {
      const v = String(version);
      if (GIT_SCHEME_PREFIXES.some((prefix) => v.startsWith(prefix))) {
        findings.push({
          severity: "high",
          source: "package.json",
          message: `${field}.${name} resolves via git scheme (${v}) — known supply chain vector`,
        });
      }
    }
  }
}

function checkNpmrcIntegrity(findings) {
  const npmrcPath = path.join(rootDir, ".npmrc");
  const content = safeReadText(npmrcPath);

  if (!content.trim()) {
    findings.push({
      severity: "high",
      source: ".npmrc",
      message: ".npmrc not found or empty — ignore-scripts protection may be inactive",
    });
    return;
  }

  const lines = content.split(/\r?\n/).map((l) => l.trim());
  const hasIgnoreScripts = lines.some((l) => l === "ignore-scripts=true");

  if (!hasIgnoreScripts) {
    findings.push({
      severity: "high",
      source: ".npmrc",
      message: "ignore-scripts=true not found in .npmrc — lifecycle script protection is inactive",
    });
  }
}

function checkScripts(packageJson, findings) {
  const scripts = packageJson.scripts || {};
  for (const [scriptName, scriptValue] of Object.entries(scripts)) {
    const script = String(scriptValue);
    if (SUSPICIOUS_SCRIPT_PATTERNS.some((pattern) => pattern.test(script))) {
      findings.push({
        severity: "high",
        source: "package.json",
        message: `script ${scriptName} contains suspicious fragment`,
      });
    }
  }
}

function scanLockForIocs(lockText, findings) {
  for (const ioc of IOC_PATTERNS) {
    if (ioc.regex.test(lockText)) {
      findings.push({
        severity: ioc.severity,
        source: "package-lock.json",
        message: `detected IOC pattern: ${ioc.id}`,
      });
    }
  }
}

function scanWorkflowAndConfigFiles(findings) {
  const targetFiles = [
    "package.json",
    "package-lock.json",
    ".npmrc",
    ".github/workflows",
    ".github/actions",
  ];

  const files = [];
  collectFiles(rootDir, files);

  for (const file of files) {
    if (
      !targetFiles.some((target) =>
        file.relativePath === target || file.relativePath.startsWith(`${target}/`)
      )
    ) {
      continue;
    }

    for (const namePattern of FILE_NAME_IOC_PATTERNS) {
      if (namePattern.test(file.relativePath)) {
        findings.push({
          severity: "high",
          source: file.relativePath,
          message: "suspicious file name matched known IOC",
        });
      }
    }

    const text = safeReadText(file.absolutePath);
    for (const ioc of IOC_PATTERNS) {
      if (ioc.regex.test(text)) {
        findings.push({
          severity: ioc.severity,
          source: file.relativePath,
          message: `detected IOC pattern: ${ioc.id}`,
        });
      }
    }
  }
}

function checkCompromisedTanstackVersions(lockJson, compromisedSet, findings) {
  const packages = lockJson.packages || {};

  for (const [packagePath, meta] of Object.entries(packages)) {
    if (!packagePath.startsWith("node_modules/@tanstack/")) {
      continue;
    }

    const packageName = packagePath.replace(/^node_modules\//, "");
    const version = meta && meta.version ? String(meta.version) : "";
    if (!version) {
      continue;
    }

    const key = `${packageName}@${version}`;
    if (compromisedSet.has(key)) {
      findings.push({
        severity: "high",
        source: "package-lock.json",
        message: `compromised TanStack version detected: ${key}`,
      });
    }
  }
}

function printSummary(findings) {
  const high = findings.filter((f) => f.severity === "high");
  const medium = findings.filter((f) => f.severity === "medium");

  console.log("Supply chain scan summary");
  console.log(`- high findings: ${high.length}`);
  console.log(`- medium findings: ${medium.length}`);

  if (findings.length > 0) {
    console.log("\nFindings:");
    for (const finding of findings) {
      console.log(`- [${finding.severity}] ${finding.source}: ${finding.message}`);
    }
  } else {
    console.log("\nNo suspicious IOC or compromised TanStack versions detected.");
  }

  if (high.length > 0) {
    console.error("\nScan failed due to high-severity findings.");
    process.exit(1);
  }

  process.exit(0);
}

function main() {
  const findings = [];

  const packageJson = safeReadJson(packageFilePath);
  const lockJson = safeReadJson(lockFilePath);
  const lockText = safeReadText(lockFilePath);

  const compromisedSet = loadCompromisedSet();

  checkExactVersions(packageJson, findings);
  checkGitSchemeDependencies(packageJson, findings);
  checkScripts(packageJson, findings);
  scanLockForIocs(lockText, findings);
  scanWorkflowAndConfigFiles(findings);
  checkCompromisedTanstackVersions(lockJson, compromisedSet, findings);
  checkNpmrcIntegrity(findings);

  printSummary(findings);
}

main();
