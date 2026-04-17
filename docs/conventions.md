# Convenções

Nomenclatura de arquivos, padrões de código e componentes.

---

## Nomenclatura de Arquivos

| Tipo                     | Padrão                          | Exemplo                          |
|--------------------------|---------------------------------|----------------------------------|
| Componentes React        | `PascalCase.tsx`                | `Button.tsx`, `SignIn.tsx`       |
| Hooks                    | `camelCase.ts` (prefixo `use`) | `useAuth.ts`, `usePosts.ts`     |
| Endpoints HTTP           | `camelCase.ts`                  | `auth.ts`, `posts.ts`           |
| Tipos                    | `kebab-case.types.ts`          | `api-error.types.ts`            |
| Validadores              | `kebab-case.ts`                | `validate-email.ts`             |
| Ícones (componente SVG)  | `PascalCase.tsx`                | `AlertIcon.tsx`, `SearchIcon.tsx`|
| Páginas/rotas            | `camelCase.tsx` ou `index.tsx`  | `library.tsx`, `index.tsx`      |
| Componentes privados de rota | em pasta `-components/`     | `_auth/-components/signIn.tsx`  |

---

## Nomenclatura de Código

| Tipo                    | Padrão          | Exemplo                              |
|-------------------------|-----------------|--------------------------------------|
| Componentes             | `PascalCase`    | `function Button()`, `function Feed()` |
| Hooks                   | `camelCase`     | `useMe()`, `useLogin()`             |
| Funções utilitárias     | `camelCase`     | `validateEmail()`, `createApiError()` |
| Interfaces/Types        | `PascalCase`    | `ApiError`, `LoginDTO`, `Post`       |
| DTOs                    | `PascalCase` + sufixo `DTO` | `CreatePostDTO`, `UpdateProfileDTO` |
| Constantes/objetos API  | `camelCase`     | `authApi`, `postsApi`, `queryKeys`   |
| Query keys factory      | objeto aninhado | `queryKeys.posts.detail(id)`         |
| Variantes de estilo     | `camelCase` + sufixo `Variants` | `buttonVariants`, `inputVariants` |

---

## Componentes UI

### Padrão de Construção

Componentes de UI seguem este padrão consistente:

1. **Definição de variantes** com `tv()` do Tailwind Variants (exportada para reuso)
2. **Interface de props** estendendo `ComponentProps<>` + `VariantProps<>`
3. **Função componente** com destructuring de props e composição via `twMerge()`

```tsx
// 1. Variantes
export const buttonVariants = tv({
  base: [...],
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: 'primary', size: 'md' },
})

// 2. Props
export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

// 3. Componente
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={twMerge(buttonVariants({ variant, size }), className)} {...props} />
  )
}
```

### Convenções de Estilo

- **Tailwind Variants** (`tv()`) para definir variantes estruturadas — `base`, `variants`, `compoundVariants`, `defaultVariants`
- **Tailwind Merge** (`twMerge()`) para compor classes sem conflitos e permitir override via `className`
- **Base UI React** como camada headless para componentes complexos (Dialog, Form, Field)
- **`data-slot`** para marcar partes semânticas do componente (ex: `data-slot="button"`, `data-slot="input-label"`)
- **`data-disabled`** e `aria-disabled` para estados desabilitados
- **`group-data-invalid:*`** para estados de validação (forma canônica sem colchetes)
- **`.focus-ring`** como utilitário customizado para foco acessível (definido em `index.css`)

### Ícones

Ícones são componentes SVG que recebem `IconProps` (tamanho, cor, className). Usam `currentColor` para herdar cor do contexto.

---

## Hooks

### Padrão de Organização

Cada arquivo de hook agrupa queries e mutations de um domínio, separados por comentários `// ======= Queries =======` e `// ======= Mutations =======`.

### Convenções de Query

- **Query keys** centralizadas em `queryKeys` factory (`lib/query-client.ts`)
- **`enabled`** para queries condicionais (ex: `enabled: !!id`, `enabled: query.length > 2`)
- **Invalidação por mutations**: sempre invalidar listas relacionadas no `onSuccess`
- **Cache otimista**: mutations podem fazer `setQueryData` para atualização imediata antes de invalidar

### Convenções de Mutation

- `onSuccess` para efeitos colaterais (navegar, salvar token, invalidar cache)
- `onSettled` para limpeza que deve acontecer mesmo em caso de erro (ex: logout)
- `onError` delegado ao chamador quando o tratamento depende do contexto UI

---

## HTTP

- Endpoints são objetos com métodos assíncronos tipados (ex: `authApi.login()`)
- Cada método retorna `response.data` diretamente (sem wrapper)
- Erros são normalizados em `ApiError` pelo interceptor do Axios
- `ApiError` usa discriminated union (`_tag: 'ApiError'`) — não usar `instanceof`; usar `isApiError()`

---

## Tipos

- Um arquivo `.types.ts` por domínio em `types/`
- DTOs separados dos modelos de leitura (`CreatePostDTO` vs `Post`)
- Type guards como funções puras (`isApiError()`, `isClientError()`)
- Generics para respostas paginadas (`PaginatedResponse<T>`)

---

## Validação

- Validadores são funções puras em `utils/validators/`
- Retornam `string | undefined` (mensagem de erro ou `undefined` se válido)
- Validação client-side antes da chamada à API
- Erros de API mapeados por campo via `Form` do Base UI (`errors` prop)

---

## Estilização

### Tema e Cores

O tema é definido via `@theme` no `index.css` com tokens semânticos:

| Grupo    | Exemplo                           | Uso                         |
|----------|-----------------------------------|-----------------------------|
| `white-` | `white-50`, `white-40`, `white-30`, `white-20` | Textos e foreground  |
| `slate-` | `slate-50`, `slate-40`, `slate-30`, `slate-20` | Bordas e placeholders |
| `black-` | `black-50`, `black-40`, `black-30`, `black-20` | Backgrounds          |
| `accent-`| `accent-50`, `accent-40`, `accent-30`          | Ações primárias      |
| `success-`| `success-50`, `success-40`, `success-30`      | Feedback positivo    |
| `danger-`| `danger-50`, `danger-40`, `danger-30`          | Erros e alertas      |

### Fontes

| Token         | Família         | Uso                           |
|---------------|-----------------|-------------------------------|
| `font-inter`  | Inter           | Texto geral e UI              |
| `font-lusitana`| Lusitana       | Textos complementares/display |
| `font-source` | Source Serif 4  | Títulos e headings            |
