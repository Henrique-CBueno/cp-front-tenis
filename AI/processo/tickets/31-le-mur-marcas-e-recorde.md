# 31: Marcas da partida, placar e recorde

**What to build:** o saibro que conta a história da partida, e o motivo para jogar de novo.
- **As Marcas:** cada quique válido deixa uma Marca no saibro do Le Mur (reusar `stamp`, `erase` e `dust` de `src/impact.js`). Elas duram a partida e se desfazem quando a próxima começa.
- **O placar:** em tempo real, em fonte display ("07 rebatidas · recorde 18").
- **Os erros:** três marcas ovais vazias que se preenchem a cada erro, sem corações nem "vidas".
- **O fim da partida:** "12 rebatidas · recorde 18", com destaque quando bate o recorde.
- **O recorde:** guardado no navegador (localStorage, com try/catch; sem storage, o jogo funciona e só não lembra).

**Blocked by:** 28

**Status:** ready-for-agent

- [ ] Vitest: o recorde só sobe
- [ ] Playwright: cada quique válido deixa uma Marca; uma nova partida limpa as Marcas; o recorde sobrevive ao recarregar
- [ ] A página funciona com o storage bloqueado
- [ ] Log da etapa em `processo/prompts/`
