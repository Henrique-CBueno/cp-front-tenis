# 28: Le Mur jogável (a fatia que atravessa tudo)

**What to build:** o menor Le Mur que já se joga de ponta a ponta, no computador (decisão 019).
- **A seção:** depois de "Jeu, Set et Match" e antes do rodapé, fora do container do rali (o traço continua terminando no ingresso). Uma tela de altura, saibro com grão, a linha de base em giz como chão e o título "Le Mur", sem número de Marca.
- **A chegada:** com o traço do rali completo, a Bola salta do ingresso para o saibro do Le Mur e fica quicando parada, com "Rebata para começar".
- **A rebatida:** o cursor-raquete rebate por contato (a força e o sweet spot ficam para o ticket 30). `createRacket` passa a aceitar uma lista de alvos: `[rally, mur]`.
- **As regras** (módulo puro `src/le-mur-rules.js`, com testes Vitest escritos primeiro):
  - parado → jogando (na primeira rebatida) → fim (no terceiro erro) → jogando (rebater recomeça, sem botão);
  - a Bola pode quicar uma vez; dois quiques seguidos sem rebatida é erro; a Bola fora pela lateral é erro;
  - depois de um erro (que não seja o terceiro), a Bola volta a quicar parada e espera a rebatida; os quiques parados não contam;
  - o placar é o total de rebatidas da partida.
- **O fim:** um placar provisório em texto ("12 rebatidas"); o visual final fica para o ticket 31.

**Blocked by:** None

**Status:** done

- [x] `src/le-mur-rules.test.js`: estados, quique válido, dois quiques, fora, terceiro erro, espera depois do erro, placar total, recorde (Vitest, antes da implementação)
- [x] `src/rally.js` expõe `finished()` (o traço completo)
- [x] Playwright: a Bola chega ao Le Mur com o traço completo; uma passada da raquete conta 1 rebatida; rebater e deixar cair três vezes mostra o placar (como depois de um erro a partida espera a rebatida, os três erros pedem três rebatidas)
- [x] O traço do rali continua terminando no ingresso; nenhum teste antigo quebra
- [x] Log da etapa em `processo/prompts/`

## Comments
- 2026-10-12: feito. Com reduced-motion, o Le Mur já mostra o aviso parado (o ticket 34 completa com o recorde). No celular, a Bola chega e quica, mas ainda não dá para rebater: é o ticket 29.
