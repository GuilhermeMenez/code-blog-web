# Instalação segura de dependências (sem .npmrc)

Objetivo: impedir atualizações automáticas inesperadas e reduzir risco de supply chain.

## Padrão obrigatório

1. Instalar ou atualizar pacote de forma explícita:

```bash
npm install nome-pacote@x.y.z --save-exact --ignore-scripts
```

2. Instalação reprodutível em CI e máquinas novas:

```bash
npm ci --ignore-scripts
```

3. Atualizar somente o lockfile (sem instalar tudo):

```bash
npm install --package-lock-only --ignore-scripts
```

## Regras rápidas

- Sem .npmrc, use --save-exact em toda instalação com npm install.
- Não usar faixas com ^ ou ~ em package.json.
- Sempre commitar package-lock.json junto com mudanças de dependências.

## Controles mínimos de segurança (importante)

- No CI, falhar build se detectar ^ ou ~ em package.json.
- Rodar npm audit no pipeline para bloquear vulnerabilidades conhecidas antes do deploy.