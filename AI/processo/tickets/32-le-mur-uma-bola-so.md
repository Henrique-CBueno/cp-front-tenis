# 32: Uma Bola só, e a pausa

**What to build:** o Le Mur respeita a regra do glossário: a página tem uma Bola, e só uma fica à vista.
- **A Bola volta ao rali:** ela só pertence ao jogo enquanto o traço do rali está completo (`rally.finished()`). Se você sobe e o traço "desdesenha", a bola do jogo some, a partida pausa e a Bola segue o rali. Descendo de novo, ela salta outra vez do ingresso para o jogo.
- **A pausa fora da tela:** se o Le Mur sai da tela no meio da partida, o jogo pausa (`IntersectionObserver`). Ao voltar, "toque para continuar" (ou clique, ou espaço), e a partida segue de onde parou.

**Blocked by:** 28

**Status:** done

- [x] Vitest: pausado, `step` não avança, e a partida retoma com o mesmo placar e os mesmos erros
- [x] Playwright: rolando para cima e para baixo no meio da partida, nunca há duas bolas à vista (amostrado quadro a quadro, como na correção #39)
- [x] Playwright: sair da tela pausa; voltar mostra "toque para continuar"
- [x] Log da etapa em `processo/prompts/`

## Comment

Feito em 2026-10-12 (prompt 51).
- **Regras:** fase `paused`, com `pause()` (só no meio da partida) e `resume()`. Pausado, `step` não avança e a rebatida não vale.
- **Uma Bola só:** com o traço incompleto, a Bola volta ao rali e a partida pausa. Na volta, ela salta do ingresso para **onde estava**, e não para o chão.
- **Ordem do ticker:** o Le Mur entra no `gsap.ticker` depois do render do rali, para ler `rally.finished()` do mesmo quadro. Antes, na troca, podia haver um quadro com as duas bolas.
- **Fora da tela:** `IntersectionObserver` pausa com menos de 30% da seção visível, e `visibilitychange` pausa com a aba escondida.
- **A volta:** um toque ou clique no Le Mur, ou espaço/Enter no "Jogar", retoma sem rebater. O status diz "Pausa. Toque para continuar" no celular e "Pausa. Clique ou aperte espaço para continuar" no computador. A raquete encostando, sozinha, não retoma.
- **Testes:** 3 de unidade, escritos antes do código. 2 E2E: as bolas visíveis amostradas por `requestAnimationFrame` enquanto a página rola com a roda, nunca mais de uma; e sair da tela pausa, sem a bola cair, até o clique retomar.
