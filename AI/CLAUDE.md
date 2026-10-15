# Roland Garros: Landing Page (CP FIAP)

Landing page-tributo a Roland Garros, com parallax e um saque real conduzido pelo scroll. O contexto do produto está em
`PRODUCT.md` e a direção visual em `processo/idv/brief-direcao.md` ("La Trace").

## Registro do processo (obrigatório)

O professor avalia o processo tanto quanto a página. Ao fim de cada etapa:
- registrar o prompt literal do usuário e o que a IA fez em `processo/prompts/AAAA-MM-DD-NN-tema.md`;
- registrar decisões novas em `processo/decisoes/NNN-tema.md` (contexto → opções → escolha → porquê);
- registrar recomendações recusadas, erros e mudanças de rumo em `processo/correcoes-de-rota.md`.

## Agent skills

### Issue tracker

Local markdown: spec em `processo/spec.md`, tickets em `processo/tickets/NN-slug.md`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded in each ticket's `Status:` line. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root, created lazily. See `docs/agents/domain.md`.
