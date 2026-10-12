# 29: Le Mur no celular e no teclado

**What to build:** as outras duas formas de rebater.
- **Celular:** tocar perto da Bola (raio de ~60 px) rebate; quanto mais perto do centro dela, melhor a rebatida (a qualidade entra em `hit({ quality })`). Arrastar continua rolando a página: o scroll nunca é travado.
- **Teclado:** um botão "Jogar" focável na seção; com o foco no jogo, o espaço rebate, com a mesma janela de tempo do toque (a Bola precisa estar ao alcance).
- **A instrução muda por aparelho:** "Encoste a raquete na bola para rebater" no computador, "Toque perto da bola" no celular, e a dica do espaço no teclado.

**Blocked by:** 28

**Status:** ready-for-agent

- [ ] Playwright (390 px, toque): um toque perto da Bola conta 1 rebatida; um toque longe não conta; arrastar rola a página
- [ ] Playwright (teclado): Tab chega ao botão "Jogar"; espaço rebate com a Bola ao alcance
- [ ] Sem transbordamento a 390 e a 360 px
- [ ] Log da etapa em `processo/prompts/`
