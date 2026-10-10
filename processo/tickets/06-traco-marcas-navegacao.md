# 06: Traço da bola, Marcas e navegação

**What to build:** depois do hero, um **traço contínuo** (a trajetória da bola) é desenhado com o scroll e liga as Marcas numeradas que abrem cada seção ("Marca 02…"). Uma navegação mínima permite pular para as seções. Números e anos aparecem como marcas pequenas, num único tamanho de tipo, com hierarquia por peso e caixa. Entrega o sistema que as seções de conteúdo vão usar, demonstrado com seções-esqueleto.

**Blocked by:** 04

**Status:** done

- [x] O traço é um único path contínuo, desenhado progressivamente com o scroll
- [x] Componente de Marca numerada reutilizável pelas seções
- [x] Navegação mínima com âncoras para as seções, foco visível no teclado
- [x] Scroll suave sem sequestro (Lenis), âncoras funcionando
- [x] Com reduced-motion, o traço e as marcas aparecem completos
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude): concluído. O traço contínuo tem roteamento por tela para não cruzar o texto; as Marcas 02–04 afundam com o traço; a navegação usa âncoras via Lenis. 4 testes novos no Playwright. As seções 07–09 já têm esqueleto com título e marca para receber o conteúdo.
