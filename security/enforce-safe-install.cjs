#!/usr/bin/env node

function getNpmCommand() {
  if (process.env.npm_command) {
    return process.env.npm_command;
  }

  const rawArgv = process.env.npm_config_argv;
  if (!rawArgv) {
    return "";
  }

  try {
    const parsed = JSON.parse(rawArgv);
    if (Array.isArray(parsed.cooked) && parsed.cooked.length > 0) {
      return String(parsed.cooked[0]);
    }
  } catch {
    return "";
  }

  return "";
}

const npmCommand = getNpmCommand();
const blockedCommands = new Set(["install", "ci"]);

if (!blockedCommands.has(npmCommand)) {
  process.exit(0);
}

if (process.env.ALLOW_UNSAFE_NPM_INSTALL === "true") {
  const timestamp = new Date().toISOString();
  const actor =
    process.env.GITHUB_ACTOR ||
    process.env.USERNAME ||
    process.env.USER ||
    "unknown";
  const environment = process.env.CI === "true" ? "CI" : "local";

  // Log to stderr so it is always visible in CI output and not swallowed by
  // stdout pipe filtering. This creates an auditable trace of every bypass.
  console.warn("\n[SECURITY BYPASS] ALLOW_UNSAFE_NPM_INSTALL is active.");
  console.warn(`  Timestamp  : ${timestamp}`);
  console.warn(`  Environment: ${environment}`);
  console.warn(`  Actor      : ${actor}`);
  console.warn(`  Command    : ${npmCommand}`);
  console.warn("  Lifecycle scripts will execute during this install.\n");
  process.exit(0);
}

console.error("\nSecurity policy: direct npm install/ci with lifecycle scripts is blocked.");
console.error("Use one of the safe commands instead:");
console.error("- npm run deps:ci");
console.error("- npm run deps:add -- <package>@<exact-version>");
console.error("- npm run deps:update-lock");
console.error("\nIf you must bypass temporarily, set ALLOW_UNSAFE_NPM_INSTALL=true for one run.\n");
process.exit(1);
