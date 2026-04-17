# Operações

Setup de ambiente, scripts, mocks, segurança e dependências.

---

## Requisitos de Ambiente

- **Node.js** >= 20.x
- **npm** >= 10.x

---

## Instalação

```bash
git clone <repository-url>
cd code-blog-web
npm install
```

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL='http://localhost:8080/'
VITE_ENABLE_MOCKS=false
```

---

## Scripts

| Script     | Comando            | Descrição                                            |
|------------|--------------------|------------------------------------------------------|
| `start`    | `npm start`        | Inicia o servidor de desenvolvimento (Vite)          |
| `build`    | `npm run build`    | Compila TypeScript (`tsc -b`) e gera build de produção (`vite build`) |
| `preview`  | `npm run preview`  | Visualiza o build de produção localmente             |
| `lint`     | `npm run lint`     | Executa ESLint em `src/**/*.{ts,tsx}`                |
| `lint:fix` | `npm run lint:fix` | Executa ESLint com correção automática               |
| `format`   | `npm run format`   | Formata todo o projeto com Prettier                  |

---

## Variáveis de Ambiente

| Variável              | Obrigatória | Descrição                    | Exemplo                  |
|-----------------------|-------------|------------------------------|--------------------------|
| `VITE_API_URL`        | Sim         | URL base da API REST         | `http://localhost:8080/` |
| `VITE_ENABLE_MOCKS`   | Não         | Ativa MSW em modo DEV        | `true` ou `false`        |

Variáveis prefixadas com `VITE_` são expostas ao código client-side via `import.meta.env`.

---

## Mock Service Worker (MSW)

### Ativação

Os mocks são ativados **condicionalmente** em `main.tsx` quando ambas as condições são verdadeiras:
1. `import.meta.env.DEV` é `true` (modo desenvolvimento)
2. `VITE_ENABLE_MOCKS` é `'true'`

### Estrutura

```
.mocks/
├── browser.ts           # setupWorker (browser, para dev)
├── server.ts            # setupServer (Node, para testes)
├── handlers/
│   ├── index.ts         # Barrel export de todos os handlers
│   ├── auth.ts          # Handlers de autenticação
│   ├── posts.ts         # Handlers de posts (CRUD + feed + search)
│   └── users.ts         # Handlers de usuários (perfil + follow)
├── data/
│   ├── index.ts         # Barrel export dos dados mock
│   ├── users.ts         # Dados mock de usuários + helpers
│   └── posts.ts         # Dados mock de posts + helpers
└── utils/
    └── pagination.ts    # Helper de paginação genérica
```

### Comportamento

- Requests não interceptados passam adiante (`onUnhandledRequest: 'bypass'`)
- Handlers incluem `delay()` para simular latência realista
- Dados mock replicam o contrato da API REST (tipos, status codes, paginação)
- O service worker (`public/mockServiceWorker.js`) é gerado pelo MSW e não deve ser editado

### Path Aliases para Mocks

O alias `@mocks` está configurado tanto no Vite (`vite.config.ts`) quanto no TypeScript (`tsconfig.app.json`):
- `@mocks/*` → `./.mocks/*`

---

## Análise Estática

### ESLint

- ESLint 9 com flat config
- Plugins: `react`, `react-hooks`, `react-refresh`, `prettier`
- Arquivos ignorados na análise: `public/mockServiceWorker.js`, `src/route-tree.gen.ts`

### Prettier

- Configuração padrão do Prettier
- Executado via `npm run format`

### SonarQube

- Configurado via `sonar-project.properties`
- Exclusões: arquivos gerados (`mockServiceWorker.js`, `route-tree.gen.ts`)

---

## TypeScript

- **Modo strict** habilitado com flags adicionais: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`
- **`verbatimModuleSyntax`** — imports de tipo devem usar `import type`
- **`erasableSyntaxOnly`** — compatível com bundlers modernos
- **Target:** ES2022
- **Path aliases:**
  - `@/*` → `./src/*`
  - `@mocks/*` → `./.mocks/*`

---

## Dependências e Segurança

### Política de Versões

O projeto usa faixas `^` (caret) para a maioria das dependências, permitindo atualizações de minor/patch automáticas. A exceção é o Axios, que está fixado em `1.14.0` com override explícito no `package.json` para evitar regressões em versões de patch.

> **Nota:** se a política do projeto evoluir para dependências exatas, substituir `^` por versões fixas e configurar `save-exact=true` no `.npmrc`.

### Boas Práticas de Instalação

- Sempre rodar `npm audit` após `npm install` para verificar vulnerabilidades
- Revisar changelogs antes de atualizar dependências major
- Manter `package-lock.json` versionado para builds reproduzíveis
- Usar `npm ci` em pipelines de CI para instalação determinística
