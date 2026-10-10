# 05: Mobile e reduced-motion

**What to build:** no celular, a página baixa só o conjunto mobile de quadros, as seções ficam empilhadas e legíveis e não há scroll horizontal. Com `prefers-reduced-motion`, o saque vira o quadro estático do impacto, pin e parallax são desligados e as marcas aparecem completas.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Playwright (viewport mobile): só arquivos do conjunto mobile são requisitados
- [ ] Playwright (reduced-motion emulado): o quadro estático é exibido e nenhum outro quadro da sequência é requisitado
- [ ] Sem overflow horizontal em 390px
- [ ] O saque fica fluido num celular médio (verificado manualmente ou por throttling)
- [ ] Log da etapa em `processo/prompts/`
