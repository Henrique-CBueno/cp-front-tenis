# 01: Esqueleto: o saibro no ar

**What to build:** o visitante abre a página e já vê o saibro em tela cheia (estratégia Drenched), com o wordmark tipográfico, um título em francês na primeira dobra, o CTA "Garanta seu ingresso" levando ao site oficial em nova aba, e um rodapé com o aviso de tributo não oficial e o espaço de créditos. Por trás disso: projeto Vite + JS puro com GSAP e Lenis instalados, Vitest e Playwright configurados, e o build de produção servível localmente. É o caminho completo de ponta a ponta, só que mínimo.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] `npm run dev` e `npm run build` funcionam; o build servido localmente mostra a página
- [x] Saibro `#b9532c` cobre a primeira dobra; linhas/creme `#f6efe2` como cor de texto e estrutura
- [x] CTA "Garanta seu ingresso" com `href` do site oficial, `target=_blank` e `rel=noopener`
- [x] Rodapé com "projeto acadêmico, sem vínculo com a Fédération Française de Tennis" e a seção de créditos
- [x] Sem logo oficial: wordmark tipográfico próprio
- [x] Smoke test Playwright sobre o build: console sem erros + `href` do CTA correto
- [x] Vitest roda (mesmo sem testes do domínio ainda)
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. Os 2 smoke tests do Playwright passaram; o Vitest roda (sem testes de domínio ainda, que entram no ticket 02). A revisão de código não achou nenhum bug. Pendente para o aluno: confirmar no navegador que `tickets.rolandgarros.com` é a bilheteria oficial.
