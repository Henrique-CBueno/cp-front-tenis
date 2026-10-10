# 003 · Estratégia de testes

**Status:** decidida (grilling Q14) · **Data:** 2026-10-10

## Contexto
A skill `implement` usa TDD. Numa página visual de parallax, testar CSS ou animação automaticamente custa caro e pega pouco erro.

## Opções
- **(a)** Vitest só na lógica pura, com o visual verificado por screenshot no navegador
- **(b)** (a) + smoke test com Playwright
- **(c)** Sem testes automatizados

## Escolha
**(b).** A IA recomendou (a); **eu escolhi (b)**, para ter também uma garantia de ponta a ponta de que a página funciona.

- **Vitest (unitário):** progresso do scroll → índice do frame; preload e fallback de frames; escolha do conjunto por dispositivo; `prefers-reduced-motion`.
- **Playwright (smoke):** a página carrega sem erro no console, o canvas do hero desenha, o CTA aponta para o link oficial.
- **Visual:** screenshots desktop e mobile no fluxo da impeccable (critique/audit). Sem regressão visual automatizada.
