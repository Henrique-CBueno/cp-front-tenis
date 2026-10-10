# 19: Títulos letra a letra e marquee

**What to build:** os títulos das seções se revelam letra a letra, esticando na largura (Anybody), uma vez, ao entrar na tela. Duas faixas de marquee ("Terre battue · Paris · Depuis 1891 · Jeu, set et match ·"), uma entre o hero e Terre Battue e outra antes de Jeu, Set et Match, aceleram com a velocidade do scroll e invertem ao rolar para cima.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Títulos: o nome acessível continua sendo a palavra inteira (`aria-label`; letras com `aria-hidden`); Playwright confere
- [x] Marquee sem costura; velocidade ligada ao scroll; parado em reduced-motion
- [x] Sem transbordamento horizontal (o marquee é recortado na seção)
- [x] Log da etapa em `processo/prompts/`
