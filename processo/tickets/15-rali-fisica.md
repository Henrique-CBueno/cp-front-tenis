# 15: Rali 2.0, os quiques, a sombra e o pó

**What to build:** nos respiros, a bola quica de verdade. Em cada ponto de quique ela achata, deixa uma mini marca que afunda no saibro e levanta um pouco de pó. Uma sombra no chão cresce e encolhe com a altura da bola ao longo de cada arco. A altura vem do módulo Trajeto do Rali.

**Blocked by:** 14

**Status:** done

- [x] Vitest: a altura é 0 nos pontos de quique e máxima no meio de cada arco
- [x] Mini marcas persistem no saibro depois do quique; o pó tem vida curta e não pesa (meta de fps mantida)
- [x] Achatamento perto do chão; sombra coerente com a altura
- [x] Reduced-motion: marcas já presentes, sem pó nem achatamento
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. A altura da bola foi testada no módulo; sombra, achatamento, mini marcas e pó estão no rally.js; 2 testes E2E.
