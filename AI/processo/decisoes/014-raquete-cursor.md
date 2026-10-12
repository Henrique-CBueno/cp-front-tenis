# 014 · Onde fica a mola da raquete-cursor

**Status:** decidida pela IA no ticket 20 (pendente de revisão minha) · **Data:** 2026-10-10

- **Contexto:** a spec pedia que a raquete "segue o mouse com mola", e o ticket pedia que o clique caísse exatamente onde a raquete aponta. As duas coisas brigam: se a posição tem atraso, durante o movimento a raquete aponta para um lugar e o clique cai em outro.
- **Opções:**
  - (a) mola na posição, aceitando o desvio;
  - (b) mola na posição mais um ponto exato no ponteiro;
  - (c) posição exata e mola no ângulo.
- **Escolha:** (c).
  - O sweet spot (o centro das cordas) é o ponteiro, sem atraso, então os links são clicáveis exatamente onde a raquete aponta.
  - O "atraso elástico" ficou no cabo: o movimento inclina a raquete e ela volta balançando.
  - O swing do clique usa a mesma mola, com um impulso no ângulo.
- **Porquê:** com a raquete também sobre os links (escolha minha na Q21), a precisão do clique pesa mais que o atraso. Um segundo ponto, como na opção (b), seria um cursor a mais na tela, e a regra "One Ball" já pede economia.
- **Também:**
  - a raquete troca para saibro escuro sobre superfícies de giz (o ingresso);
  - a rebatida é um deslocamento que volta a zero, então a bola nunca sai do traço.
