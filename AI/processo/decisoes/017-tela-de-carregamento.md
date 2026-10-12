# 017 · A tela de carregamento

**Status:** pedida por mim, desenho proposto pela IA · **Data:** 2026-10-12

- **Contexto:** o site ficava travado no começo, até carregar. A causa: o preload pedia e decodificava os 90 quadros do saque (3,6 MB) de uma vez, junto com as fontes e a foto do estádio, enquanto o scroll já estava liberado. O saque "pulava" quadros.
- **Opções:**
  - (a) só otimizar o carregamento, sem tela nenhuma;
  - (b) uma tela genérica (spinner);
  - (c) uma tela no estilo da página, com progresso real, que segura o scroll até o essencial chegar.
- **Escolha: (c), junto com a otimização de (a).**
  - **O que é "essencial":** fontes, arquibancada e os quadros-chave do saque (1 a cada 8). Com eles, o saque já existe grosseiramente; o resto chega por trás, 4 de cada vez.
  - **Desenho:** a linha de base é pintada em giz (é a barra de progresso) e a bola quica na ponta, deixando a marca no saibro. É a tese da página ("a página é a quadra") antes mesmo da página.
  - **O quique é CSS puro:** roda no compositor e continua liso mesmo com a thread principal ocupada.
  - **O HTML e o CSS da tela ficam inline no `index.html`:** ela aparece antes do bundle JS chegar.
  - **Limites:** mínimo de 0,9 s (não pisca numa rede rápida) e máximo de 8 s (numa rede ruim, a página abre assim mesmo, e um quadro que falta é coberto pelo vizinho). Sem JS, a tela não aparece (`<noscript>`).
- **Por quê:** some o travamento, e a espera vira parte do tributo, e não um tempo morto.

## Revisão (2026-10-12, prompt 41)
- **O que eu disse:** a animação não estava bonita; eu queria o logo de RG; e, quando o scroll aparecia, o site "pulava para o lado".
- **Novo desenho:**
  - o **logo de Roland-Garros** grande no centro, que se enche de giz de baixo para cima (o logo passa a ser a barra de progresso);
  - embaixo, a linha de base com a bola quicando e a sombra dela no saibro, e "la trace" com a %;
  - o fundo ganha o grão do saibro, como no hero;
  - "la trace" e a % só aparecem com a fonte certa carregada (sem troca de fonte à vista).
- **Nova saída:** em vez de a tela subir, o **logo voa até o lugar dele no topo** e pousa sobre o logo da barra, enquanto o saibro da tela se desfaz por cima da página. A página nasce da tela de carregamento.
- **A pulada:** `scrollbar-gutter: stable` no `html` (ver correção #37).

## Revisão (2026-10-12, prompt 42): o tempo mínimo vira curva
- **O que eu pedi:** um tempo mínimo para a animação ficar fluida.
- **Antes:** o mínimo (0,9 s) só segurava a tela. O logo enchia aos saltos, seguindo a rede: numa conexão rápida, ia de 0 a 100% quase de uma vez.
- **Agora:**
  - o progresso exibido é o **menor** entre o real e uma curva de tempo (`power2.inOut` em 2,4 s);
  - numa rede rápida, o logo enche num gesto contínuo de 2,4 s; numa rede lenta, acompanha o que chegou;
  - a velocidade é limitada (no máximo ~1,4% por quadro), então, quando muita coisa chega de uma vez, o logo não salta.
- **Medido:**
  - rede rápida: 100% aos 2,5 s e o site liberado aos 3,9 s (com o voo do logo);
  - quadros atrasados 4 s: 100% aos 5,6 s;
  - nos dois casos, o maior salto do contador foi de 2% por quadro (antes, até 12%).
- **Custo:** numa rede rápida, a página abre ~1,5 s mais tarde do que antes. É o preço do gesto inteiro.
