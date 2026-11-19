---
type: Standard
title: Mensagens de commit
description: Conventional Commits 1.0.0 com emoji por tipo; formato, tipos e exemplos.
tags: [operacao, git, commits, conventional-commits]
status: stable
stale_after: 2027-05-19T00:00:00Z
generated: { by: opencode/deepseek-v4.1-flash, at: 2026-11-19T10:30:43Z }
---

# Formato

Seguimos a especificação [Conventional Commits 1.0.0](https://www.conventionalcommits.org/pt-br/v1.0.0/), com um emoji
descontraído depois dos dois-pontos.

```
<tipo>[escopo opcional]: <emoji> <descrição>

[corpo opcional]

[rodapé(s) opcional(is)]
```

O emoji é o primeiro caractere da descrição. O prefixo `tipo(escopo):` fica
intacto para ferramentas de changelog e versionamento; emoji antes do tipo
quebra o parser.

# Tipos e emoji

| Tipo | Emoji | Quando usar |
| --- | --- | --- |
| `feat` | ✨ | novo recurso |
| `fix` | 🐛 | correção de problema |
| `docs` | 📝 | documentação |
| `chore` | 🔧 | manutenção, configuração e dependências |
| `refactor` | ♻️ | reestruturação sem mudar comportamento |
| `test` | ✅ | testes |
| `style` | 💄 | formatação sem mudar lógica |
| `perf` | ⚡ | desempenho |
| `build` | 📦 | sistema de build e empacotamento |
| `ci` | 👷 | pipeline de CI/CD |
| `revert` | ⏪ | reversão de commit anterior |

# Regras

- Descrição em português, minúscula, no imperativo e sem ponto final.
- Assunto com até 72 caracteres.
- Escopo opcional é um substantivo da área: `telegram`, `tasks`, `db`, `deploy`.
- Corpo separado por linha em branco; bullets começam com `-`.
- Um commit por mudança lógica; se o assunto precisar de "e", avalie dividir.
- `BREAKING CHANGE` em maiúsculas no rodapé, ou `!` imediatamente antes dos
  dois-pontos. O emoji do tipo continua valendo.
- Rodapés usam `-` no token e `: ` ou ` #` como separador, por exemplo
  `Refs #123`.

# Exemplos

```
feat(telegram): ✨ adiciona lembretes automáticos
fix(reminders): 🐛 evita reenvio após marcar sent_at
docs: 📝 documenta a convenção de commits
chore: 🔧 atualiza dependências do eve
refactor(tasks): ♻️ extrai consulta de tarefas para lib/
```

Quebra de compatibilidade:

```
feat(api)!: ✨ remove o canal legado

BREAKING CHANGE: o canal eve padrão deixa de aceitar mensagens sem allowlist.
```

# Verificação

```sh
git log --oneline -10
```

# Relações

- [Deploy](/operations/deploy.md)
- [Migrações](/operations/migrations.md)
- [Troubleshooting](/operations/troubleshooting.md)
