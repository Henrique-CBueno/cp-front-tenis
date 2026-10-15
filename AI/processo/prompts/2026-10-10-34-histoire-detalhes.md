# Prompt 34 · Histoire: o traço passando do quique, marcas fora do centro e a saída

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi (literal)
> boa! melhorou muito, mas a linha esta passando no primeiro quique e as marcas nao estao ao centro da linha, e na hora da bola sair, ela saindo pela esquerda do texto ta meio estranho

## O que a IA fez
- **Marcas fora do centro:** o CSS já centrava a data na linha com `translateY(-50%)`, e o GSAP somava outro -50% por cima. A marca subia 8 px. Agora o deslocamento é aplicado uma vez só.
- **O traço passando do primeiro quique:** o ponto onde o traço da chegada para era procurado numa tabela com um ponto a cada ~25 px de caminho, então ele passava da bola e atravessava a linha. Agora o ponto exato é calculado por bisseção, e o traço termina na bola.
- **A saída:** em vez de descer pela esquerda do texto de 2020, a bola segue na direção dos pulos. Ainda com a seção presa, dá **um último pulo para a direita**, até a ponta da linha (o trecho a mais depois de 2020). Quando a seção solta, ela cai reto da ponta da linha, à direita do texto.
- **Testes:**
  - 1 E2E novo: a marca no centro da linha (menos de 1,5 px) e o traço da chegada terminando na bola. Com o código anterior ele falha (8,4 px fora);
  - o teste de "uma bola só" agora confere também o último pulo;
  - total: 51 E2E e 20 unitários.
- Evidências: `processo/evidencias/23/detalhe-pouso-e-saida.png` (o pouso em 1891, a espera em 2020, o último pulo e a queda da ponta da linha), além das sequências.
