# Prompt 28 · Grilling da rodada 3 → glossário, spec e tickets

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5) · **Skill:** `/grill-with-docs` (grilling + domain-modeling, em plan mode)

## O que eu pedi (literal)
Ver `../03-grilling-rodada-3.md`: a bola sumindo na Histoire, as marcas sem cara de pingo e as camadas da quadra feias.

## O que a IA fez
- **Antes de perguntar, levantou no código a causa de cada queixa:**
  - na Histoire havia uma segunda bola, parada na 1ª data;
  - a marca crescia 40 px antes da bola chegar;
  - as camadas eram faixas finas fora de escala.
- **Fez 4 rodadas de perguntas (Q1–Q15).** Mudei duas recomendações: o pingo ganha também o afundar (Q2) e as camadas viram uma **escavação pelo scroll** (Q3), no lugar do "testemunho".
- **Pela skill `domain-modeling`:**
  - fixou o vocabulário: "pingo" = **quique** (o toque) e **marca** = o que fica;
  - criou o glossário `CONTEXT.md` na raiz, como o CLAUDE.md pede.
- **Escreveu a spec da rodada 3** (`../spec-rodada-3.md`) e os **tickets 22–25**.
