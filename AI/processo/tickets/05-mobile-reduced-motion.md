# 05: Mobile e reduced-motion

**What to build:** no celular, a página baixa só o conjunto mobile de quadros, as seções ficam empilhadas e legíveis e não há scroll horizontal. Com `prefers-reduced-motion`, o saque vira o quadro estático do impacto, pin e parallax são desligados e as marcas aparecem completas.

**Blocked by:** 03

**Status:** done

- [x] Playwright (viewport mobile): só arquivos do conjunto mobile são requisitados
- [x] Playwright (reduced-motion emulado): o quadro estático é exibido e nenhum outro quadro da sequência é requisitado
- [x] Sem overflow horizontal em 390px
- [x] O saque fica fluido num celular médio (verificado manualmente ou por throttling)
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. 4 testes novos no Playwright, validados por mutação. Fluidez medida com a CPU 4× mais lenta: 60 fps no mobile, 30 fps no desktop. Medição em `tools/medicoes/fluidez.mjs`.
