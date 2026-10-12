# 32: Uma Bola só, e a pausa

**What to build:** o Le Mur respeita a regra do glossário: a página tem uma Bola, e só uma fica à vista.
- **A Bola volta ao rali:** ela só pertence ao jogo enquanto o traço do rali está completo (`rally.finished()`). Se você sobe e o traço "desdesenha", a bola do jogo some, a partida pausa e a Bola segue o rali. Descendo de novo, ela salta outra vez do ingresso para o jogo.
- **A pausa fora da tela:** se o Le Mur sai da tela no meio da partida, o jogo pausa (`IntersectionObserver`). Ao voltar, "toque para continuar" (ou clique, ou espaço), e a partida segue de onde parou.

**Blocked by:** 28

**Status:** ready-for-agent

- [ ] Vitest: pausado, `step` não avança, e a partida retoma com o mesmo placar e os mesmos erros
- [ ] Playwright: rolando para cima e para baixo no meio da partida, nunca há duas bolas à vista (amostrado quadro a quadro, como na correção #39)
- [ ] Playwright: sair da tela pausa; voltar mostra "toque para continuar"
- [ ] Log da etapa em `processo/prompts/`
