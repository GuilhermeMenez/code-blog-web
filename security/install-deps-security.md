# Playbook de Segurança para Dependências

Este documento define o fluxo obrigatório de segurança para instalação e manutenção de dependências no projeto.

## 1) Contexto de risco

Ataques recentes de supply chain exploraram:

- Publicação de versões maliciosas em registries
- Execução de scripts de ciclo de vida (`preinstall`, `postinstall`, `prepare`) em máquinas locais e CI
- Envenenamento de cache e abuso de workflows em GitHub Actions

Objetivo deste playbook: reduzir a superfície de ataque em instalação, atualização, auditoria e resposta a incidentes.

## 2) Política obrigatória no projeto

- Versões exatas em `package.json` (sem `^` e `~`)
- `package-lock.json` sempre versionado e revisado em PR
- Instalação padrão com `--ignore-scripts`
- Auditoria recorrente de vulnerabilidades e IOC
- Bloqueio de fluxo inseguro de `npm install`/`npm ci` com scripts de proteção

Arquivos de política implementados:

- `.npmrc`
- `security/enforce-safe-install.cjs`
- `security/scan-supply-chain.cjs`
- `security/tanstack-compromised-versions.txt`

## 3) Comandos oficiais e seguros

Use apenas estes comandos para dependências:

```bash
# reinstalação determinística (local/CI)
npm run deps:ci

# adicionar dependência com versão exata
npm run deps:add -- nome-pacote@x.y.z

# atualizar somente o lockfile
npm run deps:update-lock

# reexecutar scripts somente para pacotes confiáveis
npm run deps:rebuild:trusted

# varredura de IOC + versões comprometidas
npm run security:scan

# scanner + auditoria completa
npm run security:check
```

## 4) Varredura aplicada neste projeto

### Verificações executadas

- Busca por IOC conhecidos (ex.: `github:tanstack/router#`, `@tanstack/setup`, `router_init.js`, `/tmp/.sshd`)
- Verificação de presença de versões TanStack comprometidas no lockfile
- Revisão de `optionalDependencies` e scripts de instalação

### Resultado

- Sem IOC conhecido encontrado nos arquivos do projeto
- Sem versão comprometida da lista TanStack no lockfile atual
- `optionalDependencies` observados são de ecossistema legítimo (esbuild, rollup, tailwind/oxide, etc.)

## 5) Análise: bloquear `npm install` é efetivo?

### O que funciona bem

- O `preinstall` em `security/enforce-safe-install.cjs` bloqueia tentativas diretas de `npm install` e `npm ci` quando scripts de ciclo de vida estão habilitados.
- O `.npmrc` com `ignore-scripts=true` reduz risco por padrão, mesmo quando o comando básico é usado.

### Limites técnicos (importante)

- Não existe bloqueio 100% à prova de bypass no ambiente local sem controles de SO/shell corporativos.
- Um desenvolvedor ainda pode tentar bypass intencional via variáveis de ambiente.

### Conclusão prática

- A combinação `ignore-scripts=true` + fluxo oficial por scripts + validação em CI entrega excelente custo-benefício para times frontend React/TypeScript.

## 6) Pipeline recomendado (CI)

Em cada PR:

1. `npm run deps:ci`
2. `npm run security:scan`
3. `npm run deps:audit:full`
4. `npm run build`

Em release:

1. Repetir os 4 passos acima
2. Exigir aprovação manual se houver findings de severidade alta

## 7) Resposta a incidente (runbook)

Se houver suspeita de pacote malicioso:

1. Pausar deploys imediatamente
2. Trocar credenciais (cloud, GitHub, SSH, tokens de registry)
3. Remover `node_modules` e reinstalar com `npm run deps:ci`
4. Rodar `npm run security:scan` e `npm run deps:audit:full`
5. Revisar logs de CI/CD e cloud das últimas horas
6. Abrir incidente interno com hash do lockfile e pacote suspeito

## 8) Lista TanStack comprometida

- A lista monitorada está em `security/tanstack-compromised-versions.txt`
- O scanner compara automaticamente esta lista com as versões presentes no `package-lock.json`
- Atualize esta lista sempre que novas divulgações oficiais surgirem