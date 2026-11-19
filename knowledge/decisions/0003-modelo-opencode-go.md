---
type: Decision
title: "Modelo: opencode-go / deepseek-v4.1-flash"
description: Usar o provider opencode-go com deepseek-v4.1-flash e reasoning high.
tags: [decisao, modelo, opencode-go, deepseek]
status: stable
generated: { by: opencode/deepseek-v4.1-flash, at: 2026-11-19T12:19:15Z }
sources:
  - id: plan
    resource: ../references/plan.md
    title: Plano de Projeto — Assistente Pessoal
---

# Contexto

O agente precisa de tool calling confiável, boa qualidade em português e custo baixo para uso pessoal. O provider já estava configurado no projeto.

# Decisão

Usar `@ai-sdk/openai-compatible` com:

- `baseURL: https://opencode.ai/inference/go/openai/v1`
- Modelo `deepseek-v4.1-flash`
- `reasoning: high`
- Contexto declarado de 1M tokens
- `OPENCODE_GO_API_KEY` como segredo

# Alternativas

| Alternativa | Por que não |
| --- | --- |
| Vercel AI Gateway | Exige cartão de crédito no momento. |
| OpenAI/Anthropic direto | Mais custo e configuração para o v1. |
| Modelo local | Latência e infraestrutura incompatíveis com Vercel. |

# Consequências

- A disponibilidade do provider afeta o agente inteiro.
- O provider não oferece STT; áudio usa Groq.
- O modelo é definido em `agent/agent.ts`; não troque sem pedido explícito.
- `reasoning: high` aumenta latência e custo; ajuste se o uso diário pesar.

# Relações

- [Arquitetura](/architecture/overview.md)
- [Telegram](/integrations/telegram.md)
