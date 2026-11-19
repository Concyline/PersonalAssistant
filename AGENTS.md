# eve Agent App

Este projeto usa o framework eve: um agente é um diretório de arquivos em `agent/`, que o eve compila e executa.

Para uma mudança apenas de conteúdo na identidade, propósito, tom ou diretrizes de resposta do agente raiz, edite as instruções autorais existentes. Projetos novos usam `agent/instructions.md`; um projeto pode usar `agent/instructions.ts` ou arquivos em `agent/instructions/`. Você não precisa ler a documentação do framework para uma mudança apenas de conteúdo nas instruções. Um projeto novo já tem o modelo escolhido em `agent/agent.ts`; preserve esse arquivo a menos que a pessoa peça para trocar o modelo.

## Leia a documentação antes de escrever código

```sh
ls node_modules/eve/docs
```

Comece por `docs/README.md`: ele mapeia cada tarefa para a página que a cobre. Leia essa página antes de criar tools, connections, channels, skills, subagents, schedules ou deployment. Em um workspace ou instalação local do pacote, resolva primeiro o local do pacote `eve` instalado. Se a documentação do pacote não existir, use https://eve.dev/docs.

Use um ciclo de autoria limitado:

1. Leia a página relevante e inspecione apenas os arquivos que você vai modificar ou precisa imitar.
2. Pare a descoberta quando o local do arquivo, os imports e a forma da definição estiverem claros. Implemente o comportamento pedido.

Siga links ou inspecione tipos públicos apenas quando a página roteada deixar a tarefa sem resposta. Não faça glob recursivo em `node_modules`, não enumere a árvore inteira de docs e não leia arquivos de scaffold não relacionados quando o caminho direto é conhecido. Links de gerenciadores de pacote podem esconder arquivos de ferramentas de glob recursivo, embora leituras diretas funcionem.

Mantenha o bundle pequeno: importe clientes de SDK dentro das funções que os usam e mantenha uma versão de cada dependência. Veja `docs/guides/deployment/index.md#keep-the-bundle-small`.

## Prefira uma integração existente

Quando a tarefa nomear um produto ou serviço externo, procure no registry antes de implementar a integração. Para uma capacidade genérica, crie uma tool.

```sh
eve registry search <query> --json
eve registry view <item>
```

Prefira itens cujo `implementation` seja `native`; use adaptadores do Chat SDK quando nenhum canal nativo servir. `registry view` linka a documentação do item.

Instale sem conduzir prompts interativos:

```sh
eve add <item> --non-interactive
```

Código de saída 0 significa que o setup terminou; 1 falhou; 2 precisa de uma resposta ou pré-requisito. No exit 2, rode o `next.command` do último evento NDJSON. Para uma pergunta não secreta, substitua o placeholder de resposta `<JSON value>` pela resposta que você coletou; valores string precisam de aspas JSON. Nunca passe um segredo em `--answer`. Veja `docs/install-integrations.mdx` para pré-requisitos de setup.

## Use o eve para operações na Vercel

Use o eve para vincular e publicar projetos na Vercel. Comandos, variáveis e critérios de aceite estão em [Deploy](knowledge/operations/deploy.md).

Um setup pode reportar `eve link` como pré-requisito; rode-o e tente a continuação. Quando um evento de setup concluído tiver `deploymentRequired: true`, rode o comando `next` que ele reporta.

## Validação

Siga o checklist do guia local da área alterada. Para mudanças que atravessam áreas, rode `npm run typecheck` e os testes dos guias afetados.

## Mapa de conhecimento (OKF)

O conhecimento durável deste projeto vive em `knowledge/`, um bundle OKF v0.2. Leia `knowledge/index.md` primeiro e abra apenas os conceitos necessários — não carregue o bundle inteiro.

| Onde | Tipo | Use quando |
| --- | --- | --- |
| [`knowledge/index.md`](knowledge/index.md) | índice do bundle | precisar de contexto de produto, arquitetura, domínio, decisões ou operações |
| [`agent/AGENTS.md`](agent/AGENTS.md) | guia local | criar ou alterar instructions, tools, channels ou schedules |
| [`lib/AGENTS.md`](lib/AGENTS.md) | guia local | alterar regras de domínio, banco, tempo ou notificações |
| [`db/AGENTS.md`](db/AGENTS.md) | guia local | criar migração ou mexer no schema |
| [`knowledge/operations/commits.md`](knowledge/operations/commits.md) | padrão | escrever mensagem de commit |

Os documentos em `knowledge/references/` são fontes históricas. A fonte de verdade atual é o bundle; se algum deles divergir do código, o código e os conceitos de domínio vencem.

## Convenções do bundle OKF

- Todo conceito em `knowledge/` é um arquivo `.md` com frontmatter YAML e o campo `type`.
- `index.md` e `log.md` são nomes reservados; não crie conceitos com esses nomes.
- Links entre conceitos são absolutos em relação à raiz do bundle: `/domain/tasks.md`.
- Links para código usam caminho relativo: `../../lib/tasks.ts`.
- Use `status: draft` para o que ainda não existe no código, `stable` para o que existe e `deprecated` para o obsoleto.
- `generated` registra quem escreveu e quando; `verified` só entra depois de revisão humana.
- Ao mudar comportamento, atualize o conceito correspondente e registre em `knowledge/log.md` no mesmo commit.
- Não duplique fatos dos documentos históricos em `knowledge/references/`; mova o fato para o bundle e deixe um link.
- Segredos nunca entram no bundle: apenas nomes de variáveis de ambiente.
