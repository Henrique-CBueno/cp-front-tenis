---
name: La Trace
description: A página é a quadra de saibro; cada seção é uma marca que a bola deixa no chão.
colors:
  clay: "#b04e29"
  clay-deep: "#8f3a18"
  clay-dust: "#c9673a"
  chalk: "#f6efe2"
  chalk-soft: "#ecd9c6"
  groove: "#6e2a10"
  mark-core: "#7c3013"
  ball: "#d4dc3a"
  ball-highlight: "#f3f7a2"
  ball-shade: "#9fa524"
  soil-veil: "#381608"
  brick-band: "#c25a2e"
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
  ghost-name:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(4rem, 14.5vw, 16rem)"
    fontWeight: 800
    lineHeight: 0.8
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 62"
  scene-count:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 8rem)"
    fontWeight: 600
    lineHeight: 0.9
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 140"
  marquee:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 5rem)"
    fontWeight: 700
    lineHeight: 1
    fontVariation: "'wdth' 140"
  champion-year:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(2.25rem, 3.4vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 0.9
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 62"
  layer-title:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(3rem, 7vw, 6.5rem)"
    fontWeight: 500
    lineHeight: 0.85
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 62"
  depth-gauge:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 4rem)"
    fontWeight: 600
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 140"
  scene-line:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
    fontVariation: "'wdth' 75"
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
  date:
    fontFamily: "'Anybody Variable', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    fontFeature: "'tnum'"
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
  timeline-step: "clamp(17rem, 24vw, 22rem)"
  respiro: "clamp(12rem, 32vh, 22rem)"
  respiro-mobile: "clamp(9rem, 22vh, 14rem)"
  lane-mobile: "4.25rem"
  vao: "clamp(12rem, 18vw, 18rem)"
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
  timeline-dot:
    backgroundColor: "{colors.mark-core}"
    rounded: "{rounded.oval}"
    width: "2.3rem"
  timeline-item:
    textColor: "{colors.chalk}"
    typography: "{typography.date}"
    width: "{spacing.timeline-step}"
    padding: "2.75rem 2rem 0 0"
  scoreboard-row-number:
    textColor: "{colors.chalk}"
    typography: "{typography.scoreboard}"
    padding: "1.1rem 0"
  court-ball:
    backgroundColor: "{colors.ball}"
    rounded: "{rounded.oval}"
    size: "clamp(12px, 1.15vw, 18px)"
  rally-bounce:
    backgroundColor: "{colors.mark-core}"
    rounded: "{rounded.oval}"
    width: "34px"
  rally-dust:
    backgroundColor: "{colors.clay-dust}"
    rounded: "{rounded.oval}"
    size: "5px"
  face-count:
    textColor: "{colors.chalk}"
    typography: "{typography.scene-count}"
  champion-card:
    textColor: "{colors.chalk}"
    typography: "{typography.champion-year}"
    rounded: "{rounded.none}"
    width: "clamp(11rem, 20vw, 19rem)"
  champion-wave:
    backgroundColor: "{colors.clay-deep}"
    rounded: "{rounded.none}"
  marquee-band:
    backgroundColor: "{colors.clay-deep}"
    textColor: "{colors.chalk}"
    typography: "{typography.marquee}"
    rounded: "{rounded.none}"
    padding: "clamp(0.9rem, 2vw, 1.5rem) 0"
  racket:
    backgroundColor: "{colors.clay-deep}"
    textColor: "{colors.chalk}"
    width: "60px"
    height: "130px"
  racket-on-chalk:
    textColor: "{colors.clay-deep}"
  soil-scene:
    backgroundColor: "{colors.clay-deep}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
    padding: "0"
  soil-layer-text:
    textColor: "{colors.chalk}"
    typography: "{typography.layer-title}"
    width: "min(30rem, 42vw)"
  soil-gauge:
    backgroundColor: "{colors.soil-veil}"
    textColor: "{colors.chalk}"
    typography: "{typography.depth-gauge}"
    rounded: "{rounded.none}"
    padding: "0.05em 0.35em 0.1em"
  soil-mark:
    backgroundColor: "{colors.mark-core}"
    rounded: "{rounded.oval}"
    width: "clamp(72px, 7.5vw, 120px)"
  soil-cut-slab:
    backgroundColor: "{colors.brick-band}"
    rounded: "{rounded.none}"
    width: "clamp(9rem, 26vw, 22rem)"
    height: "68svh"
---

# Design System: La Trace

## Overview

**Creative North Star: "A página é a quadra"**

O saibro não é um detalhe nem uma foto de fundo: ele é a superfície da página inteira, em tela cheia, do topo ao rodapé. As linhas brancas da quadra são a estrutura (o grid), e cada seção abre com uma **marca**, o oval que a bola deixa no saibro e que o árbitro desce da cadeira para conferir. A página tem uma única cor de fundo (estratégia *Drenched*), um único material de linha (o creme da cal) e um único gesto de movimento: o rali, a bola que nasce no saque real do hero e desce a página inteira num traço contínuo, quicando entre as seções e deixando uma marca em cada quique.

A densidade é baixa e teatral: capítulos de altura de tela, títulos condensados enormes, texto curto em colunas estreitas. Cada seção reserva uma faixa vazia para a bola passar, e entre as seções há respiros de saibro sem conteúdo, onde ela cruza a página em arco. Profundidade vem de camadas reais (arquibancada tingida, grão do saibro, fotos, blocos opacos por onde a bola passa por trás, e a escavação de Sous la Terre, que desce pelos materiais debaixo da quadra) e de movimento conduzido pelo scroll, não de cartões ou sombras de interface. O visitante entra na quadra como jogador: com mouse, o cursor é uma raquete. Rejeições confirmadas no brief: site de esporte genérico (foto grande + cards), neon ou modo escuro "hype", logo oficial ou imitação do site oficial.

**Key Characteristics:**
- Fundo saibro contínuo; o rodapé e as faixas do marquee descem um tom (saibro escuro), nunca mudam de material.
- Linhas da quadra (fitas creme de espessura `line`) como estrutura: linha de base e linha central no hero e no fechamento, linha de base ao pé de cada capítulo, a rede no Face-à-face.
- Marcas ovais numeradas ("Marca 01…04") como sistema de seção; o mesmo oval sem número vira medida e chão (datas da linha do tempo, quiques do rali, o pouso no tijolo de Sous la Terre, base dos troféus).
- Toda marca nasce no instante do quique, com um tranco, e afunda devagar; uma vez feita, fica (rolar para cima não a desfaz).
- Um traço fino de 1,5px, creme, que é a trajetória da bola; a bola é o único elemento amarelo, e há uma só bola à vista. Nas cenas presas que recebem a bola, o rali a entrega à cena e a recebe de volta.
- Tipografia que estica: Anybody em largura condensada (62%) nos títulos e expandida (140–150%) nos números, no marquee e no wordmark; os títulos entram em quadra letra a letra.
- Movimento conduzido pelo scroll, com cenas presas (saque, Sous la Terre, Histoire, Face-à-face); com `prefers-reduced-motion`, o estado final completo e estático, sem raquete.

## Colors

Uma paleta de terra e cal: o saibro é a cor, o creme é a linha, e tudo mais é sombra ou poeira do próprio saibro.

### Primary
- **Saibro** (`clay`): a superfície da página inteira, a barra do topo (em degradê para transparente), o fundo opaco da Histoire e do Face-à-face, e o `theme-color`. É o saibro do brief (`#b9532c`) escurecido para que o texto creme passe 4,63:1 (decisão 007).

### Secondary
- **Saibro Escuro** (`clay-deep`): o rodapé, as faixas do marquee, a onda que revela o campeão no Palmarès, o cabo da raquete-cursor, o texto sobre creme (ticket, linha do Guga no placar, CTA em hover), o fundo de Sous la Terre e do corte em escala, e o anel do oval da marca.
- **Sulco** (`groove`): o traço do coração do Guga, riscado no saibro com 9px de espessura. Mais escuro que o saibro escuro porque é um corte no chão, não uma superfície.
- **Núcleo da Marca** (`mark-core`): o centro do degradê radial de todo oval (`radial-gradient(ellipse at 45% 50%, mark-core, clay-deep 60%, transparent 72%)`), onde a bola afundou mais. A mesma receita aparece na Marca, na mini marca da linha do tempo, nos quiques do rali e na base dos troféus.
- **Pó do Saibro** (`clay-dust`): um degrau acima do saibro, só nos grãos de pó que saltam quando a bola quica. É o saibro levantado e iluminado, e não existe como superfície.

### Tertiary
- **Bola** (`ball`), com **Brilho da Bola** (`ball-highlight`) e **Sombra da Bola** (`ball-shade`): só a bola, num degradê radial com luz no alto à esquerda (`radial-gradient(circle at 35% 30%, ball-highlight, ball 55%, ball-shade)`). É o único amarelo da página, e os três tons existem só nesse degradê.

### Debaixo do saibro (Sous la Terre)
Na escavação, as cores dos materiais vêm das próprias fotos de cada camada, em tela cheia; o sistema não tem uma cor por camada. O que o sistema põe por cima é um só tom, o saibro escuro mais fundo:
- **Véu de saibro escuro** (`soil-veil`, sempre com alfa): o véu que deixa a cal legível sobre qualquer material. No desktop, um degradê do lado do texto (0,9 → 0,7 a 32% → transparente a 62%, da esquerda para a direita); no celular, do pé da tela para cima (0,92 → 0,75 a 34% → transparente a 62%). A 0,82, é a etiqueta do numeral do medidor (o calcário e o cascalho são claros); a 0,55, o contorno de 2px que mantém a régua do medidor à vista sobre o calcário branco.
- **Faixa de tijolo** (`brick-band`): o fio de cima do corte em escala, o tijolo moído (1–2 mm de 80 cm). É sólido, sem foto, porque na escala real ele tem poucos pixels; as outras quatro faixas do corte usam as fotos das camadas.

### Neutral
- **Cal** (`chalk`): todo texto, as linhas da quadra, a rede, o traço, o contorno do CTA, o aro e as cordas da raquete, o foco (`outline` de 3px) e as superfícies invertidas (ticket, destaque do placar).
- **Cal Suja** (`chalk-soft`): texto secundário do rodapé, hover do CTA discreto e a barra de rolagem.
- **Cal translúcida** (cal com alfa, nunca um cinza): divisórias do placar (0,45), anel do oval (0,55; 0,45 nos quiques), cordas da raquete em espera (0,25) e os nomes-fantasma do Face-à-face (0,13).

### Duotone de saibro
As fotos de pessoas (Face-à-face e campeões do Palmarès) entram tingidas de saibro e ganham a cor de verdade no momento do encontro ou da revelação. O filtro é um só, em CSS e no JS: `grayscale(1) sepia(1) saturate(2.4) hue-rotate(-14deg) brightness(0.8) contrast(1.1)`, interpolado para a identidade (`grayscale(0) sepia(0) saturate(1) hue-rotate(0deg) brightness(1) contrast(1)`).

### Named Rules
**The Drenched Rule.** A superfície é a cor. Nenhuma seção ganha fundo branco, cinza ou cartão; o saibro corre do topo ao rodapé, e só o rodapé e o marquee escurecem um tom.

**The One Ball Rule.** O amarelo-esverdeado existe apenas na bola, e só há uma bola à vista. A bola do saque vira a bola do rali; nas cenas presas que recebem a bola (Sous la Terre e a Histoire), o rali a entrega à cena no pouso e a recebe de volta na saída, e a do rali fica escondida atrás da cena opaca enquanto isso. O visitante é o jogador: a raquete-cursor nunca usa a cor da bola (é cal e saibro escuro), então nenhum segundo objeto amarelo aparece na tela. Nenhum botão, destaque ou ícone usa essa cor.

**The Material Stays Underground Rule.** As fotos das camadas, o véu de saibro escuro e a faixa de tijolo pertencem só a Sous la Terre (a escavação e o corte). Eles descrevem o que está debaixo do saibro e não sobem para fundos, textos ou destaques em outras partes da página.

**The Chalk Is Line Rule.** O creme é a cal da quadra: texto, linhas, rede, traço, raquete e inversões. Não existe segunda cor de texto sobre o saibro além do creme e do creme sujo.

**The Clay Duotone Rule.** Foto de pessoa entra em tom de saibro e só ganha cor num gesto (o encontro na rede, a revelação do campeão). Fotos de material e de lugar (a marca, as camadas de Sous la Terre, a arquibancada) não passam pelo duotone.

## Typography

**Display Font:** Anybody Variable (com fallback `sans-serif`), eixos de peso e largura, servida localmente via Fontsource.
**Body Font:** Schibsted Grotesk 400 e 700 (com fallback `sans-serif`).

**Character:** uma display que estica (o mesmo gesto da bola derrapando no saibro) contra uma grotesca de jornal, robusta e neutra, que carrega o texto em PT-BR sem disputar com os títulos.

### Hierarchy
- **Display** (`display`): o h1 "Le Service". No hero, a largura anima de 62% para 72% quando a Marca 01 nasce.
- **Headline** (`headline`): os títulos de capítulo (h2). Entram letra a letra (ver Components).
- **Feature** (`feature`): o h3 "Guga", a mesma receita condensada do headline, maior e mais apertada. É o clímax emocional, por isso supera o h2 do próprio capítulo.
- **Nome-fantasma** (`ghost-name`): "KUERTEN" e "NADAL" atrás dos jogadores no Face-à-face, em caixa alta, peso 800, cal a 0,13. É ornamento (`aria-hidden`), o maior texto da página, dimensionado para "KUERTEN" caber em meia tela. No celular fica de pé (`writing-mode: vertical-rl`, `clamp(3.5rem, 17vw, 5rem)`) e some em telas baixas (≤ 700px de altura).
- **Contagem de cena** (`scene-count`): o placar 3 | 14 do Face-à-face, a receita do número de marca levada a tamanho de pôster. Rótulo em `label` acima.
- **Marquee** (`marquee`): a frase em francês das faixas, em caixa alta, largura 140%, separada por "·".
- **Ano do campeão** (`champion-year`): o ano de cada card do Palmarès. É o título do card, por isso condensado (62%) como os títulos, com algarismos tabulares.
- **Título de camada** (`layer-title`): o nome de cada camada de Sous la Terre ("Tijolo moído", "Calcário"…), o h3 da cena. A receita condensada dos títulos, num degrau abaixo do headline, porque divide a tela com a espessura e uma frase. A espessura da camada logo abaixo usa a receita do número de marca (1,5rem, 600, 140%), e a frase, o corpo da história do Guga (`clamp(1.0625rem, 1.3vw, 1.25rem)`, 1,45).
- **Medidor** (`depth-gauge`): o numeral da profundidade em Sous la Terre ("0 cm" … "80 cm"), expandido (140%) e com algarismos tabulares para não pular de largura enquanto conta. No celular cai para 1,75rem. A régua do corte em escala usa a mesma receita em 0,9375rem (o "80 cm" do fundo em 1,5rem); no celular, 0,75rem (o fundo em 1rem).
- **Linha de cena** (`scene-line`): a frase-título do Face-à-face ("Dois reis do saibro. **Um brasileiro.**"), o h2 da cena, com o trecho final em peso 800. Largura 75%, a única exceção ao par 62/140, porque é frase e não palavra.
- **Wordmark** (`wordmark`): "la trace", em minúsculas, na largura expandida. É o oposto exato dos títulos condensados.
- **Mark number** (`mark-number`): "Marca 01…04", largura 140%. No ticket cai para 0,875rem; na faixa da bola no celular, para 1,125rem, de pé.
- **Date** (`date`): os anos da linha do tempo da Histoire. É a receita do número de marca com algarismos tabulares, porque cada data também é uma marca.
- **Lede** (`lede`): a frase de abertura de cada capítulo, até 34ch, `text-wrap: pretty`.
- **Body** (`body`): parágrafos de capítulo, até 52ch (46ch na história do Guga, onde o corpo sobe para `clamp(1.0625rem, 1.3vw, 1.25rem)`).
- **Scoreboard** (`scoreboard`): o tamanho único do placar, para nome e descrição. No placar de números (Le Score), o termo à esquerda não vai em caixa alta, porque carrega unidades (cm, mm), e usa algarismos tabulares com espaçamento de 0,02em.
- **Small** (`small`): o texto do rodapé (aviso e créditos) e o nome da taça no Palmarès. Notas de apoio, como a nota sob o ticket, descem para 0,875rem em peso normal.
- **Label grande** (`label-lg`): o número da Marca 04 do ticket e o rótulo do ticket no celular, onde o espaçamento cai para 0,02em para caber numa linha. Os nomes das camadas ao lado do corte em escala usam o mesmo 0,875rem (0,75rem no celular): nome em caixa alta, peso 700, 0,04em, e a medida em peso normal, sem quebra.
- **Label** (`label`): navegação, CTA, legenda das marcas, rótulos do placar de cena e legendas de figura; sempre em caixa alta, peso 700, espaçamento 0,06em (0,08em na dica de scroll, 0,04em no placar e no nome do campeão).

### Exceções de escala
Os sete papéis fluidos `ghost-name`, `scene-count`, `marquee`, `champion-year`, `scene-line`, `layer-title` e `depth-gauge` ficam fora da rampa original de título (display/headline/feature) de propósito: cada um pertence a uma única cena e é dimensionado pela cena, não pela hierarquia. O nome-fantasma precisa caber em meia tela; a contagem de cena e o marquee são pôster; o ano do campeão precisa caber na coluna do card; a linha de cena precisa caber acima da rede, no vão que ela abre; o título de camada divide a tela com a frase e o véu; o medidor precisa caber entre a régua e a borda. Não reutilizar esses tamanhos fora das suas cenas.

### Named Rules
**The Stretch Rule.** A largura do Anybody carrega o sentido: condensada (62%) para títulos e para o que funciona como título (o ano do campeão, o nome-fantasma), expandida (125–150%) para wordmark, números de marca, contagens, medidas (o medidor e a régua de Sous la Terre), marquee e títulos do rodapé. A única largura intermediária é a linha de cena (75%). Não usar a largura normal (100%) da display.

**The Honest Count Rule.** Um número animado sempre termina no valor exato e formatado em pt-BR, e esse valor já está no HTML: sem movimento, o leitor vê o número final, nunca um zero.

**The One Size Scoreboard Rule.** Dentro de um placar (as listas de Les Légendes e de Le Score), tudo aparece num único tamanho de texto (1,125rem); a hierarquia vem só do peso, da caixa e de `tabular-nums`, nunca de um número gigante. O número grande existe só como cena (o 3 | 14 do Face-à-face), nunca como linha de placar.

**The Whole Word Rule.** Título animado letra a letra continua sendo lido como palavra: o h2 leva `aria-label` com o texto inteiro, as letras ficam `aria-hidden`, e as letras de cada palavra ficam juntas para a quebra de linha cair só entre palavras.

## Layout

Coluna única de capítulos empilhados, cada um com `min-height: 100svh`, grid centrado verticalmente e respiro vertical `chapter-block`. A margem lateral é sempre o `gutter`. Entre as seções ficam os **respiros** (`respiro`), faixas de saibro vazias onde a bola cruza a página em arco e quica uma ou duas vezes. Dentro de cada seção, uma **faixa da bola** (`lane`) é uma coluna vazia reservada para o traço, com a marca da seção no alto; o texto nunca ocupa essa coluna.

Ordem da página: hero, marquee, Terre Battue, Sous la Terre, Histoire, Les Légendes, Face-à-face, Guga, Palmarès, Le Score, marquee, Jeu, Set et Match, com respiros entre os blocos (o Face-à-face e o Guga seguem as Légendes sem respiro).

- **Hero (quadra):** grid de duas linhas (título em cima, CTA embaixo à direita), com a linha de base a 80% da altura e a linha central a 61% da largura. O jogador fica num canvas atrás do texto, à direita, apoiado na linha de base. A seção fica fixa (pin) por 180% de scroll.
- **Terre Battue:** três colunas (texto 1fr, faixa da bola `minmax(9rem, 0.42fr)`, foto 0,85fr em 4:5).
- **Sous la Terre:** cena presa de altura de tela (mínimo 32rem), opaca, em saibro escuro, de borda a borda e sem respiro lateral: as texturas sangram até a borda da tela. As cinco camadas são telas inteiras empilhadas numa coluna de 500% de altura. Título da cena (h2 + lede) no alto à esquerda, sobre a primeira camada, com a marca do pouso a 62% da largura e 52% da altura; em cada camada, o texto (título, espessura e frase) à esquerda, centrado na altura, até `min(30rem, 42vw)`; na primeira, ele desce para o pé da tela. O medidor ocupa a borda direita, de cima a baixo, dentro do gutter. No fim, o corte em escala ocupa a tela, centrado, em três colunas: nomes das camadas à esquerda (alinhados à direita, cada um na altura do meio da sua faixa, com um fio até a fatia), a fatia (`clamp(9rem, 26vw, 22rem)` × 68svh) e a régua de 0 a 80 cm à direita; legenda centrada abaixo, até 34ch.
- **Histoire:** cabeçalho (h2 + lede) alinhado à direita, para a bola descer pela esquerda até 1891, e, abaixo, a linha do tempo. O trilho é uma faixa horizontal de itens de largura `timeline-step` sobre uma linha de cal de espessura `line`, que sangra pela margem esquerda e continua depois de 2020 por um trecho a mais (`max(gutter, 18vw)`), por onde a bola sai. A seção tem fundo opaco de saibro (o traço do rali passa por trás dela) e esconde o que transborda.
- **Les Légendes:** faixa da bola à esquerda (`minmax(9rem, 0.62fr)`), com a Marca 03 centrada nela e o número ao lado; cabeçalho alinhado à direita e placar na coluna de conteúdo (colunas `minmax(10rem, 1fr)` / `2fr`).
- **Face-à-face:** cena de altura de tela, fixa por 220% de scroll, fundo opaco de saibro com grão em `soft-light` por cima de tudo. A rede é uma linha de cal vertical no centro; Guga à esquerda, Nadal à direita, presos ao pé do quadro e encostados na rede; nomes-fantasma a 16% do topo; placar 3 | 14 a 34%; a frase-título no alto, num vão que a rede abre para ela.
- **Guga:** o artigo em três colunas (coração 1fr | faixa da bola `minmax(7rem, 0.4fr)` | história 1fr).
- **Palmarès:** no desktop, a faixa da bola é o vão central (`vao`), posicionada pela seção inteira; os cards ficam em duas colunas espelhadas dos dois lados do vão, como os dois lados da rede, cada um com a foto virada para o vão (à esquerda, texto alinhado à direita e foto junto ao vão). A faixa é longa e a bola balança de um lado ao outro dentro dela. Lê-se da esquerda para a direita, de cima para baixo.
- **Le Score:** conteúdo à esquerda (título, lede e placar de números) e faixa da bola à direita (`minmax(9rem, 0.6fr)`).
- **Jeu, Set et Match:** o hero repetido. Mesmas linhas de quadra; título à esquerda da linha central (61%) e o ticket pousado na caixa da direita.
- **Rodapé:** saibro escuro, texto até 60–70ch.

**Navegação por largura:** cinco links (Le Service, Terre Battue, Les Légendes, Palmarès, Jeu, Set et Match). Até 1180px o "Le Service" sai (o wordmark já leva ao topo); até 1000px a navegação some e ficam wordmark e CTA discreto.

**Responsivo (≤ 720px):** tudo em uma coluna de texto, com a faixa da bola reduzida a uma coluna de `lane-mobile` que alterna de lado (direita em Terre, Guga, Le Score e no fechamento; esquerda em Les Légendes e no Palmarès), o número da marca de pé ao lado do traço e respiros mais baixos (`respiro-mobile`). Texto sempre à esquerda. O jogador ocupa a largura toda acima da linha de base (que desce para 79%), a Marca 01 vai para baixo da linha, o CTA do hero estica em largura total, o placar empilha nome sobre descrição, a linha do tempo fica de pé (linha vertical à esquerda, datas descendo, sem pin), Sous la Terre leva o texto de cada camada para o pé da tela (véu subindo do pé), o título da cena para a metade esquerda (até 52vw), a marca do pouso para 66% da largura e o medidor para o alto à direita (só o numeral, sem régua; a bola desce entre o texto e o medidor), o corte encolhe (fatia 24vw × 58svh, nomes numa coluna de 30vw que quebram linha), o Face-à-face sobrepõe os dois jogadores (84vw cada) com o placar acima deles, o Palmarès vira lista (foto de 8,5rem à esquerda, ano e nome ao lado) e a linha central do fechamento some.

## Elevation & Depth

A profundidade é material, não de interface. Ela vem de camadas reais empilhadas no hero (arquibancada em tons de cinza tingida pelo saibro com `multiply` e máscaras; grão do saibro em `soft-light`; o jogador mascarado na base, "nascendo" do saibro), do mesmo nascimento no Face-à-face (as fotos se dissolvem na borda de baixo), de blocos opacos que a bola atravessa por trás, da escavação de Sous la Terre (cinco camadas de foto que sobem uma tela cada, com a textura correndo mais devagar que a própria camada, e no fim a câmera recuando até o corte) e de parallax conduzido pelo scroll. O rali corre num plano abaixo do conteúdo (`z-index: -1` dentro de um contexto isolado): a bola passa por trás das fotos, de Sous la Terre, da Histoire, do Face-à-face e das faixas do marquee. Nas cenas que recebem a bola, a entrada e a saída do traço são redesenhadas por cima da cena, num SVG dela. As sombras são quentes (marrom do saibro, nunca preto) e difusas; as de objetos pousados têm deslocamento negativo, como objetos apoiados no chão.

### Shadow Vocabulary
- **Pouso** (`box-shadow: 0 18px 36px -18px rgb(60 20 5 / 0.7)`): o ticket do fechamento, que "pousa" no saibro.
- **Foto no chão** (`box-shadow: 0 30px 60px -30px rgb(60 20 5 / 0.6)`): a foto da marca em Terre Battue.
- **Fatia no chão fundo** (`box-shadow: 0 30px 60px -30px rgb(20 8 2 / 0.8)`): a fatia do corte em escala. A receita da foto no chão, mais escura porque o chão ali é o saibro escuro.
- **Sombra da bola** (`box-shadow: 0 6px 10px -4px rgb(60 20 5 / 0.55)`): a bola do saque e a bola sobre as cenas presas (Histoire, Sous la Terre).
- **Sombra no chão** (`background: rgb(60 20 5 / 0.55)`, elipse de 22×8px com `blur(2px)`): a sombra da bola do rali, que fica no traço enquanto a bola sobe; encolhe e clareia com a altura do arco.
- **Objeto erguido** (`filter: drop-shadow(0 6px 5px rgb(40 12 2 / 0.5))`): o troféu de pé no card; curta porque o card recorta o que passa da borda.
- **Raquete no ar** (`filter: drop-shadow(0 6px 8px rgb(40 12 2 / 0.45))`): a raquete-cursor, acima de tudo.
- **Marca afundada** (`box-shadow: inset 0 0 0 2px rgb(246 239 226 / 0.55)`): o anel de cal na borda do oval (1,5px a 0,45 nos quiques do rali).

### Named Rules
**The Opaque Ground Rule.** Toda seção ou bloco que fica por cima do rali (fotos, Sous la Terre, a Histoire fixa, o Face-à-face, as faixas do marquee) tem fundo opaco, para o traço e a bola passarem por trás em vez de cruzar o conteúdo.

**The Hand-Off Rule.** Uma cena presa que recebe a bola (Sous la Terre, a Histoire) é uma doca do rali: ela dá o ponto de entrada e o de saída, o rali desenha por cima da cena o trecho de traço que chega e o que sai, e entrega a bola à cena no pouso e a recebe de volta na saída. Nunca aparecem duas bolas. Sem movimento, não há doca: a cena não prende e o traço passa por trás dela.

**The Warm Shadow Rule.** Toda sombra é saibro na sombra: `rgb(60 20 5)` para o que está no chão, `rgb(40 12 2)` (mais escuro, mais curto) para o que está erguido em `drop-shadow` (troféu, raquete), e `rgb(20 8 2)` só para o que pousa sobre o saibro escuro (a fatia do corte). Nas `box-shadow` de objetos pousados, o deslocamento negativo é metade do desfoque. Nada de sombras pretas, neutras ou deslocadas em bloco.

## Shapes

Retângulos de canto vivo e ovais; nada no meio. Botões, ticket, fotos, cards do Palmarès, placar, faixas do marquee, camadas, a etiqueta do medidor e a fatia do corte têm raio zero, porque são fitas e recortes de quadra. O único raio é o círculo: a bola, sua sombra, o pó, e o oval da marca (proporção 2,2:1, `border-radius: 50%`), que cresce a partir da borda do lado de onde o traço chega e se repete nas datas, nos quiques, no tijolo de Sous la Terre (e no topo do corte) e sob os troféus. A única curva livre é a onda de saibro do Palmarès (uma máscara SVG com borda ondulada que sobe pelo card). Bordas são linhas de quadra: 3px no CTA, 2px no sublinhado do CTA discreto, no topo do placar, no topo da legenda do campeão e nas bordas do marquee, 1px a 45% entre as linhas do placar, 2px tracejado no canhoto do ticket, 2px na régua do medidor e na régua do corte (com tiques de 2px; os do medidor a cada 41px, por um `repeating-linear-gradient` de cal a 0,85). Os traços (rali, voo do saque, coração) têm ponta redonda. A raquete-cursor é o único desenho figurativo: aro oval, cordas, garganta em V e cabo arredondado.

## Components

### Botões (CTA)
Fitas de cal sobre o saibro: firmes, sem raio, sem preenchimento em repouso.
- **Shape:** canto vivo (`rounded.none`).
- **CTA de linha (`cta-line`):** contorno de 3px em cal, label em caixa alta, seta SVG de traço quadrado à direita. Hover inverte: fundo cal, texto saibro escuro.
- **CTA discreto (`cta-quiet`):** só texto com sublinhado de 2px, na barra do topo. Hover: cal suja.
- **Transição:** cor e fundo em 220ms com `cubic-bezier(0.16, 1, 0.3, 1)`; a seta anda 4px no hover.
- **Foco:** `outline` de 3px em cal com 4px de afastamento (global).

### Navegação
Barra fixa no topo: wordmark à esquerda, nomes das quadras (labels) ao centro, CTA discreto à direita. Fundo em degradê do saibro para transparente (55%), sem borda. Hover dos links: sublinhado de 2px em cal. Cinco links; "Le Service" some até 1180px e a navegação inteira até 1000px (ficam wordmark e CTA). A rolagem por âncora é suave (Lenis).

### A Marca (componente assinatura)
O oval da bola no saibro, seguido do número ("Marca 0N") e, no hero, de uma legenda curta.
- **Oval:** `mark-oval`, degradê radial do núcleo para o saibro escuro e para transparente, anel interno de cal a 55%.
- **Estado:** começa em `scale(0)` e nasce no instante do quique (ver "O Quique"); a legenda sobe 12px e aparece junto (0,5s, `expo.out`, 0,12s depois do toque).
- **Posição:** nos capítulos, a marca fica no alto da faixa da bola, com o número ao lado do oval e abaixo do fio do traço; no celular, o número fica de pé ao lado do traço.
- Só existem quatro marcas numeradas: 01 no hero (Le Service), 02 em Terre Battue, 03 em Les Légendes, 04 no ticket. As outras seções não abrem com marca numerada; o oval sem número aparece como medida (datas), como quique (rali), como pouso (o tijolo de Sous la Terre) e como chão (troféus).

### O Quique (a marca nascendo)
Toda marca que a bola faz nasce do mesmo jeito: as quatro Marcas de capítulo, as mini marcas dos respiros, as datas da Histoire e o pouso no tijolo de Sous la Terre.
- **Tranco:** no instante do toque, o oval sai de achatado e estreito (`scaleX 0.35`, `scaleY 0.15`, um pouco mais claro, `brightness(1.12)`), estica na largura e achata (`1.2 × 0.78`, 90ms, `power3.out`) e assenta com um balanço (`elastic.out(1, 0.45)`, 0,55s).
- **Afundar:** 0,15s depois, escurece e afunda devagar, como o saibro assentando (escala 0,96 e `brightness(0.8)`, 2,4s, `sine.inOut`). Esse é o estado de repouso de toda marca.
- **Fica:** uma marca feita não se desfaz; rolar para cima não a apaga. Se a página abre com a bola mais abaixo, ou com reduced-motion, as marcas que ficaram para trás já aparecem no estado afundado, sem tranco.
- **A bola sente o toque:** no rali, cada marca nova dá um tranco na bola (0,22s, `power2.out`): ela achata mais (até 30% mais larga e 32% mais baixa, além do achatamento do arco) e a inércia da ponta cai por um instante (até 75% menor), como se o saibro a segurasse.
- **Pó:** o quique solta pó (`rally-dust`), sete grãos de 5px em leque para cima, que somem em 0,7–1s (`expo.out`).

### O Rali (o traço e a bola)
Um único traço que desce a página inteira, do saque até o ticket.
- **Trajeto:** pontos de passagem na ordem do documento (a marca e a saída de cada faixa da bola, os quiques de cada respiro e a Marca 04), ligados por uma interpolação cúbica monótona `x = f(y)` (Fritsch–Carlson): passa exatamente por cada ponto e nunca vai além dos vizinhos, então não invade o texto. Numa faixa longa (o Palmarès), a bola balança de um lado ao outro dentro dela, quicando a cada ~480px.
- **Traço:** fio de 1,5px em cal (opacidade 0,85), ponta redonda, desenhado com `stroke-dashoffset`. A ponta segue o meio da tela com inércia (0,16 por quadro), então a bola desliza em vez de grudar no scroll.
- **Bola (`court-ball`):** sobe acima do traço em arco entre dois contatos (parábola, pico até 140px, maior em arcos longos), cresce levemente com a altura e achata ao tocar o chão (até 20% mais larga e 28% mais baixa). Sua **sombra no chão** fica sobre o traço.
- **Quique (`rally-bounce`):** cada quique dos respiros deixa uma mini marca (34px, mesmo oval da Marca, anel de 1,5px a 0,45), que nasce no toque como toda marca (ver "O Quique").
- **Plano:** o rali corre por trás de todo bloco opaco (fotos, Sous la Terre, Histoire, Face-à-face, marquee).
- **Docas:** Sous la Terre e a Histoire recebem a bola (The Hand-Off Rule). A cena dá os pontos de chegada (um pouco acima do pouso, descendo reto) e de saída (a bola caindo da cena); o rali desenha esses dois trechos de traço num SVG por cima da cena, na mesma espessura e opacidade do traço, e entrega a bola à cena entre o pouso e a saída. Fora da cena, quem aparece é a bola do rali; dentro dela, a da cena.
- **Reduced-motion:** o traço inteiro já desenhado, todas as marcas afundadas, sem bola em movimento.

### O Ticket
O CTA final, em forma de ingresso: fundo cal, texto saibro escuro, canhoto à esquerda com a Marca 04 separado por linha tracejada de 2px, label em caixa alta e seta. Sombra "Pouso". Hover: sobe 3px (220ms, mesma curva). É a última parada do rali. No celular, o canhoto encolhe, a seta some e o label fica numa linha.

### A Linha do Tempo (Histoire)
A linha de base da quadra vira linha do tempo, e cada data é uma marca.
- **Trilho:** linha de cal de espessura `line`, a 0,9rem do topo, que continua um trecho depois de 2020. Os itens (`timeline-item`) ficam lado a lado, cada um com a data em `date` e um texto curto de até 30ch.
- **Mini marca (`timeline-dot`):** o mesmo oval da Marca (proporção 2,2, degradê do núcleo para o saibro escuro, anel de cal a 55%), com 2,3rem de largura e centralizado sobre a linha. Cada data é uma marca: começa invisível (`scale(0)`) e nasce quando a bola toca nela (ver "O Quique"), com pó; depois fica.
- **A chegada:** a bola desce reta pela esquerda (o cabeçalho está à direita) e pousa em 1891 no instante em que a seção prende. O traço da chegada e o da saída são desenhados num SVG dentro do trilho, por cima da cena; no scroll lateral, a chegada fica para trás junto com as datas.
- **O caminho:** espera em 1891 (um quarto de tela de scroll), pula de data em data enquanto a linha corre (arco baixo de 30px, sem voltas, achatada a menos de 6% de cada data), espera em 2020 (outro quarto de tela), dá o último pulo até o meio do trecho de linha depois de 2020 (30% de tela) e cai da ponta da linha; o rali segue abaixo.
- **Movimento:** no desktop (≥ 721px), a seção fica fixa (o pin começa quando 1891 chega ao meio da tela) e o trilho corre na horizontal, conduzido pelo scroll (`scrub`, easing linear), por uma distância igual ao que transborda da tela.
- **Celular (≤ 720px):** o trilho fica de pé, com a linha vertical à esquerda e as mini marcas centralizadas sobre ela. Não há pin; a mesma regra vale na linha vertical: a bola desce pela linha, pousa em 1891, desce de data em data (arco de 18px para o lado) e, depois de 2020, segue descendo pela própria linha.
- **Reduced-motion:** não há pin nem doca; as datas já estão feitas e o traço do rali passa por trás da seção. No desktop, o trilho não corre: quebra em linhas (2,5rem entre linhas) e cada item carrega o seu próprio trecho de linha de base.

### O Placar
Lista de definição com linha de cal de 2px no topo e divisórias de 1px a 45%. Nome em caixa alta e peso 700, descrição em texto normal com o número em negrito e `tabular-nums`. A linha do Guga é invertida (fundo cal, texto saibro escuro) e sangra 1rem para os lados. As linhas não têm respiro lateral de propósito: são linhas de quadra que vão de borda a borda da coluna.

**Variante números (Le Score):** a mesma estrutura e o mesmo tamanho único (`scoreboard-row-number`), agora com o número no termo à esquerda: sem caixa alta, com algarismos tabulares e 0,02em de espaçamento. Os números contam até o valor quando a linha entra na tela (1,6s, `expo.out`, uma vez só, formato pt-BR com ponto de milhar). Anos começam em valor − 120, e medidas sem contagem (1–2 mm) ficam fixas. Com reduced-motion, a contagem fica desligada e o valor já está escrito no HTML.

### O Face-à-face
Guga × Nadal dos dois lados da rede, numa cena fixa conduzida pelo scroll (pin de 220%, `scrub`).
- **Sequência:** a rede desce (escala vertical 0 → 1); os dois entram de lados opostos (85% da própria largura, `power2.out`) em duotone de saibro, com os nomes-fantasma deslizando atrás; no encontro, as fotos ganham cor e a rede pulsa (escala horizontal até 2,6 e volta); o placar 3 | 14 aparece e conta; a frase-título fecha a cena.
- **Rede:** linha de cal de espessura `line`, que se interrompe atrás da frase-título (máscara com um vão de 4,75rem; 6,5rem no celular) em vez de riscá-la.
- **Nomes-fantasma:** `ghost-name`, cal a 0,13, `aria-hidden`. São ornamento: o contraste baixo é intencional.
- **Placar de cena (`face-count`):** rótulo em `label` sobre o número em `scene-count`, alinhados à rede (Guga à direita da sua metade, Nadal à esquerda).
- **Reduced-motion:** o HTML e o CSS já mostram o estado final (fotos e placar visíveis, números no valor).

### O Palmarès (cards de campeão)
Um card por campeão: o troféu fica à vista e a foto de quem o levantou vem por baixo de uma onda de saibro.
- **Mídia:** 4:5, canto vivo, recortada. O troféu fica de pé sobre o mesmo oval afundado das Marcas (76% da largura, perto da base), com sombra "Objeto erguido".
- **Revelação:** no hover (só em dispositivos com hover), no `:focus-visible` e no toque (`.is-open`, um card aberto por vez), uma onda de saibro escuro (máscara SVG ondulada, `mask-position` de 0 para 60%) sobe pelo card e traz a foto logo atrás (0,12s depois); a foto sai do duotone para a cor (0,5s, começando 0,35s depois) e o troféu recua (`translateY(-8%) scale(0.92)`). Curva `--rise`: 0,6s `cubic-bezier(0.16, 1, 0.3, 1)`. Na volta, a ordem se inverte.
- **Legenda:** linha de cal de 2px no topo; ano em `champion-year`, nome em caixa alta peso 700 (0,04em), taça em 0,9375rem.
- **Foco:** `outline` de 3px em cal na mídia, com 4px de afastamento.
- **Celular:** lista de uma coluna; o card que cruza a faixa central da tela (10% do meio) abre sozinho.
- **Reduced-motion:** sem transições; a revelação acontece de uma vez.

### Os Títulos Letra a Letra
Os h2 das seções do rali (exceto a linha de cena do Face-à-face) entram em quadra letra a letra quando chegam a 88% da tela: cada letra nasce espremida (`scaleX(0.15)`, 30% abaixo, transparente) e se estica a partir da base (0,9s, `expo.out`, 35ms entre letras), uma vez só. Acessibilidade conforme a Whole Word Rule. Com reduced-motion, os títulos não são divididos.

### O Marquee
Duas faixas de saibro escuro, uma logo depois do hero e outra antes do fechamento, com bordas de cal de 2px em cima e embaixo e a frase em francês correndo em `marquee` ("Terre battue · Paris · Depuis 1891 · …"). É ornamento (`aria-hidden`) e opaca: a bola passa por trás.
- **Movimento:** corre sozinha a 0,6px por quadro e ganha a velocidade do scroll (35% de cada pixel rolado, suavizado a 0,12 por quadro); rolar para cima inverte o sentido. As duas faixas correm em sentidos opostos. Duas cópias da frase lado a lado fazem a volta sem costura.
- **Respiro:** só vertical (`clamp(0.9rem, 2vw, 1.5rem)`); o texto corre de borda a borda da tela, sem margem lateral, de propósito.
- **Reduced-motion:** a faixa fica parada.

### A Raquete-cursor
O visitante é o jogador: com mouse, o cursor do sistema dá lugar a uma raquete desenhada em SVG (60×130px), aro e cordas em cal, cabo em saibro escuro com contorno de cal e grip riscado.
- **Precisão:** o centro das cordas (o *sweet spot*) fica exatamente no ponteiro; o clique cai onde a raquete aponta. A raquete nunca recebe o clique.
- **Mola:** o ângulo segue o movimento com uma mola (rigidez 0,08, amortecimento 0,78), em repouso a −35° (cabo para baixo e para a direita); o movimento horizontal inclina até 28°.
- **Swing:** no clique, um impulso de −26° no ângulo; a mola traz de volta.
- **Posição de espera:** sobre links, botões e elementos focáveis, a raquete fica de pé (−8°), encolhe para 90% e as cordas se enchem de cal a 0,25.
- **Sobre cal:** em superfícies de cal marcadas como escuras para a raquete (o ticket), aro, cordas e grip trocam para saibro escuro.
- **Rebatida:** quando as cordas passam a 26px da bola do rali, a bola dá um pulinho (70px, volta com `bounce.out`) e solta pó; no máximo uma vez a cada 700ms.
- **Quando existe:** só com `(hover: hover) and (pointer: fine)` e sem `prefers-reduced-motion`; em toque e em reduced-motion, fica o cursor do sistema.

### A Escavação (Sous la Terre)
Uma cena presa e opaca, logo depois de Terre Battue: o scroll desce pelas cinco camadas debaixo do saibro, uma por tela, até 80 cm.
- **Pouso:** o pin começa quando a marca do tijolo (`soil-mark`, o oval da Marca no tamanho da Marca) chega ao meio da tela. A bola desce reta até ela, a marca nasce (ver "O Quique") e solta pó; a bola fica na marca e sobe com a superfície.
- **Camadas:** cinco fotos em tela cheia (tijolo moído, calcário, clínquer, cascalho, pedras e dreno), sem duotone, sem respiro lateral (as texturas sangram até a borda, de propósito). A pilha sobe uma tela por camada; cada textura é 24% mais alta que a tela e corre um pouco mais devagar que a sua camada (até ±9%), um parallax dentro de cada tela. Sobre a foto, o véu de saibro escuro do lado do texto.
- **Texto da camada:** título em `layer-title`, a espessura real em número de marca e uma frase curta, em cal sobre o véu.
- **Medidor:** a profundidade real na borda direita, numa régua de cal (fio de 2px a 0,85 com tiques de 2px a cada 41px, e um contorno de 2px do véu a 0,55 para continuar à vista sobre o calcário). O numeral em `depth-gauge` fica numa etiqueta do véu a 0,82, canto vivo. Cada camada recebe o mesmo tanto de scroll, e o medidor converte o progresso em centímetros reais: nas fronteiras entre as telas, mostra exatamente onde uma camada termina, e entre elas cresce em linha reta. Assim o tijolo (2 mm) tem a mesma presença que as pedras (35 cm), e o número continua verdadeiro. Abaixo de 1 cm, mostra milímetros.
- **O corte:** no fundo, a câmera se afasta (a pilha encolhe 35% e some, o corte chega de 125% e assenta no tamanho real) e mostra as cinco camadas inteiras numa fatia em escala real (`soil-cut-slab`): o tijolo é um fio sólido em `brick-band`, as outras quatro usam as fotos das camadas, e a sombra "Fatia no chão fundo". A mini marca (2,4rem) fica no topo da fatia. Nomes à esquerda, régua de 0 a 80 cm à direita, legenda abaixo.
- **Saída:** a bola reaparece na marca do topo do corte, salta para fora dele, à direita da régua (arco de 70px), e cai; o rali segue abaixo da cena.
- **Celular:** o texto de cada camada vai para o pé da tela, com o véu subindo do pé; o medidor fica no alto à direita, só o numeral (1,75rem).
- **Reduced-motion:** sem pin e sem doca. As camadas viram uma pilha que se lê rolando (cada uma com `max(70svh, 30rem)`, a primeira com `max(100svh, 38rem)` porque leva o título), as marcas já estão feitas, o medidor some e o corte vem no fim, estático. O traço do rali passa por trás da cena.

### O Coração do Guga
Um único traço (`groove`, 9px, ponta e junção redondas) desenhado com o scroll, como a ponta da raquete riscando o saibro. Legenda em label.

## Do's and Don'ts

### Do:
- **Do** manter o saibro (`clay`) como fundo contínuo de todas as seções; escurecer para `clay-deep` só no rodapé e nas faixas do marquee.
- **Do** estruturar seções com linhas de quadra em cal, de espessura `line` (`clamp(6px, 0.7vw, 10px)`), e fechar cada capítulo numa linha de base.
- **Do** reservar em toda seção nova uma faixa vazia para a bola (`[data-lane]`) e separar seções com respiros (`[data-respiro]`); o texto nunca ocupa a faixa.
- **Do** dar fundo opaco a todo bloco que fica por cima do rali, para a bola passar por trás.
- **Do** abrir as quatro seções principais com uma Marca numerada; nas demais, usar o oval sem número como medida, quique ou chão.
- **Do** usar o Anybody condensado (62%) nos títulos e expandido (125–150%) em números, marquee e wordmark.
- **Do** usar a curva `cubic-bezier(0.16, 1, 0.3, 1)` em 220ms para estados e em 0,6s (`--rise`) para revelações, o Quique (tranco `power3.out` + `elastic.out(1, 0.45)` e afundar em 2,4s) para toda marca que a bola faz, `expo.out` para letras que entram e pó, e easing linear (`scrub`) para parallax e cenas presas.
- **Do** tratar toda cena presa que recebe a bola como doca do rali: ela dá a entrada e a saída, o rali desenha esses trechos por cima dela e entrega a bola, para nunca haver duas bolas à vista.
- **Do** manter toda marca feita: ela nasce no quique e não se desfaz no scroll para cima.
- **Do** tingir fotos de pessoas com o duotone de saibro e liberar a cor só num gesto (encontro, revelação).
- **Do** entregar, com `prefers-reduced-motion`, o estado final completo: traço desenhado, marcas visíveis, quadro estático do saque, linha do tempo quebrada em linhas, Sous la Terre como pilha de camadas com o corte no fim (sem pin nem doca; o traço passa por trás), números no valor final, Face-à-face no estado final, marquee parado e cursor do sistema.

### Don't:
- **Don't** colocar conteúdo em cartões, caixas arredondadas ou fundos claros; fora das fotos e das camadas de Sous la Terre, o único creme sólido é o ticket e a linha do Guga.
- **Don't** usar o véu de saibro escuro, as fotos das camadas ou a faixa de tijolo fora de Sous la Terre.
- **Don't** usar o amarelo da bola em qualquer outro elemento, nem na raquete-cursor; e nunca mostrar duas bolas em jogo ao mesmo tempo.
- **Don't** deixar o traço do rali cruzar títulos ou parágrafos; ele corre pelas faixas da bola e pelos respiros.
- **Don't** usar sombras pretas, neutras ou em bloco; toda sombra é saibro na sombra.
- **Don't** reutilizar os tamanhos de cena (nome-fantasma, contagem de cena, marquee, ano do campeão, linha de cena) fora das suas cenas.
- **Don't** usar neon, modo escuro, o logo oficial ou a linguagem visual do site oficial de Roland-Garros.
- **Don't** escrever texto corrido sobre o saibro em cor diferente da cal: o contraste do saibro com a cal é 4,63:1, sem folga para tons mais escuros. Cal translúcida só em ornamento `aria-hidden` (os nomes-fantasma).
