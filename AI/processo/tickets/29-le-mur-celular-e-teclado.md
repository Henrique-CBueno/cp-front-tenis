# 29: Le Mur no celular e no teclado

**What to build:** as outras duas formas de rebater.
- **Celular:** tocar perto da Bola (raio de ~60 px) rebate; quanto mais perto do centro dela, melhor a rebatida (a qualidade entra em `hit({ quality })`). Arrastar continua rolando a página: o scroll nunca é travado.
- **Teclado:** um botão "Jogar" focável na seção; com o foco no jogo, o espaço rebate, com a mesma janela de tempo do toque (a Bola precisa estar ao alcance).
- **A instrução muda por aparelho:** "Encoste a raquete na bola para rebater" no computador, "Toque perto da bola" no celular, e a dica do espaço no teclado.

**Blocked by:** 28

**Status:** done

- [x] Playwright (390 px, toque): um toque perto da Bola conta 1 rebatida; um toque longe não conta; arrastar rola a página
- [x] Playwright (teclado): Tab chega ao botão "Jogar"; espaço rebate com a Bola ao alcance
- [x] Sem transbordamento a 390 e a 360 px
- [x] Log da etapa em `processo/prompts/`

## Comment

Feito em 2026-10-12 (prompt 48).
- **Toque:** `pointerdown` não mouse, a até 60 px do centro da Bola, com `quality = 1 − d/60`, passivo (não cancela o arrasto). A seção ganhou `touch-action: manipulation`.
- **Qualidade:** `hit({ quality })` nas regras: a rebatida limpa sobe até o pico cheio; a de raspão, a 75% dele. O ticket 30 refina (sweet spot da raquete, lado).
- **Teclado:** o botão "Jogar" rebate no keydown de espaço ou Enter (sem clique sintético e sem rolar). A janela: `rules.reachable()`, ou seja, a Bola descendo e abaixo de 35% da altura da quadra.
- **Instrução:** raquete → "Encoste a raquete na bola para rebater"; celular → "Toque perto da bola"; com o foco no botão → a dica do espaço.
- **Testes:** 2 de unidade (qualidade, alcance) e 5 E2E (teclado, toque perto/longe, arrastar rola, 360 e 390 px).
