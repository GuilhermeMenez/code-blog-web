# Contexto do Projeto

Contexto canônico para agentes de IA: stack, arquitetura, convenções, limites e validação.

---

## Stack

| Tecnologia          | Versão / Modo        |
|---------------------|----------------------|
| React               | 19                   |
| TypeScript          | 5.9 (strict)         |
| Vite                | 7                    |
| Tailwind CSS        | 4                    |
| Tailwind Variants   | 3                    |
| Tailwind Merge      | 3                    |
| Base UI React       | 1                    |
| Axios               | 1 (fixado em 1.14.0) |
| TanStack Query      | 5                    |
| TanStack Router     | 1 (file-based)       |
| MSW                 | 2                    |
| ESLint              | 9                    |
| Prettier            | 3                    |

---

## Arquitetura Resumida

```
Pages → Hooks → HTTP Endpoints → Axios (interceptors) → API REST
                  ↕
            TanStack Query (cache)
```

**Camadas:**
- `src/pages/` — rotas file-based (TanStack Router)
- `src/components/ui/` — componentes reutilizáveis (Button, Dialog, Input, Loader)
- `src/hooks/` — hooks por domínio encapsulando TanStack Query
- `src/http/endpoints/` — funções de chamada à API por domínio
- `src/http/axios.ts` — instância Axios com interceptors (token + error handling)
- `src/lib/query-client.ts` — QueryClient + queryKeys factory
- `src/types/` — tipos TypeScript por domínio
- `src/utils/validators/` — funções puras de validação
- `.mocks/` — MSW handlers e dados mock

**Providers globais** (`App.tsx`): QueryClientProvider → RouterProvider

**Entrypoint** (`main.tsx`): ativa mocks condicionalmente → renderiza App

---

## Convenções Principais

### Componentes UI
- Variantes com `tv()` do Tailwind Variants (exportar o objeto de variantes)
- Composição com `twMerge()` para permitir override via `className`
- Base UI React como camada headless para componentes complexos
- `data-slot` para marcar partes semânticas

### Hooks
- Um arquivo por domínio: `useAuth.ts`, `usePosts.ts`, `useUsers.ts`
- Query keys centralizadas em `queryKeys` factory
- Mutations invalidam queries relacionadas no `onSuccess`

### HTTP
- Endpoints são objetos com métodos assíncronos tipados
- Retornam `response.data` diretamente
- Erros normalizados em `ApiError` (discriminated union com `_tag`)
- Usar `isApiError()` — nunca `instanceof`

### Tipos
- Um `.types.ts` por domínio
- DTOs separados dos modelos de leitura
- Type guards como funções puras

### Validação
- Funções puras retornando `string | undefined`
- Validação client-side antes da chamada à API

### Estilização
- Tokens de cor semânticos: `white-*`, `slate-*`, `black-*`, `accent-*`, `success-*`, `danger-*`
- Fontes: `font-inter` (UI), `font-source` (headings), `font-lusitana` (display)
- Classe utilitária `.focus-ring` para foco acessível

---

## Path Aliases

| Alias      | Resolve para   |
|------------|----------------|
| `@/*`      | `./src/*`      |
| `@mocks/*` | `./.mocks/*`   |

---

## Variáveis de Ambiente

| Variável             | Descrição                    |
|----------------------|------------------------------|
| `VITE_API_URL`       | URL base da API REST         |
| `VITE_ENABLE_MOCKS`  | Ativa MSW em dev (`'true'`)  |

---

## Comandos de Validação

| Comando            | Verifica                          |
|--------------------|-----------------------------------|
| `npm run build`    | TypeScript compila + Vite build   |
| `npm run lint`     | ESLint em `src/**/*.{ts,tsx}`     |
| `npm run lint:fix` | ESLint com auto-fix               |
| `npm run format`   | Prettier em todo o projeto        |

---

## Fontes de Verdade

| Assunto            | Fonte                              |
|--------------------|------------------------------------|
| Arquitetura        | `docs/architecture.md`             |
| Convenções         | `docs/conventions.md`              |
| Operações          | `docs/operations.md`               |
| Tipos/contratos    | `src/types/*.types.ts`             |
| Query keys         | `src/lib/query-client.ts`          |
| Rotas              | `src/pages/` (file-based)          |
| Endpoints da API   | `src/http/endpoints/`              |
| Contratos mock     | `.mocks/handlers/`                 |
