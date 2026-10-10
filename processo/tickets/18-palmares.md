# 18: Palmarès

**What to build:** depois de Les Légendes, a seção "Palmarès": uma galeria em ordem cronológica dos campeões com foto livre segurando o troféu (homens e mulheres). Cada card mostra o troféu certo (Mousquetaires ou Suzanne-Lenglen), o ano e o nome. Hover, foco e toque disparam uma máscara de saibro que sobe como onda e revela a foto (duotone → cor). No celular, o card no centro da tela revela sozinho. Entra um link na navegação.

**Blocked by:** 13

**Status:** done

- [x] Lista semântica (ano, nome, troféu); a foto tem `alt` descritivo
- [x] Revelação por hover, por `:focus-visible` e por toque; no celular, também pelo scroll
- [x] Playwright: hover e foco revelam a foto; o toque revela no celular
- [x] Grade de 3 colunas no desktop, lista no celular; sem transbordamento
- [x] O traço do rali respeita o vazio reservado da seção
- [x] Log da etapa em `processo/prompts/`
