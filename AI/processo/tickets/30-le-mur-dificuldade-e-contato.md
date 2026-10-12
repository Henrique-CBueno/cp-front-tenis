# 30: Dificuldade e qualidade do contato

**What to build:** o que faz a precisão contar e a partida ter fim.
- **A força do gesto (computador):** encostar parado dá um toque fraco; subir o mouse ao encostar dá uma rebatida forte. O cursor-raquete passa a velocidade vertical do ponteiro ao alvo.
- **O sweet spot:** a distância entre a Bola e o centro das cordas (`SPOT` em `src/racket.js`) vira a qualidade. O centro manda a Bola alto e reta; a borda, baixa e para o lado (o que pode mandá-la para fora).
- **A curva:** a cada 5 rebatidas, a gravidade e a velocidade sobem um pouco.

**Blocked by:** 28

**Status:** done

- [x] Vitest: a qualidade muda a altura e o desvio lateral; a força muda a velocidade; a dificuldade sobe a cada 5 rebatidas e não antes
- [x] Playwright: uma passada pelo centro das cordas manda a Bola mais alto que uma passada pela borda
- [x] Log da etapa em `processo/prompts/`

## Comment

Feito em 2026-10-12 (prompt 49).
- **Regras:** `hit({ quality, power, side })`.
  - **O pico:** `hitApex × (0,75 + 0,25·quality) × (0,65 + 0,7·power)`, limitado a 92% da quadra.
  - **O desvio lateral:** `side × (1 − quality)`.
  - **A dificuldade:** `level = ⌊placar/5⌋`; a gravidade sobe 10% por nível, com no máximo 8 níveis, e a bola sobe a mesma altura em menos tempo.
- **Raquete:** passa `vy` (a velocidade vertical do ponteiro, que decai como `vx`). A força é `−vy/25`, entre 0 e 1: a raquete parada dá um toque fraco, e subir o mouse dá a força toda. Celular e teclado usam força 0,5.
- **O sweet spot:** pela distância **horizontal** ao centro das cordas, e não pela direta (ver correção #41).
- **Testes:** 4 de unidade, escritos antes do código (vermelhos, depois verdes), e 1 E2E (centro sobe mais que a borda).
