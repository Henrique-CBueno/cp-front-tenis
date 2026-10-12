# 34: Reduced-motion e fechamento do Le Mur

**What to build:** o Le Mur acessível a quem não quer movimento, e a revisão final da rodada.
- **Reduced-motion:** o Le Mur vira um estado parado, com a frase "o jogo aparece com as animações ligadas" e o recorde, se houver. Sem Bola em movimento e sem som.
- **Fechamento:** revisão de design da seção (desktop 1440 e celular 390); o `DESIGN.md` com o Le Mur; o glossário conferido contra o que foi construído; a suíte inteira verde.

**Blocked by:** 29, 30, 31, 32, 33

**Status:** ready-for-agent

- [ ] Playwright (reduced-motion): o estado parado aparece, com o recorde guardado, e nenhuma Bola anda
- [ ] `DESIGN.md` atualizado com a seção Le Mur
- [ ] `CONTEXT.md` conferido contra o código (Marca, Le Mur, Partida, Rebatida, Erro)
- [ ] Suíte Vitest e Playwright inteira verde
- [ ] Log da etapa em `processo/prompts/`
