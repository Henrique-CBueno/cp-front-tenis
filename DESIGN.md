---
name: La Trace
description: A página é a quadra de saibro; cada seção é uma marca que a bola deixa no chão.
colors:
  clay: "#b04e29"
  clay-deep: "#8f3a18"
  chalk: "#f6efe2"
  chalk-soft: "#ecd9c6"
  groove: "#6e2a10"
  mark-core: "#7c3013"
  ball: "#d4dc3a"
  ball-highlight: "#f3f7a2"
  ball-shade: "#9fa524"
  strata-brick-tint: "#5a210b"
  strata-limestone: "#ece3d2"
  strata-limestone-ink: "#3a2a20"
  strata-clinker: "#3b3330"
  strata-clinker-tint: "#28221f"
  strata-gravel: "#93877b"
  strata-gravel-tint: "#a0968a"
  strata-gravel-ink: "#1f1813"
  strata-stone: "#5e554d"
  strata-stone-tint: "#463f39"
typography:
  display:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(5.5rem, 13vw, 10.5rem)"
    fontWeight: 500
    lineHeight: 0.82
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 7.5rem)"
    fontWeight: 500
    lineHeight: 0.85
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 62"
  feature:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(4rem, 12vw, 10rem)"
    fontWeight: 500
    lineHeight: 0.8
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 62"
  wordmark:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 150"
  mark-number:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 140"
  lede:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  scoreboard:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.06em"
  label:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.06em"
rounded:
  none: "0"
  oval: "50%"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  line: "clamp(6px, 0.7vw, 10px)"
  stack: "1.5rem"
  chapter-block: "clamp(5rem, 12vh, 9rem)"
components:
  cta-line:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1em 1.4em"
  cta-line-hover:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.clay-deep}"
  cta-quiet:
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    padding: "0.55em 0"
  cta-quiet-hover:
    textColor: "{colors.chalk-soft}"
  ticket:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.clay-deep}"
    rounded: "{rounded.none}"
  mark-oval:
    backgroundColor: "{colors.mark-core}"
    rounded: "{rounded.oval}"
    width: "clamp(72px, 7.5vw, 120px)"
  scoreboard-row:
    textColor: "{colors.chalk}"
    padding: "1.1rem 0"
  scoreboard-row-highlight:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.clay-deep}"
    padding: "1.1rem 1rem"
  court-ball:
    backgroundColor: "{colors.ball}"
    rounded: "{rounded.oval}"
    size: "clamp(12px, 1.15vw, 18px)"
  strata-brick:
    backgroundColor: "{colors.clay-deep}"
    textColor: "{colors.chalk}"
    typography: "{typography.label-lg}"
    padding: "0.6rem clamp(1rem, 4vw, 3.5rem)"
  strata-limestone:
    backgroundColor: "{colors.strata-limestone}"
    textColor: "{colors.strata-limestone-ink}"
    typography: "{typography.label-lg}"
    padding: "1.6rem clamp(1rem, 4vw, 3.5rem)"
  strata-clinker:
    backgroundColor: "{colors.strata-clinker}"
    textColor: "{colors.chalk}"
    typography: "{typography.label-lg}"
    padding: "1.8rem clamp(1rem, 4vw, 3.5rem)"
  strata-gravel:
    backgroundColor: "{colors.strata-gravel}"
    textColor: "{colors.strata-gravel-ink}"
    typography: "{typography.label-lg}"
    padding: "3.4rem clamp(1rem, 4vw, 3.5rem)"
  strata-stone:
    backgroundColor: "{colors.strata-stone}"
    textColor: "{colors.chalk}"
    typography: "{typography.label-lg}"
    padding: "2.4rem clamp(1rem, 4vw, 3.5rem)"
---

# Design System: La Trace

## Overview

**Creative North Star: "A página é a quadra"**

O saibro não é um detalhe nem uma foto de fundo: ele é a superfície da página inteira, em tela cheia, do topo ao rodapé. As linhas brancas da quadra são a estrutura (o grid), e cada seção abre com uma **marca**, o oval que a bola deixa no saibro e que o árbitro desce da cadeira para conferir. A página tem uma única cor de fundo (estratégia *Drenched*), um único material de linha (o creme da cal) e um único gesto de movimento: o traço da bola, que nasce no saque real do hero e desce a página ligando as marcas.

A densidade é baixa e teatral: capítulos de altura de tela, títulos condensados enormes, texto curto em colunas estreitas. Profundidade vem de camadas reais (arquibancada tingida, grão do saibro, fotos) e de parallax conduzido pelo scroll, não de cartões ou sombras de interface. Rejeições confirmadas no brief: site de esporte genérico (foto grande + cards), neon ou modo escuro "hype", logo oficial ou imitação do site oficial.

**Key Characteristics:**
- Fundo saibro contínuo; o rodapé desce um tom (saibro escuro), nunca muda de material.
- Linhas da quadra (fitas creme de espessura `line`) como estrutura: linha de base e linha central no hero e no fechamento, linha de base ao pé de cada capítulo.
- Marcas ovais numeradas ("Marca 01…04") como sistema de seção e de navegação do traço.
- Um traço fino de 1,5px, creme, que é a trajetória da bola; a bola é o único elemento amarelo.
- Tipografia que estica: Anybody em largura condensada (62%) nos títulos e expandida (140–150%) nos números e no wordmark.
- Movimento conduzido pelo scroll; com `prefers-reduced-motion`, o estado final completo e estático.

## Colors

Uma paleta de terra e cal: o saibro é a cor, o creme é a linha, e tudo mais é sombra do próprio saibro.

### Primary
- **Saibro** (`clay`): a superfície da página inteira, a barra do topo (em degradê para transparente) e o `theme-color`. É o saibro do brief (`#b9532c`) escurecido para que o texto creme passe 4,63:1 (decisão 007).

### Secondary
- **Saibro Escuro** (`clay-deep`): o rodapé, o texto sobre creme (ticket, linha do Guga no placar, CTA em hover), a camada "tijolo moído" do corte e o fundo do oval da marca.
- **Sulco** (`groove`): o traço do coração do Guga, riscado no saibro com 9px de espessura. Mais escuro que o saibro escuro porque é um corte no chão, não uma superfície.
- **Núcleo da Marca** (`mark-core`): o centro do degradê radial do oval, onde a bola afundou mais.

### Tertiary
- **Bola** (`ball`), com **Brilho da Bola** (`ball-highlight`) e **Sombra da Bola** (`ball-shade`): só a bola do traço, num degradê radial com luz no alto à esquerda (`radial-gradient(circle at 35% 30%, ball-highlight, ball 55%, ball-shade)`). É o único amarelo da página, e os três tons existem só nesse degradê.

### Material (estratos)
Uma família restrita ao Corte da Quadra: as cores dos materiais reais de cada camada, sob a foto do próprio material. Cada camada tem uma base (atrás da foto), um **tint** e uma cor de texto. O véu sobre a foto é o próprio tint com alfa, e a etiqueta do rótulo usa o tint sólido.
- **Tijolo moído:** base `clay-deep` com a textura do saibro em `multiply`, sem véu; tint `strata-brick-tint`; texto em cal.
- **Calcário branco:** base e tint `strata-limestone`, véu a 0,72; texto `strata-limestone-ink`.
- **Clínquer:** base `strata-clinker`, tint `strata-clinker-tint`, véu a 0,55; texto em cal.
- **Cascalho:** base `strata-gravel`, tint `strata-gravel-tint`, véu a 0,7; texto `strata-gravel-ink`.
- **Pedras e dreno:** base `strata-stone`, tint `strata-stone-tint`, véu a 0,68; texto em cal.

### Neutral
- **Cal** (`chalk`): todo texto, as linhas da quadra, o traço, o contorno do CTA, o foco (`outline` de 3px) e as superfícies invertidas (ticket, destaque do placar).
- **Cal Suja** (`chalk-soft`): texto secundário do rodapé, hover do CTA discreto e a barra de rolagem.

### Named Rules
**The Drenched Rule.** A superfície é a cor. Nenhuma seção ganha fundo branco, cinza ou cartão; o saibro corre do topo ao rodapé, e só o rodapé escurece um tom.

**The One Ball Rule.** O amarelo-esverdeado existe apenas na bola. Nenhum botão, destaque ou ícone usa essa cor.

**The Material Stays Underground Rule.** As cores de estrato pertencem só ao Corte da Quadra. Elas descrevem o que está debaixo do saibro e não sobem para fundos, textos ou destaques em outras partes da página.

**The Chalk Is Line Rule.** O creme é a cal da quadra: texto, linhas, traço e inversões. Não existe segunda cor de texto sobre o saibro além do creme e do creme sujo.

## Typography

**Display Font:** Anybody Variable (com fallback `sans-serif`), eixos de peso e largura, servida localmente via Fontsource.
**Body Font:** Schibsted Grotesk 400 e 700 (com fallback `sans-serif`).

**Character:** uma display que estica (o mesmo gesto da bola derrapando no saibro) contra uma grotesca de jornal, robusta e neutra, que carrega o texto em PT-BR sem disputar com os títulos.

### Hierarchy
- **Display** (`display`): o h1 "Le Service". No hero, a largura anima de 62% para 72% quando a Marca 01 afunda.
- **Headline** (`headline`): os títulos de capítulo (h2).
- **Feature** (`feature`): o h3 "Guga", a mesma receita condensada do headline, maior e mais apertada. É o clímax emocional, por isso supera o h2 do próprio capítulo.
- **Wordmark** (`wordmark`): "la trace", em minúsculas, na largura expandida. É o oposto exato dos títulos condensados.
- **Mark number** (`mark-number`): "Marca 01…04", largura 140%. No ticket cai para 0,875rem.
- **Lede** (`lede`): a frase de abertura de cada capítulo, até 34ch, `text-wrap: pretty`.
- **Body** (`body`): parágrafos de capítulo, até 52ch (46ch na história do Guga, onde o corpo sobe para `clamp(1.0625rem, 1.3vw, 1.25rem)`).
- **Scoreboard** (`scoreboard`): o tamanho único do placar, para nome e descrição.
- **Small** (`small`): o texto do rodapé (aviso e créditos). Notas de apoio, como a nota sob o ticket, descem para 0,875rem em peso normal.
- **Label grande** (`label-lg`): rótulos das camadas do corte, em caixa alta. O mesmo 0,875rem aparece no número da Marca 04 do ticket e no rótulo do ticket no celular, onde o espaçamento cai para 0,02em para caber numa linha.
- **Label** (`label`): navegação, CTA, legenda das marcas, camadas do corte e legendas de figura; sempre em caixa alta, peso 700, espaçamento 0,06em (0,08em na dica de scroll, 0,04em no placar).

### Named Rules
**The Stretch Rule.** A largura do Anybody carrega o sentido: condensada (62%) para títulos, expandida (125–150%) para wordmark, números de marca e títulos do rodapé. Não usar a largura normal (100%) da display.

**The One Size Scoreboard Rule.** Placares e números aparecem num único tamanho de texto (1,125rem no placar); a hierarquia vem só do peso, da caixa e de `tabular-nums`, nunca de um número gigante.

## Layout

Coluna única de capítulos empilhados, cada um com `min-height: 100svh`, grid centrado verticalmente e respiro vertical `chapter-block`. A margem lateral é sempre o `gutter`. O texto alterna de lado (capítulo à esquerda, capítulo à direita, alinhado à direita), e o traço do rali corre pela borda livre da página, do lado da próxima marca, sem nunca cruzar texto.

- **Hero (quadra):** grid de duas linhas (título em cima, CTA embaixo à direita), com a linha de base a 80% da altura e a linha central a 61% da largura. O jogador fica num canvas atrás do texto, à direita, apoiado na linha de base. A seção fica fixa (pin) por 180% de scroll.
- **Terre Battue:** duas colunas (texto 1fr, foto 0,85fr, foto em 4:5); o corte das camadas ocupa a largura toda e sangra até a borda (margem negativa igual ao gutter).
- **Les Légendes:** cabeçalho alinhado à direita, placar em largura total (colunas `minmax(10rem, 1fr)` / `2fr`), depois o artigo do Guga em duas colunas iguais (coração | história).
- **Jeu, Set et Match:** o hero repetido. Mesmas linhas de quadra; título à esquerda da linha central (61%) e o ticket pousado na caixa da direita.
- **Rodapé:** saibro escuro, texto até 60–70ch.

**Responsivo (≤ 720px):** tudo em uma coluna, navegação escondida (ficam wordmark e CTA discreto), texto sempre à esquerda, mas as marcas continuam alternando de lado. O jogador ocupa a largura toda acima da linha de base (que desce para 79%), a Marca 01 vai para baixo da linha, o CTA do hero estica em largura total, o placar empilha nome sobre descrição, a linha central do fechamento some e o traço do rali corre sempre pela margem direita.

## Elevation & Depth

A profundidade é material, não de interface. Ela vem de camadas reais empilhadas no hero (arquibancada em tons de cinza tingida pelo saibro com `multiply` e máscaras; grão do saibro em `soft-light`; o jogador mascarado na base, "nascendo" do saibro) e de parallax conduzido pelo scroll. As poucas sombras são quentes (marrom do saibro, nunca preto), difusas e com deslocamento negativo, como objetos apoiados no chão.

### Shadow Vocabulary
- **Pouso** (`box-shadow: 0 18px 36px -18px rgb(60 20 5 / 0.7)`): o ticket do fechamento, que "pousa" no saibro.
- **Foto no chão** (`box-shadow: 0 30px 60px -30px rgb(60 20 5 / 0.6)`): a foto da marca em Terre Battue.
- **Sombra da bola** (`box-shadow: 0 6px 10px -4px rgb(60 20 5 / 0.55)`): a bola do traço.
- **Marca afundada** (`box-shadow: inset 0 0 0 2px rgb(246 239 226 / 0.55)`): o anel de cal na borda do oval.

### Named Rules
**The Warm Shadow Rule.** Toda sombra é `rgb(60 20 5)`, a cor de saibro na sombra, com deslocamento negativo igual a metade do desfoque. Nada de sombras pretas, neutras ou deslocadas em bloco.

## Shapes

Retângulos de canto vivo e ovais; nada no meio. Botões, ticket, fotos, placar e camadas têm raio zero, porque são fitas e recortes de quadra. O único raio é o círculo: a bola e o oval da marca (proporção 2,2:1, `border-radius: 50%`), que cresce a partir da borda do lado de onde o traço chega. Bordas são linhas de quadra: 3px no CTA, 2px no sublinhado do CTA discreto e no topo do placar, 1px a 45% entre as linhas do placar, 2px tracejado no canhoto do ticket. Os traços (rali, voo do saque, coração) têm ponta redonda.

## Components

### Botões (CTA)
Fitas de cal sobre o saibro: firmes, sem raio, sem preenchimento em repouso.
- **Shape:** canto vivo (`rounded.none`).
- **CTA de linha (`cta-line`):** contorno de 3px em cal, label em caixa alta, seta SVG de traço quadrado à direita. Hover inverte: fundo cal, texto saibro escuro.
- **CTA discreto (`cta-quiet`):** só texto com sublinhado de 2px, na barra do topo. Hover: cal suja.
- **Transição:** cor e fundo em 220ms com `cubic-bezier(0.16, 1, 0.3, 1)`; a seta anda 4px no hover.
- **Foco:** `outline` de 3px em cal com 4px de afastamento (global).

### Navegação
Barra fixa no topo: wordmark à esquerda, nomes das quadras (labels) ao centro, CTA discreto à direita. Fundo em degradê do saibro para transparente (55%), sem borda. Hover dos links: sublinhado de 2px em cal. Escondida no celular, exceto wordmark e CTA. A rolagem por âncora é suave (Lenis).

### A Marca (componente assinatura)
O oval da bola no saibro, seguido do número ("Marca 0N") e, no hero, de uma legenda curta.
- **Oval:** `mark-oval`, degradê radial do núcleo para o saibro escuro e para transparente, anel interno de cal a 55%.
- **Estado:** começa em `scale(0)` e "afunda" (escala 0 → 1, `expo.out`) quando o traço chega; a legenda sobe 12px e aparece junto.
- **Posição:** nos capítulos, o número fica ao lado do oval e abaixo do fio do traço; em capítulos à direita, a ordem se espelha.
- Só existem quatro marcas, uma por seção narrativa; a última é o ticket.

### O Traço e a Bola
O fio de 1,5px em cal (opacidade 0,85), de ponta redonda, desenhado com `stroke-dashoffset`. No hero, ele é o voo da bola do ponto de contato do saque até a Marca 01; no rali, um único caminho que desce pela borda livre e entra em cada marca por cima, com a bola (`court-ball`) sempre na altura do meio da tela. Ele corre atrás dos blocos opacos (fotos e camadas).

### O Ticket
O CTA final, em forma de ingresso: fundo cal, texto saibro escuro, canhoto à esquerda com a Marca 04 separado por linha tracejada de 2px, label em caixa alta e seta. Sombra "Pouso". Hover: sobe 3px (220ms, mesma curva). No celular, o canhoto encolhe, a seta some e o label fica numa linha.

### O Placar
Lista de definição em largura total, com linha de cal de 2px no topo e divisórias de 1px a 45%. Nome em caixa alta e peso 700, descrição em texto normal com o número em negrito e `tabular-nums`. A linha do Guga é invertida (fundo cal, texto saibro escuro) e sangra 1rem para os lados.

### O Corte da Quadra (strata)
Cinco faixas de largura total, uma por camada real da quadra, cada uma com a foto do próprio material sob um véu da sua cor e uma altura proporcional à espessura (de 0,6rem a 3,4rem de respiro vertical). Rótulo à esquerda e medida (`tabular-nums`, peso 400) à direita, em `label-lg`. Cada texto fica numa etiqueta sólida na cor do tint da camada (padding `0.3em 0.6em`, canto vivo), para ficar legível sobre a textura. As cores vêm da família Material (estratos). No scroll, as camadas se afastam (14px por camada), como uma vista explodida.

### O Coração do Guga
Um único traço (`groove`, 9px, ponta e junção redondas) desenhado com o scroll, como a ponta da raquete riscando o saibro. Legenda em label.

## Do's and Don'ts

### Do:
- **Do** manter o saibro (`clay`) como fundo contínuo de todas as seções; escurecer para `clay-deep` só no rodapé.
- **Do** estruturar seções com linhas de quadra em cal, de espessura `line` (`clamp(6px, 0.7vw, 10px)`), e fechar cada capítulo numa linha de base.
- **Do** abrir cada seção narrativa com uma Marca numerada e ligá-la ao traço do rali.
- **Do** usar o Anybody condensado (62%) nos títulos e expandido (125–150%) em números e wordmark.
- **Do** usar a curva `cubic-bezier(0.16, 1, 0.3, 1)` em 220ms para estados, `expo.out` para marcas que afundam e easing linear (`scrub`) para parallax.
- **Do** entregar, com `prefers-reduced-motion`, o estado final completo: traço desenhado, marcas visíveis, quadro estático do saque.

### Don't:
- **Don't** colocar conteúdo em cartões, caixas arredondadas ou fundos claros; fora das fotos e das camadas do corte, o único creme sólido é o ticket e a linha do Guga.
- **Don't** usar o amarelo da bola em qualquer outro elemento.
- **Don't** deixar o traço do rali cruzar títulos ou parágrafos; ele corre pela borda livre.
- **Don't** usar sombras pretas, neutras ou em bloco; toda sombra é saibro na sombra.
- **Don't** usar neon, modo escuro, o logo oficial ou a linguagem visual do site oficial de Roland-Garros.
- **Don't** escrever texto corrido sobre o saibro em cor diferente da cal: o contraste do saibro com a cal é 4,63:1, sem folga para tons mais escuros.
