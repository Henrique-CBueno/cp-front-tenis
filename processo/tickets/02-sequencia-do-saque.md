# 02: Sequência do Saque com quadros provisórios

**What to build:** ao rolar a primeira dobra, a seção fica fixa e o jogador do vídeo Mixkit 873 lança a bola e saca no canvas, quadro a quadro, conduzido pelo scroll. Os quadros são **provisórios**: extraídos do vídeo com o fundo original, sem recorte. Assim o mecanismo fica pronto antes da preparação final das imagens. Inclui o módulo puro **Sequência do Saque** (escolha do conjunto, progresso → quadro, ordem de preload, fallback para o quadro carregado mais próximo) com testes unitários, e a camada de desenho no canvas (DPR, `requestAnimationFrame`, redesenho só quando o quadro muda).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Vitest: progresso 0/1 e fora de [0,1] → primeiro/último quadro
- [ ] Vitest: mapeamento proporcional ao número de quadros do conjunto ativo
- [ ] Vitest: viewport estreito → mobile; largo → desktop; reduced-motion → estático (independe da largura)
- [ ] Vitest: ordem de preload = primeiro quadro → quadros-chave → resto
- [ ] Vitest: alvo não carregado → quadro carregado mais próximo; nada carregado → "nada a desenhar", sem erro
- [ ] O primeiro quadro aparece quase imediatamente; o saque é fluido no scrub com pin (GSAP ScrollTrigger + Lenis)
- [ ] Playwright: depois de rolar pela seção, o canvas tem pixels não transparentes
- [ ] Log da etapa em `processo/prompts/`
