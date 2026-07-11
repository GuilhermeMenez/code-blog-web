# Code Blog Web

Aplicação web para blog de código desenvolvida com React 19 e tecnologias modernas de frontend.

---

## Índice

- [Stack](#-stack)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Segurança de Dependências](#-segurança-de-dependências)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Padrões de Nomenclatura](#-padrões-de-nomenclatura)
- [Estrutura de Componentes](#-estrutura-de-componentes)

---

## Stack

| Categoria         | Tecnologia                                                  | Versão         |
|-------------------|-------------------------------------------------------------|----------------|
| **Framework**     | [React](https://react.dev/)                                 | 19             |
| **Linguagem**     | [TypeScript](https://www.typescriptlang.org/)               | 5.9 (strict)   |
| **Build Tool**    | [Vite](https://vite.dev/)                                   | 7              |
| **Estilização**   | [Tailwind CSS](https://tailwindcss.com/)                    | 4              |
| **Variantes**     | [Tailwind Variants](https://www.tailwind-variants.org/)     | 3              |
| **Merge Classes** | [Tailwind Merge](https://github.com/dcastil/tailwind-merge) | 3              |
| **UI Headless**   | [Base UI React](https://base-ui.com/)                       | 1              |
| **HTTP Client**   | [Axios](https://axios-http.com/)                            | 1              |
| **Server State**  | [TanStack Query](https://tanstack.com/query)                | 5              |
| **Roteamento**    | [TanStack Router](https://tanstack.com/router)              | 1 (file-based) |
| **API Mocking**   | [Mock Service Worker](https://mswjs.io/)                    | 2              |
| **Linter**        | [ESLint](https://eslint.org/)                               | 9              |
| **Formatter**     | [Prettier](https://prettier.io/)                            | 3              |

---

## Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 20.x
- **npm** >= 10.x (gerenciador de pacotes padrão do projeto)

---

## Instalação

> **Importante**: Este projeto segue uma política de segurança para a cadeia de suprimentos.
> Siga a documentação em `SECURITY.md` e `install-deps-security.md` para garantir a instalação segura das dependências e execute verificações de segurança antes de compilar ou publicar.

### 1. Clone o repositório

```bash
git clone <repository-url>
cd code-blog-web
```

### 2. Instale as dependências

```bash
npm run deps:ci
```

### 2.1 Rebuild controlado de pacotes confiáveis (quando necessário)

```bash
npm run deps:rebuild:trusted
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL='http://localhost:8080/'
VITE_ENABLE_MOCKS=false
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:5173`

---

## Scripts Disponíveis

| Script     | Comando            | Descrição                                            |
|------------|--------------------|------------------------------------------------------|
| `start`    | `npm start`        | Inicia o servidor de desenvolvimento                 |
| `build`    | `npm run build`    | Compila TypeScript e gera build de produção          |
| `preview`  | `npm run preview`  | Visualiza o build de produção localmente             |
| `lint`     | `npm run lint`     | Executa o ESLint para verificar problemas no código  |
| `lint:fix` | `npm run lint:fix` | Executa o ESLint e corrige problemas automaticamente |
| `format`   | `npm run format`   | Formata o código com Prettier                        |
| `deps:ci`  | `npm run deps:ci`  | Instala dependências de forma determinística e segura |
| `deps:add` | `npm run deps:add -- pacote@x.y.z` | Adiciona pacote com versão exata e sem scripts |
| `deps:update-lock` | `npm run deps:update-lock` | Atualiza apenas o lockfile com scripts desabilitados |
| `deps:audit:full` | `npm run deps:audit:full` | Executa auditoria completa de vulnerabilidades |
| `security:scan` | `npm run security:scan` | Varredura de IOC e versões comprometidas do TanStack |
| `security:check` | `npm run security:check` | Varredura + auditoria completa |

---

## Segurança de Dependências

- Política resumida: `.github/SECURITY.md` (fallback: `SECURITY.md`)
- Playbook completo: `security/install-deps-security.md`
- Lista monitorada de versões comprometidas do TanStack: `security/tanstack-compromised-versions.txt`
- Bloqueio de fluxo inseguro de instalação: `security/enforce-safe-install.cjs`
- Scanner automatizado de supply chain: `security/scan-supply-chain.cjs`

---

## Estrutura de Diretórios

```
src/
├── assets/                       # Assets estáticos
│   └── icons/                    # Componentes de ícones SVG
│
├── components/
│   ├── ui/                       # Componentes primitivos (Button, Input, etc.)
│   ├── layout/                   # Componentes de layout (Header, Footer, etc.)
│   └── common/                   # Componentes compartilhados
│
├── hooks/                        # Custom hooks (useAuth, usePosts, useUsers)
│
├── http/
│   ├── endpoints/                # Funções de chamadas API (auth, posts, users)
│   └── axios.ts                  # Configuração do cliente HTTP
│
├── lib/                          # Configurações de bibliotecas externas
│
├── pages/                        # Páginas (TanStack Router file-based)
│
├── types/                        # Definições de tipos e interfaces
├── enums/                        # Definições de enums
├── constants/                    # Constantes da aplicação
│
├── utils/                        # Funções utilitárias
│
├── App.tsx                       # Componente raiz da aplicação
├── index.css                     # Estilos globais e configuração Tailwind
├── main.tsx                      # Entry point da aplicação
└── route-tree.gen.ts             # Arquivo gerado pelo TanStack Router
```

---

## Padrões de Nomenclatura

| Tipo            | Convenção                  | Exemplo                           |
|-----------------|----------------------------|-----------------------------------|
| **Componentes** | `PascalCase.tsx`           | `Button.tsx`, `PostCard.tsx`      |
| **Ícones**      | `PascalCaseIcon.tsx`       | `PlusIcon.tsx`, `SearchIcon.tsx`  |
| **Hooks**       | `useCamelCase.ts`          | `usePosts.ts`, `useAuth.ts`       |
| **Http/Lib**    | `kebab-case.ts`            | `posts.ts`, `query-client.ts`     |
| **Pages**       | TanStack Router file-based | `index.tsx`, `$postId/index.tsx`  |
| **Estilos**     | `kebab-case.css`           | `index.css`                       |
| **Types**       | `kebab-case.types.ts`      | `posts.types.ts`, `auth.types.ts` |
| **Enums**       | `kebab-case.enums.ts`      | `posts.enums.ts`                  |
| **Constantes**  | `kebab-case.constants.ts`  | `api.constants.ts`                |
| **Utilitários** | `kebab-case.ts`            | `format-date.ts`                  |

---

## Estrutura de Componentes

Os componentes seguem um padrão consistente utilizando **Tailwind Variants** para gerenciamento de variantes e **Tailwind Merge** para composição de classes.

### Exemplo de Componente

```tsx
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

// 1. Definição das variantes com tailwind-variants
export const buttonVariants = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center font-medium rounded-lg border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'border-primary bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'border-border bg-secondary text-secondary-foreground hover:bg-muted',
      ghost: 'border-transparent bg-transparent text-muted-foreground hover:text-foreground',
      destructive: 'border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    size: {
      sm: 'h-6 px-2 gap-1.5 text-xs [&_svg]:size-3',
      md: 'h-7 px-3 gap-2 text-sm [&_svg]:size-3.5',
      lg: 'h-9 px-4 gap-2.5 text-base [&_svg]:size-4',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

// 2. Interface do componente extendendo props nativas + variantes
export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

// 3. Componente funcional (sem forwardRef no React 19)
export function Button({ 
  className, 
  variant, 
  size, 
  disabled, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      type="button"
      data-slot="button"
      data-disabled={disabled ? '' : undefined}
      className={twMerge(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Principais Características

- **React 19**: Não utiliza `forwardRef` (ref é passado automaticamente via props)
- **Tailwind Variants**: Gerencia variantes de estilo de forma type-safe
- **Tailwind Merge**: Permite sobrescrever classes via prop `className`
- **Data Attributes**: Utiliza `data-*` para estados (ex: `data-disabled`)
- **Tailwind CSS v4**: Utiliza `@theme` e CSS variables para tokens de design

---

## Licença

Este projeto é privado e de uso interno
