# Regras do Codebase

Regras operacionais objetivas para agentes de IA.

---

## Arquivos Gerados — NÃO EDITAR

| Arquivo                        | Gerado por       |
|--------------------------------|-------------------|
| `src/route-tree.gen.ts`        | TanStack Router   |
| `public/mockServiceWorker.js`  | MSW               |

Estes arquivos são excluídos do ESLint e SonarQube. Qualquer edição manual será sobrescrita.

---

## Regras de Edição

1. **Respeitar camadas.** Componentes de página não chamam Axios diretamente — sempre via hooks. Hooks não importam componentes. Endpoints não contêm lógica de UI.

2. **Não criar hooks inline.** Queries e mutations devem ficar nos arquivos de hook por domínio (`hooks/useAuth.ts`, `hooks/usePosts.ts`, `hooks/useUsers.ts`).

3. **Manter queryKeys centralizado.** Toda query key nova deve ser adicionada ao factory em `lib/query-client.ts`. Não usar strings soltas.

4. **Mutations devem invalidar cache.** Após mutation bem-sucedida, invalidar as query keys afetadas. Usar `invalidateQueries` ou `setQueryData` conforme o caso.

5. **Erros são ApiError, não exceptions.** O interceptor do Axios normaliza erros em `ApiError` (discriminated union). Usar `isApiError()` para type guard — nunca `instanceof`.

6. **Componentes UI seguem o padrão tv().** Novos componentes devem usar Tailwind Variants (`tv()`) para variantes, exportar o objeto de variantes e compor com `twMerge()`.

7. **Validação retorna string | undefined.** Funções validadoras em `utils/validators/` retornam mensagem de erro ou `undefined`. Não lançam exceções.

8. **Usar path aliases.** Imports devem usar `@/` para `src/` e `@mocks/` para `.mocks/`. Não usar caminhos relativos longos.

9. **Usar `import type` para imports de tipo.** O `verbatimModuleSyntax` está habilitado — imports que são apenas tipos devem usar `import type`.

---

## Rotas

- Para criar uma nova rota, adicionar arquivo em `src/pages/` seguindo a convenção do TanStack Router file-based.
- O `route-tree.gen.ts` será regenerado automaticamente pelo plugin do Vite.
- Componentes privados de uma rota ficam em `-components/` dentro da pasta da rota.
- Layout groups usam prefixo `_` (ex: `_app/`, `_auth/`).
- O arquivo de layout do grupo se chama `layout.tsx` (configurado via `routeToken`).

---

## Mocks

- Ao adicionar novo endpoint na API, criar handler correspondente em `.mocks/handlers/`.
- Manter dados mock em `.mocks/data/` — não inline nos handlers.
- Usar `delay()` nos handlers para simular latência.
- Mocks são ativados apenas quando `DEV && VITE_ENABLE_MOCKS === 'true'`.

---

## Checklist de Validação

Antes de considerar uma tarefa concluída, verificar:

- [ ] `npm run build` compila sem erros
- [ ] `npm run lint` não reporta problemas
- [ ] Tipos novos/alterados estão em `src/types/`
- [ ] Query keys novas estão no factory centralizado
- [ ] Imports usam path aliases (`@/`, `@mocks/`)
- [ ] Imports de tipo usam `import type`
- [ ] Componentes UI usam `tv()` + `twMerge()`
- [ ] Nenhum arquivo gerado foi editado manualmente
