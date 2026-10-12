# Prompt 02 · impeccable init (PRODUCT.md)

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5) · **Skill:** impeccable `init`

## O que eu pedi
Respondi **"1"** à lista de próximos passos. Era ambíguo: podia ser o primeiro item da lista "o que você precisa fazer"
(assistir aos vídeos) ou o primeiro comando da sequência. A IA **perguntou antes de agir** e eu escolhi "Rodar /impeccable init".

## O que a IA fez
1. A skill `impeccable` não estava registrada no Claude Code (`Unknown skill`). Então a IA leu o `SKILL.md` e o `reference/init.md` em `.agents/skills/impeccable/` e seguiu o fluxo manualmente.
2. Rodou `impeccable context`, que confirmou que não havia PRODUCT.md nem DESIGN.md (projeto greenfield).
3. Fez 3 perguntas sobre os fatos que o grilling não cobria:

| Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|
| Visitante principal | Fã brasileiro de tênis | Aceita |
| Enquadramento | Tributo de fã, não oficial | Aceita |
| Edição promovida | 2027, a próxima | **Atemporal**: escolhi outra opção |

4. Escreveu o `PRODUCT.md` na raiz: usuários, propósito, posicionamento, restrições, compromissos de marca, princípios, acessibilidade.
5. **Não** escreveu cores nem tipografia: a skill proíbe isso no `init`, porque essas definições ficam para o `shape` / `DESIGN.md`.
6. Sem ferramenta de geração de imagem nesta sessão, o fluxo de construção é **code-first** (nada foi gravado em config). O live mode ficou para depois, porque ainda não há projeto rodando.

## Minha avaliação
<!-- Preencher -->

-
