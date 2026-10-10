# 18: Palmarès

**What to build:** depois de Les Légendes, a seção "Palmarès": uma galeria em ordem cronológica dos campeões com foto livre segurando o troféu (homens e mulheres). Cada card mostra o troféu certo (Mousquetaires ou Suzanne-Lenglen), o ano e o nome. Hover, foco e toque disparam uma máscara de saibro que sobe como onda e revela a foto (duotone → cor). No celular, o card no centro da tela revela sozinho. Entra um link na navegação.

**Blocked by:** 13

**Status:** ready-for-agent

- [ ] Lista semântica (ano, nome, troféu); a foto tem `alt` descritivo
- [ ] Revelação por hover, por `:focus-visible` e por toque; no celular, também pelo scroll
- [ ] Playwright: hover e foco revelam a foto; o toque revela no celular
- [ ] Grade de 3 colunas no desktop, lista no celular; sem transbordamento
- [ ] O traço do rali respeita o vazio reservado da seção
- [ ] Log da etapa em `processo/prompts/`
