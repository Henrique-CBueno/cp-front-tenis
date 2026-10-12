# 011 · O trajeto em S da bola (rodada 2)

**Status:** decidida (grilling Q1, Q7, Q13, Q20) e implementada no ticket 14 · **Data:** 2026-10-10

## O problema
A revisão final da rodada 1 mandou a bola para a **borda** da página, para não riscar o texto. Eu queria a bola **pelo meio**,
"natural e suave", nunca reta e nunca pela borda.

## A solução
- **O layout reserva espaço para a bola:**
  - cada seção tem um **espaço reservado** (`data-lane`), uma coluna vazia onde fica a marca da seção;
  - entre as seções há **respiros** (`data-respiro`), faixas de saibro sem conteúdo onde a bola cruza a página e quica.
- **A curva:** o módulo puro `src/rally-path.js` descreve o caminho como **x = f(y)** com interpolação cúbica monótona (Fritsch–Carlson). Isso garante três coisas:
  - a curva passa exatamente por cada ponto (marca, saída da faixa, quiques);
  - ela **nunca passa além dos pontos vizinhos**, então não invade o espaço do texto;
  - como y só cresce, a ponta pode seguir o scroll. O SVG desenhado coincide com a posição da bola (Bézier equivalente).
- **Inércia:** a ponta persegue o meio da tela com amortecimento (16% por quadro), deslizando em vez de grudar no scroll.
- **Posição das faixas (desktop):**
  - Terre Battue: entre o texto e a foto;
  - Les Légendes: à esquerda;
  - Le Score: à direita;
  - o fechamento termina no ingresso.

  As faixas alternam de lado, então a bola desenha um S pela página.
- **Celular:** as faixas são estreitas (4,25rem) e também alternam; o número da marca fica de pé, encostado na lateral da faixa.
  No fechamento existe uma faixa só do celular, para a bola descer ao lado do texto e entrar no ingresso por cima.
- **Camadas da quadra e Histoire:** a bola passa por trás (são opacas). A bola visível na Histoire é o ticket 16.

## Como isso é garantido
- **Vitest:** a curva passa pelos pontos, não "estoura" entre eles, o SVG coincide com a bola e o resultado é estável.
- **Playwright:** um teste amostra o traço inteiro e procura pontos dentro de qualquer título ou parágrafo, no desktop e no celular.
  Ele **achou 3 problemas reais** na primeira execução: o rótulo vertical da marca, o fechamento no celular, e o ingresso (que é o destino e foi excluído do teste).
