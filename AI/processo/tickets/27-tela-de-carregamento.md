# 27: Tela de carregamento

**What to build:**
- Uma **tela de carregamento** no estilo "La Trace" (decisão 017): o logo de Roland-Garros se enche de giz e a linha de base é pintada conforme o essencial chega, com a bola quicando na ponta. Um contador mostra a % real.
- Na saída, o logo voa até o lugar dele no topo, e o saibro da tela se desfaz por cima da página.
- Liberar o scroll não empurra a página para o lado (`scrollbar-gutter: stable`).
- O **scroll fica travado** até chegarem as fontes, a arquibancada e os quadros-chave do saque. Depois, a tela sobe e libera a página.
- O **resto dos quadros** carrega por trás, 4 de cada vez, e não tudo junto (era isso que travava o começo).
- Tempo mínimo em curva: o logo leva pelo menos 2,4 s para encher, sem saltos. O teto continua de 8 s: numa rede ruim, a página abre assim mesmo.
- Com reduced-motion: sem quique, e a tela some com um fade.

**Blocked by:** None

**Status:** done

- [x] Durante o carregamento, a roda do mouse não rola a página; depois, rola (Playwright)
- [x] O contador chega a 100% antes de a tela sair (Playwright)
- [x] Com reduced-motion, a tela também sai (Playwright)
- [x] Quadros-chave primeiro, o resto com concorrência limitada e progresso avisado (Vitest)
- [x] Os 62 E2E antigos esperam a tela sair (fixture `tests/e2e/fixtures.js`)
- [x] Log da etapa em `processo/prompts/`

## Comments
- 2026-10-12: revisado pelo prompt 41 (logo de RG, nova saída e sem a pulada da barra de rolagem). Ver correção #37.
- 2026-10-12: prompt 42, o tempo mínimo virou uma curva de 2,4 s, com velocidade limitada (decisão 017).
