# Documentação — Code Blog Web

Hub central de documentação do projeto. Consulte os documentos abaixo conforme a necessidade.

---

## Conhecimento Estável

| Documento                            | Descrição                                                    |
|--------------------------------------|--------------------------------------------------------------|
| [architecture.md](architecture.md)   | Estrutura do projeto, camadas, fluxo de dados e roteamento   |
| [conventions.md](conventions.md)     | Nomenclatura de arquivos, padrões de código e componentes    |
| [operations.md](operations.md)       | Setup de ambiente, scripts, mocks, segurança e dependências  |

---

## Especificações e Contexto

| Recurso                                          | Descrição                                              |
|--------------------------------------------------|--------------------------------------------------------|
| [specs/](../specs/README.md)                     | Especificações de mudanças e features em andamento     |
| [agents/](../agents/project-context.md)          | Contexto canônico e regras para agentes de IA          |

---

## Quando consultar cada camada

- **docs/** → conhecimento estável sobre como o projeto funciona e como contribuir.
- **specs/** → planejamento de uma mudança específica antes de implementar.
- **agents/** → contexto operacional para execução assistida por IA.
- **README.md** (raiz) → onboarding rápido e visão geral do projeto.

---

## Governança Documental

### Quando atualizar cada camada

| Evento                                    | Ação                                                        |
|-------------------------------------------|-------------------------------------------------------------|
| Nova dependência ou mudança de stack      | Atualizar `docs/architecture.md` e `agents/project-context.md` |
| Novo padrão de código ou componente       | Atualizar `docs/conventions.md` e `agents/codebase-rules.md`   |
| Mudança em scripts, env ou setup          | Atualizar `docs/operations.md` e `agents/project-context.md`   |
| Feature nova com múltiplos arquivos       | Abrir spec em `specs/`                                       |
| Spec concluída com decisão durável        | Promover decisão para `docs/` e arquivar/remover a spec      |
| README desatualizado vs estado real       | Atualizar seções de stack, scripts ou links                  |

### Divergências Conhecidas

- **Política de dependências:** o projeto usa faixas `^` (caret) no `package.json`. Se a política evoluir para versões exatas, atualizar `docs/operations.md` e configurar `.npmrc` com `save-exact=true`.
