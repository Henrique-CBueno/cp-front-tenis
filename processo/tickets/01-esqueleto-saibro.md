# 01: Esqueleto: o saibro no ar

**What to build:** o visitante abre a página e já vê o saibro em tela cheia (estratégia Drenched), com o wordmark tipográfico, um título em francês na primeira dobra, o CTA "Garanta seu ingresso" levando ao site oficial em nova aba, e um rodapé com o aviso de tributo não oficial e o espaço de créditos. Por trás disso: projeto Vite + JS puro com GSAP e Lenis instalados, Vitest e Playwright configurados, e o build de produção servível localmente. É o caminho completo de ponta a ponta, só que mínimo.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] `npm run dev` e `npm run build` funcionam; o build servido localmente mostra a página
- [ ] Saibro `#b9532c` cobre a primeira dobra; linhas/creme `#f6efe2` como cor de texto e estrutura
- [ ] CTA "Garanta seu ingresso" com `href` do site oficial, `target=_blank` e `rel=noopener`
- [ ] Rodapé com "projeto acadêmico, sem vínculo com a Fédération Française de Tennis" e a seção de créditos
- [ ] Sem logo oficial: wordmark tipográfico próprio
- [ ] Smoke test Playwright sobre o build: console sem erros + `href` do CTA correto
- [ ] Vitest roda (mesmo sem testes do domínio ainda)
- [ ] Log da etapa em `processo/prompts/`
