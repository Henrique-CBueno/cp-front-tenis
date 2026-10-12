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

**Status:** ready-for-agent

- [ ] `src/le-mur-rules.test.js`: estados, quique válido, dois quiques, fora, terceiro erro, espera depois do erro, placar total (Vitest, antes da implementação)
- [ ] `src/rally.js` expõe `finished()` (o traço completo)
- [ ] Playwright: a Bola chega ao Le Mur com o traço completo; uma passada da raquete conta 1 rebatida; sem rebater, três erros mostram o placar
- [ ] O traço do rali continua terminando no ingresso; nenhum teste antigo quebra
- [ ] Log da etapa em `processo/prompts/`
