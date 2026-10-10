# 02 · Grilling da rodada 2: melhorias depois do MVP

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5), `/grill-me` → skill `grilling`, em plan mode
**Meu pedido (literal):**

> 1. A bolinha esta correndo pelo canto da tele, gostaria que fosse igual estava no inicio, pelo meio, e na parte da historia ela esta sumindo.
> 2. Gostaria que o site tivessse mais animacoes, como o site: "https://landonorris.com/", por exemplo, na parte legends. Gostaria que tivesse uma animacao do guga e do nadal se olhando, como acontece nesse site na parte "On track/off track" gostaria que tivesse uma parte de ganhadores, com os trofeus, e aao passar o mouse aparece a foto do ganhador daquelke ano ganhando, tipo como acontece na parte dos seasons com os capacetes.
> 3. Existem algumas fotos legais nesse site "https://www.gettyimages.com.br/fotos/stade-roland-garros", porem fique a vontade para proucurar mais

Enquanto perguntava, a IA disparou duas pesquisas em background: a mecânica do landonorris.com (`pesquisa/landonorris.md`) e as fotos com licença livre (`pesquisa/fotos-rodada-2.md`).

---

## Rodada 1
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q1 | Por onde a bola corre: (a) corredor central de giz, (b) atrás do texto, (c) por cima de tudo | (a) | **"deixe umas partes sem texto, onde ja sabe qua a bola vai passar, fazendo umas curval, com um efeito legal"** |
| Q2 | A bola na Histoire rola sobre a linha do tempo | Sim | Aceita |
| Q3 | Imagens: (a) Commons/Flickr CC, (b) embed do Getty, (c) Getty mesmo assim | (a), com o Getty só como referência | Aceita |
| Q4 | Prioridade se precisar cortar | bola → campeões → Guga×Nadal | **"tenho mais uma semana de prazo"** |
| Q5 | Fluxo | Repetir enxuto (spec → tickets) | **"Vamos! Vamos criar novas specs e novos tickets"** |

## Rodada 2
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q6 | O efeito da bola: quiques, sombra, rastro, curvas largas | quiques + sombra + curvas | Aceita |
| Q7 | Zonas livres: respiros entre seções / corredor que serpenteia / os dois | Os dois, com a bola passando pela borda dentro das seções | **"Mas nao quero que ela passe pelo lado da secao. Sim por um espaco reservado nela"** |
| Q8 | Face-à-face Guga × Nadal, antes do coração | Antes | Aceita, **"Quero animacao"** |
| Q9 | Campeões: só anos com foto / todos os anos / só homens | Só anos com foto + buscar no Flickr | Aceita |
| Q10 | Hover no celular | Scroll + toque | Aceita |
| Q11 | "Palmarès" depois de Les Légendes | Sim | Aceita |
| Q12 | Mais animações | Títulos letra a letra + marquee | **Títulos + marquee + cursor de bolinha** (a IA tinha desaconselhado o cursor) |

## Rodada 3
| Q | Pergunta | Recomendação da IA | Minha resposta |
|---|---|---|---|
| Q13 | Espaço reservado: corredor central fixo / coluna que muda de lado | Corredor central fixo | **"Nao quero a bola descendo reto, quero algo que soe natural e suave"** |
| Q14 | Blocos de largura total | Passa por trás das camadas; vão central nos placares | Aceita |
| Q15 | Cursor de bolinha × bola do rali ("One Ball") | O cursor vira bolinha só em lugares-chave | **"e se o cursor fosse uma raquete?"** |
| Q16 | Sequência do Face-à-face | A proposta | Aceita |
| Q17 | Card do Palmarès (troféu → máscara de saibro → foto) | A proposta | Aceita |
| Q18 | Marquee | A proposta | Aceita |
| Q19 | Spec em arquivo novo | Arquivo novo | Aceita |

## Rodada 4
| Q | Pergunta | Minha resposta |
|---|---|---|
| Q20 | Trajeto natural e suave | **Balanço em S:** curva pelo lado oposto ao texto, sem encostar na borda; nos respiros, a bola cruza em arco e quica; segue o scroll com inércia leve |
| Q21 | Comportamento da raquete-cursor | **Segue o mouse + swing no clique + rebate a bola + fica raquete também nos links** |

---

## Decisões consolidadas
- **Bola:** respiros entre as seções + um vazio reservado **dentro** de cada seção (nunca na borda). Trajeto em S, como spline contínua, com inércia leve. Quiques com mini marca, pó e achatamento. Sombra com altura. Na Histoire, rola sobre a linha do tempo. Passa por trás das camadas da quadra; os placares abrem um vão central.
- **Face-à-face:** Guga × Nadal antes do coração, numa seção presa, com duotone → cor, rede pulsando, contagem 3 | 14 e "Dois reis do saibro. Um brasileiro.".
- **Palmarès:** campeões com foto livre segurando o troféu. Máscara de saibro em onda no hover. Grade de 3 colunas / lista no celular. Revela também pelo scroll e pelo toque.
- **Mais animação:** títulos letra a letra, marquee que acompanha a velocidade do scroll, raquete-cursor.
- **Imagens:** só Commons/Flickr com licença livre; o Getty fica como referência.
- **Prazo:** +1 semana. Spec: `spec-rodada-2.md`; tickets a partir do 13.
