# 17: Face-à-face Guga × Nadal

**What to build:** dentro de Les Légendes, antes do coração, uma seção presa em que Guga (esquerda) e Nadal (direita) entram em duotone de saibro, com o nome grande atrás de cada um. Eles se aproximam da linha central; quando "se encaram", ganham cor e a linha central pulsa como uma rede. Os títulos contam (3 | 14) e aparece "Dois reis do saibro. Um brasileiro.". No celular, os dois ficam lado a lado e se encarando. Em reduced-motion, aparece o estado final.

**Blocked by:** 13

**Status:** done

- [x] Sequência conduzida pelo scroll: entrada → aproximação → encontro (cor + pulso) → contagem → frase
- [x] Os dois realmente se encaram (fotos espelhadas quando preciso)
- [x] Playwright: o estado final tem os dois em cor e os números 3 e 14
- [x] Celular e reduced-motion tratados; sem transbordamento em 360/390
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. `src/face.js`, seção presa e opaca, duotone → cor, contagem e frase; celular e reduced-motion tratados; 3 testes E2E.
