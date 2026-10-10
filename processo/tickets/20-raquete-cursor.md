# 20: Raquete-cursor

**What to build:** no desktop (`hover: hover` e `pointer: fine`, sem reduced-motion), o cursor vira uma raquete em SVG com o sweet spot (centro das cordas) como ponta. Ela segue o mouse com mola, dá um swing no clique e fica em "posição de espera" sobre links e botões. Quando encosta na bola do rali, a bola dá um pulinho e solta pó (easter egg).

**Blocked by:** 15

**Status:** done

- [x] Playwright: a raquete existe com mouse e não existe com toque nem com reduced-motion
- [x] O hotspot corresponde ao clique real (links clicáveis exatamente onde a raquete "aponta")
- [x] O foco por teclado continua visível; a posição de espera é clara sobre os links
- [x] A rebatida da bola não quebra o trajeto (a bola volta ao rali)
- [x] Log da etapa em `processo/prompts/`
