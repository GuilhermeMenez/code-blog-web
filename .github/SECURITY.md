# Política de Segurança

## Linha de Base de Segurança para Dependências

Este projeto aplica uma linha de base de proteção da cadeia de suprimentos (supply chain) para as dependências npm.

Práticas obrigatórias:

- Utilize apenas versões exatas das dependências.
- Mantenha o arquivo `package-lock.json` versionado e revisado.
- Instale as dependências com a execução de scripts desabilitada por padrão.
- Execute verificações de Indicadores de Comprometimento (IOC) e de vulnerabilidades antes da compilação (build) ou da publicação (release).

## Comandos oficiais

```bash
npm run deps:ci
npm run deps:add -- <pacote>@<versão>
npm run deps:update-lock
npm run security:scan
npm run security:check
```

## Resposta a incidentes

Se houver suspeita de comprometimento:

1. Interrompa imediatamente todas as implantações (deployments).
2. Faça a rotação das credenciais da nuvem, do GitHub, das chaves SSH e do registro de pacotes (registry).
3. Reinstale as dependências a partir do arquivo de bloqueio (`lockfile`) utilizando `npm run deps:ci`.
4. Execute `npm run security:check`.
5. Revise os logs de auditoria do CI/CD e do ambiente de nuvem.

## Referências do projeto

- `security/install-deps-security.md`
- `security/tanstack-compromised-versions.txt`
- `security/enforce-safe-install.cjs`
- `security/scan-supply-chain.cjs`
