# 30: Dificuldade e qualidade do contato

**What to build:** o que faz a precisão contar e a partida ter fim.
- **A força do gesto (computador):** encostar parado dá um toque fraco; subir o mouse ao encostar dá uma rebatida forte. O cursor-raquete passa a velocidade vertical do ponteiro ao alvo.
- **O sweet spot:** a distância entre a Bola e o centro das cordas (`SPOT` em `src/racket.js`) vira a qualidade. O centro manda a Bola alto e reta; a borda, baixa e para o lado (o que pode mandá-la para fora).
- **A curva:** a cada 5 rebatidas, a gravidade e a velocidade sobem um pouco.

**Blocked by:** 28

**Status:** ready-for-agent

- [ ] Vitest: a qualidade muda a altura e o desvio lateral; a força muda a velocidade; a dificuldade sobe a cada 5 rebatidas e não antes
- [ ] Playwright: uma passada pelo centro das cordas manda a Bola mais alto que uma passada pela borda
- [ ] Log da etapa em `processo/prompts/`
