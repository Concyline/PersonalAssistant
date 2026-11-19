---
type: Agent Guide
title: Guia do diretório agent/
description: Regras para criar e alterar instructions, tools, channels e schedules do agente eve.
tags: [agente, eve, tools, channels, schedules]
status: stable
generated: { by: opencode/deepseek-v4.1-flash, at: 2026-11-19T12:19:15Z }
---

# Estrutura

| Caminho | Papel |
| --- | --- |
| `agent.ts` | Define o modelo e o runtime. Não troque o modelo sem pedido explícito. |
| `instructions.md` | Persona ZaIA, regras de uso das tools, estilo e princípios. |
| `tools/` | 20 tools tipadas com Zod; uma responsabilidade por arquivo. |
| `channels/` | Entradas: eve, Telegram e a rota de áudio. |
| `schedules/` | Rotinas proativas; hoje, `due-reminders`. |

# Regras de autoria

- Leia `node_modules/eve/docs/README.md` e a página da capacidade antes de criar ou alterar código.
- Uma tool deve fazer uma coisa. Se precisa de "e também", provavelmente são duas tools.
- Tool não fala SQL: importe funções de `../../lib/...`.
- `description` em português, dizendo quando usar e quando preferir outra tool.
- `inputSchema` em Zod; IDs com `.uuid()`; limites explícitos.
- Retorne IDs e campos de exibição (título, projeto, horário local), não o registro cru inteiro.
- Ações destrutivas usam `approval` com `always()` e um `prompt` claro.
- Nunca afirme que guardou, criou, alterou ou concluiu algo sem chamar a tool.
- Não exponha IDs longos na resposta, a menos que a pessoa peça.
- Segredos só em variáveis de ambiente; nunca em instructions, tools ou respostas.

# Tools por área

| Área | Tools |
| --- | --- |
| Tempo | `get_current_datetime`, `local_datetime_to_utc` |
| Tarefas | `create_task`, `list_tasks`, `update_task`, `complete_task`, `delete_task` |
| Lembretes | `set_reminder`, `list_reminders`, `cancel_reminder`, `get_agenda` |
| Projetos | `create_project`, `list_projects`, `update_project` |
| Conhecimento | `create_entry`, `get_entry`, `update_entry`, `search_entries`, `link_entries`, `record_decision` |

# Channels

- `eve.ts`: canal eve com `vercelOidc`, `localDev` e `placeholderAuth`.
- `telegram.ts`: só conversa privada e só IDs da allowlist; sem allowlist, ninguém é atendido.
- `telegram-audio.ts`: rota `POST /telegram/inbound`, valida o secret do webhook, transcreve voz/áudio com Groq e encaminha o update reescrito para `/eve/v1/telegram`.

Detalhes: [integração Telegram](../knowledge/integrations/telegram.md).

# Schedules

- `due-reminders.ts`: cron `*/15 * * * *`; chama `sendDueReminders()` com `waitUntil`.
- O schedule consulta o banco antes de acordar o modelo e não envia mensagem vazia.

Detalhes: [lembretes](../knowledge/domain/reminders.md).

# Antes de concluir

1. Rode `npm run typecheck`.
2. Teste a tool ou o canal na TUI.
3. Atualize o conceito correspondente em `knowledge/` e registre em `knowledge/log.md`.
4. Se mudou variável de ambiente, atualize `knowledge/operations/deploy.md`.
