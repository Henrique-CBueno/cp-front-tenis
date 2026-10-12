# Prompt 40 · a tela de carregamento

**Data:** 2026-10-12 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi
> hoje o site ficaa um pouco travado no inicio ate carregar as coisas, estava pensando em fazer em uma nova branch uma "animacao de carregamento" que roda e a pagina carrega em segundo plano para nao ter esse travamento

## O que a IA fez
- **Branch nova:** `feat/carregamento`.
- **Diagnóstico:** o preload disparava os 90 quadros do saque de uma vez (download e decode), junto com as fontes e o estádio, com o scroll já liberado.
- **Carregamento em duas levas** (`src/serve-sequence.js`, com testes primeiro): os quadros-chave antes, com o progresso avisado; o resto depois, 4 de cada vez.
- **Tela de carregamento** (decisão 017, ticket 27):
  - inline no `index.html`, para aparecer antes do JS;
  - a linha de base pintada em giz como barra de progresso, a bola quicando na ponta (CSS puro) e a marca no saibro;
  - `src/loader.js` conduz a linha e o contador, e depois sobe a tela;
  - o scroll fica travado (`html.is-loading` + `lenis.stop()`) até o essencial chegar; mínimo de 0,9 s e teto de 8 s.
- **Erro encontrado ao medir e corrigido:** a tela ficava parada até o teto de 8 s (correção #36).
- **Testes:**
  - 4 testes de unidade novos ou reescritos no preload (28 no total);
  - 3 E2E novos da tela, e os 62 antigos passam a esperar a tela sair (fixture);
  - 65 E2E verdes.

## Minha avaliação
<!-- Preencher -->
