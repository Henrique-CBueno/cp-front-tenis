# 16: A bola na Histoire

**What to build:** durante o pin horizontal da Histoire, a bola não some. Ela rola sobre a linha do tempo, quicando de data em data conforme a linha corre, e devolve o controle ao trajeto do rali quando a seção solta.

**Blocked by:** 14

**Status:** done

- [x] Playwright: a bola fica visível durante o pin da Histoire
- [x] A bola quica sobre os dots das datas; transições suaves na entrada e na saída do pin
- [x] Celular (linha do tempo vertical) e reduced-motion tratados
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. Bola da linha do tempo em `src/extras.js` (`hopAlong`), desktop e celular; teste E2E.
