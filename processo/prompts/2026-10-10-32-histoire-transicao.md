# Prompt 32 · Histoire: a chegada e a saída sem transição natural

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi (literal)
> a bola comecou a ir para linha do tempo mito tarde, ela nao faz uma transicao natural, nem para chegar, nem para sair

## O que a IA fez
- **O diagnóstico:**
  - o traço da página só anda com o scroll para baixo. Para chegar a 1891 (à esquerda, embaixo do título), a bola descia reta ao lado da frase e, no último instante, cruzava ~500 px para o lado em ~60 px de scroll, como um salto lateral;
  - na saída, ela corria pela linha e virava para baixo em ângulo reto.
- **A solução foi usar o tempo em que a Histoire fica presa:**
  - **chegada:** a seção prende quando a bola ainda está à direita da frase, um pouco acima da linha. No primeiro trecho do scroll, a bola **plana** até 1891: continua descendo na direção em que vinha, deita sobre a linha e pousa. O voo vira rastro e corre com a linha;
  - **saída:** depois da espera em 2020, a bola **salta em arco** para cima e para a direita, sobre o trecho de linha a mais, e só desce quando a seção solta. O arco também fica como rastro;
  - o ritmo dos voos é suave (acelera e desacelera) e conduzido pelo scroll;
  - a parte vertical da chegada some nos primeiros passos do scroll lateral, para não cruzar o título quando corre para a esquerda. O voo e os arcos ficam.
- **No celular:** não há pin. O vão entre a frase e a linha cresceu, para a curva até 1891 ter espaço e virar um S suave, em vez de um risco quase horizontal.
- **Testes:**
  - "uma bola só" agora confere também o meio do voo e o meio do salto;
  - "o traço não cruza texto" agora confere também o voo e o salto;
  - total: 50 E2E e 20 unitários.
- **Fluidez:** no trecho da Histoire, 60 fps a 4x de CPU.
- Evidências: `processo/evidencias/23/desktop-sequencia.png` (chegando, início do pin, planando, pousou, pulos, em 2020, saltando, fim do pin, descendo) e `mobile-sequencia.png`.

## Minha avaliação
<!-- Preencher -->

-
