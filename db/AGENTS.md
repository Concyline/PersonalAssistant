---
type: Agent Guide
title: Guia do diretório db/
description: Regras de migração, schema e convenções do Turso/libSQL.
tags: [banco, turso, libsql, migracoes]
status: stable
generated: { by: opencode/deepseek-v4.1-flash, at: 2026-11-19T12:19:15Z }
---

# Regras de migração

- Migrações são imutáveis. Depois de aplicada, nunca edite o arquivo.
- O nome segue `000N_descricao.sql`; a ordem é lexicográfica.
- Cada arquivo roda dentro de uma transação pelo `scripts/migrate.ts`.
- Use SQL idempotente (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`).
- `ALTER TABLE ... ADD COLUMN` é permitido; recriar tabela exige migração nova e cuidado com dados.
- Nunca altere o schema direto no Turso de produção; sempre via migração.

# Rodar

```sh
npm run db:migrate
```

O runner cria `_migrations`, aplica cada `.sql` uma vez e mostra as tabelas ao final.

# Tabelas

| Tabela | Papel | Conceito |
| --- | --- | --- |
| `tasks` | O quê e o prazo. | [Tarefas](../knowledge/domain/tasks.md) |
| `reminders` | Quando avisar. | [Lembretes](../knowledge/domain/reminders.md) |
| `projects` | Agrupamento. | [Projetos](../knowledge/domain/projects.md) |
| `entries` | Conhecimento capturado. | [Entradas](../knowledge/domain/entries.md) |
| `entry_links` | Vínculos entre entradas. | [Entradas](../knowledge/domain/entries.md) |
| `_migrations` | Controle interno do runner. | — |

# Convenções

- Datas são `TEXT` em ISO 8601 UTC; SQLite não tem tipo de data nativo.
- Listas e objetos são JSON em `TEXT` (`tags`, `metadata`).
- `CHECK` restringe status e prioridade; mantenha os valores em sincronia com `lib/`.
- FKs usam `ON DELETE SET NULL` para projeto/entrada e `ON DELETE CASCADE` para lembretes.
- Índices cobrem status + data, projeto + data e vínculos.
- Nenhum segredo, token ou dado pessoal em migração.

# Adicionar uma migração

1. Crie `db/migrations/000N_descricao.sql`.
2. Escreva SQL idempotente e transacional.
3. Rode `npm run db:migrate`.
4. Rode `npm run typecheck` e teste o fluxo afetado.
5. Atualize o conceito de domínio e `knowledge/log.md`.
6. Faça commit e deploy.

# Turso

- A URL começa com `libsql://`; não crie o banco com `--tursodb`.
- `TURSO_AUTH_TOKEN` só em `.env.local` e nas env vars da Vercel.
- Se o cliente reclamar de WebSocket, troque `libsql://` por `https://` mantendo host e token.

Detalhes: [migrações](../knowledge/operations/migrations.md).
