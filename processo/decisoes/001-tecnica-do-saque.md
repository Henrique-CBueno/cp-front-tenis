# 001 · Técnica da animação do saque

**Status:** decidida (grilling Q3) · **Data:** 2026-10-10

## Contexto
O herói da página é um jogador lançando a bolinha e sacando, com imagens reais, e a animação conduzida pelo scroll.

## Opções
- **(a) Frame sequence:** de 60 a 150 frames de um vídeo desenhados num `<canvas>` conforme o scroll. Movimento fluido e realista.
- **(b) Camadas recortadas:** PNGs transparentes em velocidades diferentes, com o jogador trocando entre 2 ou 3 poses. Dá profundidade, mas o movimento fica "picotado".
- **(c) Híbrido:** camadas de fundo (estádio, quadra) em parallax e a frame sequence do jogador recortado por cima.

## Escolha
**(c) Híbrido.** As camadas dão profundidade e os frames dão fluidez. **Fallback:** só (a), se faltar tempo.

## Consequências
- O jogador precisa ser recortado frame a frame (WebP com alpha). Por isso o vídeo com fundo preto passou a ser o favorito.
- O peso das imagens importa: conjunto reduzido no mobile (ver 003 e Q6).
