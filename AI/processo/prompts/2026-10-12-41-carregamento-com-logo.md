# Prompt 41 · a tela de carregamento com o logo, e sem a pulada

**Data:** 2026-10-12 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi
> a animacao nao esta bonita! gostaria que tivesse a logo de rg tbm, e depois de carregar aparece o scroll e o site da uma "pulada para o lado"

## O que a IA fez
- **Diagnóstico da pulada:** o `overflow: hidden` escondia a barra de rolagem, e a volta dela tirava ~15 px de largura da página.
- **Correção da pulada:** `scrollbar-gutter: stable`. Medida com barras de verdade: o título e o botão do topo não se mexem.
- **Novo desenho** (revisão da decisão 017):
  - o logo de Roland-Garros no centro, que se enche de giz conforme carrega;
  - a linha de base com a bola quicando e a sombra dela;
  - "la trace" e a %, que só aparecem com a fonte certa;
  - o grão do saibro no fundo.
- **Nova saída:** o logo voa e pousa sobre o logo do topo, enquanto o saibro da tela se desfaz.
- **Erros no caminho** (correção #37): sobra do HTML antigo (pega pelo E2E) e um teste do Palmarès que assumia a largura de 1440.
- **Testes:** 28 de unidade verdes. Nos E2E, 64 de 65; a falha é a instabilidade da raquete, que **também falha no `main`** e passa 10 de 10 sozinha.
