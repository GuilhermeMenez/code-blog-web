# Especificações

Especificações de mudanças e features em andamento. Cada spec documenta o planejamento antes da implementação.

---

## Quando abrir uma spec

- Feature nova que afeta múltiplos arquivos ou camadas
- Mudança arquitetural (nova dependência, novo padrão, refatoração de camada)
- Correção complexa que exige investigação e plano antes de implementar

**Não precisa de spec:** correções pontuais, ajustes de estilo, adição de componente simples seguindo padrão existente.

---

## Template Mínimo (variante enxuta)

Para mudanças de escopo pequeno/médio, criar um arquivo `specs/<nome-da-feature>.md` com:

```markdown
# <Nome da Feature>

## Overview
Descrição curta do que será feito e por quê.

## Requisitos
- [ ] Critério de aceitação 1
- [ ] Critério de aceitação 2

## Arquivos Afetados
- `caminho/do/arquivo.ts` — o que muda

## Tarefas
- [ ] Tarefa 1
- [ ] Tarefa 2

## Decisões
- Decisão relevante e justificativa curta.

## Riscos
- Risco identificado e mitigação.
```

Para features maiores, expandir com seções adicionais: diagrama de fluxo, plano de testes, plano de rollback.

---

## Ciclo de Vida

1. **Criação** — abrir spec antes de implementar
2. **Implementação** — atualizar tasks conforme avança
3. **Conclusão** — marcar como concluída; se a spec tiver decisões arquiteturais duráveis, promover o conteúdo relevante para `docs/`
4. **Arquivamento** — specs concluídas podem ser movidas para `specs/archive/` ou removidas, conforme preferência do projeto
