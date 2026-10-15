# Prompt 33 · Histoire: a bola desce pela esquerda até 1891

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi (literal)
> piorou

## O que a IA fez
- **Parou de tentar e perguntou** (era a terceira tentativa), com um esboço de cada opção:
  - (A) a bola vem pela esquerda cedo, com o título passando para a direita;
  - (B) a bola fica no meio e a linha corre por baixo dela;
  - (C) voltar ao da rodada 2.
- **Minhas respostas:** **(A)** e **tirar os arcos** dos pulos.
- **O que mudou:**
  - o título "Histoire" e a frase foram para a **direita**, e a coluna da esquerda ficou livre;
  - ainda no respiro de cima, a bola já vai para a esquerda e desce **reto** até 1891, pousando no instante em que a seção prende;
  - ela espera, pula de data em data enquanto a linha corre (sem arcos) e espera em 2020;
  - **saída:** no desktop, ela desce **reto** pelo vão entre o texto de 2019 e a data 2020; no celular, segue descendo pela própria linha;
  - saíram o voo planado, o salto em arco e os arcos entre as datas;
  - o rastro da chegada continua preso à linha e vai embora para a esquerda junto com ela;
  - ficaram as datas que viram marcas no toque e as esperas em 1891 e 2020.
- **Bug achado nos screenshots:** com o título à direita, ele sumia da tela. A coluna da seção esticava até a largura da linha do tempo (~3000 px). A coluna agora fica na largura da tela.
- **Testes:**
  - os da Histoire foram ajustados às novas fases: uma bola só, parada em 1891 e em 2020, e o traço sem cruzar texto na entrada e na saída;
  - total: 50 E2E e 20 unitários.
- **Fluidez:** no trecho da Histoire, 60 fps a 4x de CPU.
- Evidências: `processo/evidencias/23/desktop-sequencia.png` e `mobile-sequencia.png`.
