# 03 · Grilling da rodada 3: a bola na Histoire, o quique e as camadas

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5), `/grill-with-docs` → skills `grilling` e `domain-modeling`, em plan mode
**Meu pedido (literal):**

> 1. No Historie a bola some e comeca a pular depois no scroll lateral, gostaria que ela fosse com rastro ate o primeiro ponto, ficasse la e depois do ultimo, saisse e seguisse pela pagina
> 2. As marcas parece que ela so aparece na frente da bola e nao da a impressao de pingo
> 3. A parte dos materiais das quadras esta muito feio, vamos pensar em algo diferente

**O que a IA levantou no código antes de perguntar:**
- Na Histoire, a bola do rali passa **por trás** da seção opaca. Uma segunda bola, só da linha do tempo, aparece parada na 1ª data e só começa a pular quando o scroll lateral começa. O traço é interrompido antes da seção.
- A marca de cada quique começa a crescer **~40 px antes** de a bola chegar e leva ~110 px para completar. É um crescimento, não um impacto: por isso "aparece na frente da bola".
- As camadas são 5 faixas finas com foto Pexels, véu de cor e rótulo, fora de escala. Na rodada 1 eu já tinha recusado camadas sem material real (correção #19).

---

## Rodada 1
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q1 | Histoire: (a) uma bola só, contínua; (b) igual, com traço também entre as datas; (c) só ajustar a atual | (a) | Aceita |
| Q2 | O pingo: (a) impacto no contato; (b) impacto + a marca afunda depois; (c) só sincronizar | (a) | **(b) Impacto + afundar** |
| Q3 | Camadas: (a) testemunho (cilindro de amostra puxado do chão); (b) escavação pelo scroll; (c) corte desenhado em giz | (a) | **(b) Escavação pelo scroll** |
| Q4 | Processo: (a) spec curta + 3 tickets; (b) fluxo completo; (c) direto | (a) | **(b) Fluxo completo** |

## Rodada 2
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q5 | A marca fica depois do pingo? Vale para as Marcas 01–04? | Fica, e vale para todas | Aceita |
| Q6 | Onde fica a escavação: cena própria depois de Terre Battue, ou dentro dela | Cena própria | Aceita |
| Q7 | A bola durante a escavação: fica na superfície / afunda junto / vira o medidor | Fica na superfície | Aceita |
| Q8 | Ritmo: tempo igual por camada (medidor na profundidade real) / escala real | Tempo igual | Aceita |

## Rodada 3
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q9 | Histoire no celular (sem pin): mesma regra do desktop / traço contínuo | Mesma regra | Aceita |
| Q10 | O que aparece em cada camada: nome + espessura + função (com fonte) / só nome + espessura | Nome + espessura + função | Aceita |
| Q11 | Passagem entre camadas: descida contínua / corte seco / cortina | Descida contínua | Aceita |
| Q12 | O fim da escavação: afasta e mostra o corte inteiro em escala real / termina no fundo | Afasta e mostra o corte | Aceita |

## Rodada 4
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q13 | Título da cena: Sous la Terre / 80 Centimètres / Le Sous-sol | Sous la Terre | Aceita |
| Q14 | Escavação no celular: igual, presa / sem pin | Igual, presa (reduced-motion: empilhada, sem pin) | Aceita |
| Q15 | Vocabulário: "pingo" e "quique" são a mesma coisa? | Quique = o toque; Marca = o que fica | Aceita |

---

## Decisões consolidadas
- **Histoire, uma bola só:**
  - o traço vem até a 1ª data; a bola quica e fica lá enquanto a seção prende;
  - no scroll lateral, pula de data em data sem traço (a linha do tempo é o caminho);
  - na última data, espera o fim do pin, sai num arco e o traço continua;
  - no celular, a mesma regra na linha vertical.
- **Quique de verdade:**
  - a marca nasce no instante do toque, com um tranco (estica e assenta) e pó;
  - a bola achata mais e perde velocidade um instante;
  - depois, a marca escurece e afunda devagar;
  - a marca **fica**, mesmo rolando para cima, e vale também para as Marcas 01–04.
- **Sous la Terre:**
  - cena presa e opaca logo depois de Terre Battue (que fica só com o texto e a foto da marca);
  - o scroll **cava**: as camadas empilhadas sobem pela tela, uma por tela, com textura grande e parallax;
  - cada camada mostra o nome, a espessura e a função (com fonte);
  - um medidor conta a profundidade real, de 0 a 80 cm;
  - no fundo, a câmera se afasta e mostra o corte inteiro em escala real, com a marca no topo;
  - a bola fica na superfície: quica no tijolo, e a câmera desce sem ela;
  - no celular é igual; com reduced-motion, as camadas ficam empilhadas, sem pin.
- **Processo:** fluxo completo, com spec, tickets 22–25 e revisão final (revisor e documentador).
- **Vocabulário:** registrado no glossário `CONTEXT.md`.
