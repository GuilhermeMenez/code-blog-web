# Code Blog Web

Aplicação web para blog de código desenvolvida com React 19 e tecnologias modernas de frontend.

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

- **Node.js** >= 20.x
- **npm** >= 10.x

---

## Quick Start

```bash
git clone <repository-url>
cd code-blog-web
npm install
```

Configure as variáveis de ambiente criando um arquivo `.env` na raiz:

```env
VITE_API_URL='http://localhost:8080/'
VITE_ENABLE_MOCKS=false
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:5173`

---

## Scripts

| Script     | Comando            | Descrição                                            |
|------------|--------------------|------------------------------------------------------|
| `start`    | `npm start`        | Inicia o servidor de desenvolvimento                 |
| `build`    | `npm run build`    | Compila TypeScript e gera build de produção          |
| `preview`  | `npm run preview`  | Visualiza o build de produção localmente             |
| `lint`     | `npm run lint`     | Executa o ESLint para verificar problemas no código  |
| `lint:fix` | `npm run lint:fix` | Executa o ESLint e corrige problemas automaticamente |
| `format`   | `npm run format`   | Formata o código com Prettier                        |

---

## Documentação

| Documento                                     | Descrição                                                 |
|-----------------------------------------------|-----------------------------------------------------------|
| [docs/](docs/README.md)                      | Hub de documentação do projeto                            |
| [docs/architecture.md](docs/architecture.md)  | Arquitetura, estrutura de diretórios e fluxo de dados     |
| [docs/conventions.md](docs/conventions.md)    | Nomenclatura, padrões de código e componentes             |
| [docs/operations.md](docs/operations.md)      | Setup operacional, scripts, mocks e segurança             |
| [specs/](specs/README.md)                    | Especificações de mudanças e features                     |
| [agents/](agents/project-context.md)         | Contexto e regras para agentes de IA                      |

---

## Licença

Este projeto é privado e de uso interno.

