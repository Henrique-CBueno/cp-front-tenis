# 02: Sequência do Saque com quadros provisórios

**What to build:** ao rolar a primeira dobra, a seção fica fixa e o jogador do vídeo Mixkit 873 lança a bola e saca no canvas, quadro a quadro, conduzido pelo scroll. Os quadros são **provisórios**: extraídos do vídeo com o fundo original, sem recorte. Assim o mecanismo fica pronto antes da preparação final das imagens. Inclui o módulo puro **Sequência do Saque** (escolha do conjunto, progresso → quadro, ordem de preload, fallback para o quadro carregado mais próximo) com testes unitários, e a camada de desenho no canvas (DPR, `requestAnimationFrame`, redesenho só quando o quadro muda).

**Blocked by:** 01

**Status:** done

- [x] Vitest: progresso 0/1 e fora de [0,1] → primeiro/último quadro
- [x] Vitest: mapeamento proporcional ao número de quadros do conjunto ativo
- [x] Vitest: viewport estreito → mobile; largo → desktop; reduced-motion → estático (independe da largura)
- [x] Vitest: ordem de preload = primeiro quadro → quadros-chave → resto
- [x] Vitest: alvo não carregado → quadro carregado mais próximo; nada carregado → "nada a desenhar", sem erro
- [x] O primeiro quadro aparece quase imediatamente; o saque é fluido no scrub com pin (GSAP ScrollTrigger + Lenis)
- [x] Playwright: depois de rolar pela seção, o canvas tem pixels não transparentes
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. 11 testes unitários escritos com TDD e 3 smoke tests verdes. Os quadros provisórios saem de `tools/frames-provisorios.sh`. Revisão de código: nenhum bug. Ponto de desempenho repassado ao ticket 03.
