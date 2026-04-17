# Arquitetura

Estrutura do projeto, camadas, fluxo de dados e roteamento.

---

## Visão Geral

O Code Blog Web é uma SPA construída com React 19, TypeScript strict e Vite. A aplicação segue uma arquitetura em camadas com separação clara entre UI, estado de servidor, comunicação HTTP e tipos.

```
Browser → React (Pages/Components) → Hooks → HTTP Endpoints → Axios → API REST
                                       ↕
                                  TanStack Query (cache)
```

---

## Estrutura de Diretórios

```
src/
├── assets/              # Recursos estáticos
│   ├── icons/           # Componentes SVG de ícones (AlertIcon, CloseIcon, PlusIcon, SearchIcon)
│   └── svgs/            # Arquivos SVG puros (logos, backgrounds)
├── components/
│   └── ui/              # Componentes de UI reutilizáveis (Button, Dialog, Input, Loader)
├── hooks/               # Custom hooks por domínio (useAuth, usePosts, useUsers)
├── http/
│   ├── axios.ts         # Instância Axios configurada (interceptors, error handling)
│   └── endpoints/       # Funções de chamada à API por domínio (auth, posts, users)
├── lib/
│   └── query-client.ts  # QueryClient configurado + queryKeys centralizadas
├── pages/               # Rotas file-based (TanStack Router)
│   ├── __root.tsx        # Root layout (HeadContent + Outlet)
│   ├── _app/            # Layout autenticado
│   │   ├── layout.tsx   # Layout wrapper do app
│   │   ├── feed/        # Feed de posts
│   │   ├── $writer/     # Perfil de autor (param dinâmico)
│   │   │   └── $postId/ # Post específico (param dinâmico)
│   │   └── me/          # Área pessoal (library, following)
│   ├── _auth/           # Landing page + autenticação
│   │   ├── index.tsx    # Landing com dialog de login/registro
│   │   └── -components/ # Componentes privados da rota (signIn, signUp)
│   └── design-system/   # Página de showcase do design system
├── types/               # Tipos TypeScript por domínio
├── utils/
│   ├── formatters/      # Funções de formatação (vazio por enquanto)
│   └── validators/      # Validadores puros (email, name, password)
├── route-tree.gen.ts    # GERADO — árvore de rotas do TanStack Router
├── App.tsx              # Providers globais (QueryClient + Router)
├── main.tsx             # Entrypoint (mocks condicionais + render)
└── index.css            # Estilos globais, tema Tailwind e fontes
```

### Diretórios fora de `src/`

```
.mocks/                  # Mock Service Worker
├── browser.ts           # Worker para desenvolvimento (browser)
├── server.ts            # Server para testes (Node)
├── handlers/            # Request handlers por domínio (auth, posts, users)
├── data/                # Dados mock (users, posts) + helpers
└── utils/               # Utilitários de mock (paginação)
public/
└── mockServiceWorker.js # GERADO — service worker do MSW
```

---

## Camadas

### 1. Pages (Roteamento)

Roteamento file-based via TanStack Router. Cada arquivo em `src/pages/` mapeia para uma rota.

**Convenções de roteamento:**
- `__root.tsx` — root layout global
- `_prefixo/` — layout groups (não geram segmento de URL)
- `$param/` — parâmetros dinâmicos de rota
- `-components/` — componentes privados da rota (não geram rota)
- `layout.tsx` — arquivo de layout do grupo (configurável via `routeToken` no Vite)
- `index.tsx` — componente da rota

**Rotas ativas:**
| Rota                    | Arquivo                              | Descrição            |
|-------------------------|--------------------------------------|----------------------|
| `/`                     | `_auth/index.tsx`                    | Landing page         |
| `/feed`                 | `_app/feed/index.tsx`                | Feed de posts        |
| `/$writer`              | `_app/$writer/index.tsx`             | Perfil do autor      |
| `/$writer/$postId`      | `_app/$writer/$postId/index.tsx`     | Post individual      |
| `/me/library`           | `_app/me/library.tsx`                | Biblioteca pessoal   |
| `/me/following`         | `_app/me/following.tsx`              | Quem o usuário segue |
| `/design-system`        | `design-system/index.tsx`            | Showcase de UI       |

### 2. Componentes UI

Componentes headless via Base UI React, estilizados com Tailwind Variants + Tailwind Merge.

**Padrão de variantes:** cada componente exporta um objeto `tv()` com `base`, `variants`, `compoundVariants` e `defaultVariants`. A composição visual é feita via props de variante (`variant`, `size`, `iconOnly`), não por classes externas.

**Componentes disponíveis:** Button, Dialog, Input, Loader.

### 3. Hooks

Custom hooks encapsulam toda a interação com TanStack Query. Cada hook retorna queries ou mutations já configuradas.

**Organização por domínio:**
- `useAuth.ts` — login, registro, logout, dados do usuário (`useMe`, `useIsAuthenticated`)
- `usePosts.ts` — CRUD de posts, feed, busca por autor, pesquisa
- `useUsers.ts` — perfil, seguidores, following, follow/unfollow

**Padrão de invalidação:** mutations invalidam query keys relacionadas para manter o cache sincronizado. O `queryKeys` factory em `lib/query-client.ts` centraliza todas as chaves.

### 4. HTTP (Endpoints + Axios)

`http/axios.ts` configura a instância Axios com:
- `baseURL` via `VITE_API_URL`
- Request interceptor: injeta Bearer token do `localStorage`
- Response interceptor: normaliza erros em `ApiError` (discriminated union com `_tag`)

`http/endpoints/` contém funções assíncronas tipadas por domínio, cada uma retornando dados já extraídos de `response.data`.

### 5. Tipos

Tipos centralizados em `types/` por domínio. Destaques:
- `ApiError` usa discriminated union (`_tag: 'ApiError'`) em vez de classe — compatível com code splitting e HMR do Vite
- `PaginatedResponse<T>` e `PaginationParams` em `common.types.ts` — usados por todos os endpoints paginados
- DTOs separados dos modelos de leitura (`CreatePostDTO` vs `Post`)

### 6. Mocks (MSW)

Mock Service Worker ativado condicionalmente quando `VITE_ENABLE_MOCKS=true` em modo DEV. Os handlers replicam o contrato da API REST com delays realistas. Dados mock em `.mocks/data/`.

---

## Fluxo de Dados

```
1. Usuário interage com a UI (page/component)
2. Componente chama hook (useLogin, useFeed, etc.)
3. Hook dispara query/mutation via TanStack Query
4. TanStack Query chama endpoint em http/endpoints/
5. Endpoint faz request via instância Axios configurada
6. Axios interceptors adicionam token e normalizam erros
7. Resposta popula cache do TanStack Query
8. Componente re-renderiza com dados atualizados
```

---

## Providers Globais

Configurados em `App.tsx`:
1. **QueryClientProvider** — TanStack Query com configuração centralizada
2. **RouterProvider** — TanStack Router com route tree gerada

---

## Variáveis de Ambiente

| Variável              | Descrição                          | Exemplo                    |
|-----------------------|------------------------------------|----------------------------|
| `VITE_API_URL`        | URL base da API REST               | `http://localhost:8080/`   |
| `VITE_ENABLE_MOCKS`   | Ativa MSW em desenvolvimento       | `true` ou `false`          |

---

## Arquivos Gerados (não editar)

| Arquivo                     | Gerado por        | Descrição                      |
|-----------------------------|--------------------|--------------------------------|
| `src/route-tree.gen.ts`     | TanStack Router    | Árvore de rotas automática     |
| `public/mockServiceWorker.js` | MSW              | Service worker para mocking    |
