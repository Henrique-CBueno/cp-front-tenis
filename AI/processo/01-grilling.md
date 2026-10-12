# 01 · Grilling: a entrevista inicial com a IA

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5), skill `/grill-me` (que chama a skill `grilling`), em plan mode
**Meu prompt inicial (literal):**

> quero fazer um projeto de front-end com parallax e animacoes impressionantes para o torneio de tenis, roland garros, quero um parallax de um jogador lancando uma bolinha de tenis e sacando, quero imagens reais, etc, me ajude a pensar em todo o escopo do projeto antes

**Como funciona:** a IA monta uma "árvore de decisões" e faz as perguntas em rodadas. Cada pergunta traz uma
recomendação (➡️). Eu respondia colando a rodada de volta: quando mantinha a recomendação, eu a aceitava;
quando escrevia outra coisa, aquilo era a minha decisão.

---

## Rodada 1: decisões que destravam o resto

| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q1 | Regras do checkpoint (stack, critérios, prazo, grupo) | Colar o enunciado | **Colei o enunciado** (ver `00-briefing.md`) |
| Q2 | Tipo de site: (a) landing narrativa, (b) institucional multipágina, (c) híbrido | (a): uma página só, polida, maximiza o impacto | Aceita |
| Q3 | Técnica do saque: (a) frame sequence no canvas, (b) camadas recortadas, (c) híbrido | (c): profundidade das camadas + fluidez dos frames | Aceita |
| Q4 | Origem das imagens "reais": (a) filmar, (b) bancos grátis, (c) oficiais com crédito, (d) IA | (b) com (a) de plano B, por causa dos direitos autorais das fotos oficiais | Aceita |
| Q5 | Idioma e conteúdo | PT-BR com títulos em francês; conteúdo real e enxuto | Aceita |
| Q6 | Dispositivos | Desktop completo; mobile mais leve; `prefers-reduced-motion` | Aceita |

**Ponto de virada:** o enunciado mostrou que **o processo vale tanto quanto a página**. A documentação deixou de
ser anexo e virou um ramo próprio da árvore (ver `correcoes-de-rota.md`).

Entre as rodadas, a IA disparou uma pesquisa de assets gratuitos em background (resultado em `pesquisa/assets.md`).

---

## Rodada 2: stack, processo, narrativa, IDV

**Minha resposta, fora das perguntas (literal):**

> Vamos fazer o front junto a skill do impecabble, e o fluxo de dev vai ser grill-me ou grill-me-docs -> to-spec -> to-tickets -> implement

| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q7 | Stack: (a) Vite + JS + GSAP + Lenis, (b) React/Next + Framer, (c) sem build via CDN | (a): o GSAP ScrollTrigger é o padrão para scrub e pin; React não acrescenta nada numa página só | Aceita |
| Q8 | Como registrar o processo (estrutura `processo/`, quem escreve o log) | A IA mantém o log a cada etapa; eu adiciono "Minha avaliação" | Aceita |
| Q9 | Roteiro de seções | Le Service → Terre Battue → Histoire → Les Légendes (Guga em destaque) → Números → CTA | Aceita |
| Q10 | IDV: (a) editorial oficial, (b) cinematográfico escuro, (c) affiche/pôster | (a) como base com toques de (c) (grão, textura de saibro) | Aceita |
| Q11 | CTA: (a) ingresso, (b) onde assistir, (c) newsletter | (a): link para o site oficial, sem backend | Aceita |
| Q12 | Prazo, individual ou grupo, entrega | (sem recomendação) | **"Individual, prazo de 2 diaas"** |

---

## Rodada 3: consequências do fluxo escolhido

A IA leu as skills `to-spec`, `to-tickets`, `implement` e `impeccable` e checou o ambiente (node 22, ffmpeg,
python3 e gh instalados; rembg ausente; repo sem remote) antes de perguntar.

| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q13 | Onde ficam a spec e os tickets: (a) markdown local em `processo/`, (b) GitHub Issues | (a): o professor quer tudo na pasta | Aceita |
| Q14 | Testes: (a) Vitest na lógica pura, (b) (a) + smoke test Playwright, (c) nenhum | (a) | **"(B)"**: escolhi incluir também o smoke test com Playwright |
| Q15 | Onde a impeccable entra | `init` → `shape` antes do `to-spec`; `critique/audit/polish` no fim | Aceita |
| Q16 | Corte de escopo para 2 dias | MVP: Hero, Terre Battue, Légendes, CTA, docs. Extras: Histoire, Números, polish mobile | Aceita |
| Q17 | Pipeline do saque (quem escolhe o vídeo; instalar rembg) | Eu assisto e escolho; a IA compara luma-key do ffmpeg × rembg (venv) | Aceita |
| Q18 | Registrar esta conversa | Sim, em `processo/01-grilling.md`, com as decisões consolidadas | Aceita |

---

## Pontos assumidos pela IA sem perguntar (para eu revisar)

- Deploy na **Vercel**.
- **Sem o logo oficial** de Roland Garros: um nome escrito com tipografia própria, para evitar problema de marca registrada.
- **Créditos e atribuições no rodapé**, obrigatórios pela licença CC BY-SA das fotos do Wikimedia.

---

## Decisões consolidadas

| # | Tema | Decisão |
|---|------|---------|
| Q2 | Formato | Landing page de uma página só, com scroll narrativo. Modo impeccable: **Persuade** |
| Q3 | Saque | Camadas de fundo em parallax + sequência de frames do jogador em `<canvas>`. Fallback: só os frames |
| Q4 | Imagens | Bancos gratuitos (Pexels/Mixkit/Unsplash/Wikimedia). Plano B: filmar um saque próprio |
| Q5 | Idioma | PT-BR com títulos em francês. Conteúdo real e enxuto |
| Q6 | Devices | Desktop completo; mobile com menos frames e resolução menor; `prefers-reduced-motion` |
| Q7 | Stack | Vite + JS puro + GSAP ScrollTrigger + Lenis |
| Q8 | Processo | Pasta `processo/`. A IA mantém o log; eu escrevo "Minha avaliação" |
| Q9 | Seções | Le Service → Terre Battue → Histoire → Les Légendes (Guga) → Números → CTA |
| Q10 | IDV | Editorial oficial (saibro ≈ #BB5522, verde, azul-marinho, creme/bege) + grão e textura das affiches |
| Q11 | CTA | "Garanta seu ingresso", com link para o site oficial |
| Q12 | Logística | Individual, 2 dias |
| Q13 | Tracker | Markdown local: `processo/spec.md`, `processo/tickets/NN-*.md` |
| Q14 | Testes | Vitest para a lógica pura + smoke test Playwright |
| Q15 | impeccable | `init` e `shape` antes do `to-spec`. PRODUCT.md e DESIGN.md na raiz |
| Q16 | MVP | Hero, Terre Battue, Légendes, CTA, docs. Extras: Histoire, Números, polish mobile. O hero é o ticket 1 |
| Q17 | Pipeline | Eu escolho o vídeo; ffmpeg para os frames (~90/~45); luma-key × rembg; WebP com alpha |

## Fluxo de desenvolvimento

```
grill-me (feito) → impeccable init (PRODUCT.md) → impeccable shape (DESIGN.md)
  → /setup-matt-pocock-skills (tracker = markdown local em processo/)
  → to-spec → to-tickets → implement (impeccable em cada ticket de UI; tdd nos seams; code-review)
  → impeccable critique/audit/polish
```
