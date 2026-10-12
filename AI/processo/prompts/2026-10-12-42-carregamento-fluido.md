# Prompt 42 · a tela de carregamento com tempo mínimo fluido

**Data:** 2026-10-12 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi
> faca a animacao com um tempo minimo para ficar fluido

## O que a IA fez
- **Diagnóstico:** o mínimo de 0,9 s só segurava a tela; o logo enchia aos saltos, seguindo a chegada dos arquivos.
- **Mudança** (`src/loader.js`, revisão da decisão 017):
  - o progresso exibido segue o menor entre o real e uma curva de tempo de 2,4 s (`power2.inOut`);
  - a velocidade do enchimento é limitada, para não saltar quando muita coisa chega junto.
- **Medido no navegador:** em rede rápida e em rede lenta simulada, o maior salto do contador caiu de 12% para 2% por quadro. O site é liberado aos ~3,9 s numa rede rápida.
- **Testes:** 28 de unidade e 65 de 65 E2E verdes.

## Minha avaliação
<!-- Preencher -->
