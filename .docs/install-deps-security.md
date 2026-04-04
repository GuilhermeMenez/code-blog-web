# Comando sugerido para futuras instalações

## Utilizar padrão por cenário:

---

- Instalação reprodutível em máquina nova/CI: **npm ci --ignore-scripts**
- Atualizar só lockfile após editar dependências manualmente: **npm install --package-lock-only --ignore-scripts**
- Instalar/atualizar pacote de forma intencional e exata: **npm install pacote@versao --save-exact --ignore-scripts**
- Como já está ativo **save-exact=true** em .npmrc:1, o **--save-exact** vira opcional.

--