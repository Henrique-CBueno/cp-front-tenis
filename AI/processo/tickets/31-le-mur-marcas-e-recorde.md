# 31: Marcas da partida, placar e recorde

**What to build:** o saibro que conta a história da partida, e o motivo para jogar de novo.
- **As Marcas:** cada quique válido deixa uma Marca no saibro do Le Mur (reusar `stamp`, `erase` e `dust` de `src/impact.js`). Elas duram a partida e se desfazem quando a próxima começa.
- **O placar:** em tempo real, em fonte display ("07 rebatidas · recorde 18").
- **Os erros:** três marcas ovais vazias que se preenchem a cada erro, sem corações nem "vidas".
- **O fim da partida:** "12 rebatidas · recorde 18", com destaque quando bate o recorde.
- **O recorde:** guardado no navegador (localStorage, com try/catch; sem storage, o jogo funciona e só não lembra).

**Blocked by:** 28

**Status:** done

- [x] Vitest: o recorde só sobe
- [x] Playwright: cada quique válido deixa uma Marca; uma nova partida limpa as Marcas; o recorde sobrevive ao recarregar
- [x] A página funciona com o storage bloqueado
- [x] Log da etapa em `processo/prompts/`

## Comment

Feito em 2026-10-12 (prompt 50).
- **Marcas:** cada quique válido cria uma `.rally__bounce.mur__mark` na linha de base, com `stamp` e `dust`. Quando a rebatida começa uma partida nova (a partir de idle ou over), `erase` recolhe as Marcas e elas são removidas.
- **Placar:** "07 rebatidas · recorde 18". O trecho do recorde só aparece com recorde maior que 0.
- **Erros:** três ovais de giz que escurecem (`is-made`), com `role="img"` e `aria-label` "N erros de 3".
- **Fim:** "Novo recorde: N rebatidas…" em amarelo (#f3f7a2, que sobre o saibro passa 5:1) quando o recorde cai; senão, "Fim de partida: …".
- **Recorde:** fica em `localStorage['la-trace:le-mur:recorde']`, com try/catch na leitura e na escrita. Com reduced-motion, o estado parado mostra o recorde, se houver.
- **Testes:** o Vitest "o recorde só sobe" já existia (ticket 28). E2E novos: as Marcas e a limpeza; o recorde ao recarregar; o storage bloqueado sem erro na página. O teste do fim de partida foi atualizado.
