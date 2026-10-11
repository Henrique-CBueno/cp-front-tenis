# Revisão final (impeccable finish review)

**Data:** 2026-10-10 · **Como:** um agente revisor novo, sem o histórico da conversa, seguindo a definição oficial do
`impeccable_finish_reviewer` (não há um tipo de agente próprio registrado neste ambiente, então foi usado um agente genérico
com essas instruções). Ele revisa só pelos arquivos e screenshots, sem navegador, e devolve uma "disposição":
ship / fix / rebuild / recapture.

## Rodada 0: recapture
- A evidência foi recusada: no `mobile.png`, a foto da Terre Battue saiu **vazia**. A imagem tem `loading="lazy"` e o screenshot de página inteira não rola, então ela nunca carregava.
- **Erro meu (da IA):** eu tinha validado só a miniatura do desktop.
- Correção: o script de captura agora rola a página inteira e espera todas as imagens carregarem.

## Rodada 1: fix (8 correções materiais)
| # | Correção pedida | Veredito depois do lote |
|---|---|---|
| 1 | Raquete no quadro focal | **partial**: o quadro estático passou para o follow-through (raquete inteira); no contato, a raquete está acima da borda do vídeo original |
| 2 | Remover os "eyebrows" acima dos títulos | **resolved** |
| 3 | "A última marca é o ingresso" | **resolved**: o CTA virou um ingresso com canhoto, e o oval da Marca 04 é o ponto final do traço |
| 4 | Coração sem entalhe falso em CSS, desenhado à mão | **resolved** |
| 5 | Linhas da quadra no resto da página | **resolved**: cada capítulo termina numa linha de base |
| 6 | Faixa vazia embaixo do hero no desktop | **resolved**: linha de base de 71% → 80%, jogador maior |
| 7 | Títulos maiores no mobile | **resolved** |
| 8 | Camadas com material real | **partial**: só o tijolo tem textura real (as outras não têm foto com licença em mãos) |

**Regressões do lote, apontadas pelo revisor:**
- **R1:** o traço passa exatamente na altura de "MARCA 02/03", como um tachado.
- **R2:** no mobile, a linha central cruza o ingresso e a nota, e o CTA quebra em duas linhas.
- **R3:** no desktop, a quadra do fechamento fica vazia do lado direito.

Também corrigido nesta rodada: o `expo.out` do GSAP termina em 0,999, então os estados finais não chegavam a 1. Um teste pegou isso.

## Rodada 2: fix (veredito do lote)
Eu (aluno) escolhi **mais uma rodada**, e **ainda não publicar**.

| Item | Veredito |
|---|---|
| Fix 1, raquete | **partial**: resolvido no desktop (o canvas encosta no topo e a raquete sai pela moldura); no mobile, o braço se dissolve no meio da composição |
| Fix 8, camadas com material real | **partial**: sem mudança (limitação de licença) |
| R1, traço tachando "MARCA 0N" | **resolved**: o rótulo fica abaixo do fio |
| R2, linha central e ingresso quebrado no mobile | **resolved**: o ingresso cabe numa linha em 360/390; teste novo contra transbordamento, validado por mutação |
| R3, quadra vazia no fechamento | **resolved**: o ingresso (Marca 04) pousa na caixa da direita da quadra |

Regressões novas: nenhuma. **Pendências:** só as duas limitações de material. Para saírem da lista, eu preciso aceitá-las por escrito.
- **Raquete no mobile:** no contato, a raquete está acima da borda do vídeo original e não há material para recuperá-la.
- **Camadas sem foto:** calcário, clínquer, cascalho e pedras não têm foto com licença em mãos.

**Achado do processo:** o teste antigo "sem scroll horizontal" não pegou um transbordamento real, porque rodava com `isMobile`. Foram adicionados testes em janelas de 360/390 px.

## Decisão do aluno sobre as pendências
- **Raquete no mobile:** ✅ aceita por escrito como limitação de material.
- **Camadas sem foto:** ❌ **não aceita.** A IA buscou fotos com licença (Pexels) e escolheu uma por camada, do fino ao grosso:
  - calcário branco triturado (3964794);
  - carvão queimado para o clínquer (7138969);
  - cascalho cinza fino (414765);
  - pedras grandes (4599912).

  Cada foto ganhou um véu na cor da camada e os rótulos, um halo, para continuarem legíveis. Os créditos estão no rodapé, e o processamento em `tools/imagens.sh`.

---

# Rodada 2: revisão final (ticket 21)

**Data:** 2026-10-10 · **Como:** um agente revisor novo, sem o histórico, seguindo o `impeccable_finish_reviewer`, como na rodada 1.
- **Evidência:** página inteira em reduced-motion (`.impeccable/review/desktop.png` e `mobile.png`, 1440 e 390), mais as evidências de movimento em `processo/evidencias/14..21/`.
- **Limite:** no máximo 2 rodadas de correção.

## Revisão: fix (8 correções)
| # | Correção pedida | Depois da rodada 1 | Depois da rodada 2 |
|---|---|---|---|
| 1 | Bola longe da borda: Les Légendes a 236 px, Palmarès a 201 px (com o balanço, até 120), Le Score a 229 px da direita | partial | **desktop resolved** (Légendes a ~305 px, Le Score a ~301 px, Palmarès pelo **meio**); **mobile aberto** |
| 2 | Kicker "Face-à-face" (rótulo pequeno acima da frase, banido pela craft floor) | **resolved**: a frase "Dois reis do saibro. Um brasileiro." virou o h2 | — |
| 3 | Corte duro na borda esquerda da foto do Guga | **resolved**: a borda se dissolve no saibro | — |
| 4 | Face-à-face no celular: jogadores pequenos, vazio e "K" órfão | **resolved**: jogadores ancorados no pé, nomes de pé, um de cada lado da rede | — |
| 5 | Caixas de saibro liso atrás do título e da frase | **resolved**: a rede se interrompe atrás da frase | — |
| 6 | Faixa vazia de saibro antes do rodapé | partial | **resolved**: a linha de base encosta no rodapé |
| 7 | Palmarès com cara de galeria genérica | **resolved**: cada troféu pousa na mesma depressão oval das Marcas 01–04 | — |
| 8 | DESIGN.md desatualizado | pendente | atualizado pelo documentador depois do veredito |

**Regressão do lote 1, apontada pelo revisor:** o Palmarès perdeu escala (troféus de ~150 px no desktop e ~60 px no celular; a foto revelada com ~200×220). No lote 2 ficou **resolved**: troféus de ~220/155 px, foto de ~288×315, e ~100 px no celular.

**Veredito final do revisor:** `disposition: fix`. Ficam abertos:
- **A faixa da bola no celular**, que desce a ~30–60 px da borda esquerda numa tela de 390 px. O traço não cruza nenhum texto: medido, e conferido pelo teste do Playwright.
- **O DESIGN.md**, resolvido em seguida pelo documentador.

## Decisão do aluno sobre a faixa do celular
- **Faixa da bola no celular:** ✅ **aceita por escrito como limitação** ("a, aceito a faixa do celular como limitação"). Fica como **adaptação citada**:
  - numa tela de 390 px não há largura para um vão central sem empurrar o texto para colunas estreitas demais;
  - a bola desce por uma faixa lateral de 4.25rem que alterna de lado entre as seções;
  - o traço nunca cruza texto (teste "o traço da bola nunca atravessa um texto", no celular).
- **DESIGN.md:** atualizado pelo documentador.

**Situação final:** com o aceite, os dois itens que o revisor deixou abertos estão fechados. Pela regra do revisor, isso fecha os itens desta revisão, não a página inteira.

---

# Rodada 3: revisão final (ticket 25)

**Data:** 2026-10-10 · **Como:** um agente revisor novo, sem o histórico, seguindo o `impeccable_finish_reviewer`.
- **Evidência:** página inteira em reduced-motion (1440 e 390), mais as sequências de movimento em `processo/evidencias/22..25/`.
- **Limite:** no máximo 2 rodadas de correção.

## Revisão: fix (5 correções)
| # | Correção pedida | Depois da rodada 1 | Depois da rodada 2 |
|---|---|---|---|
| 1 | Medidor ilegível sobre o calcário e o cascalho (~1,1–1,5:1) | **resolved**: numeral numa etiqueta de saibro escuro, régua com contorno | — |
| 2 | Rótulos do corte passando da borda no celular | **resolved**: coluna de 30vw, com quebra de linha | — |
| 3 | O corte pequeno num campo vazio, sem fechar a medição | **resolved**: fatia maior, com uma régua de 0 a 80 cm ao lado | — |
| 4 | No reduced-motion, o traço termina no topo de Sous la Terre, sem citação | **resolved** como registro: correção de rota #33 (como a #28) | — |
| 5 | DESIGN.md desatualizado | pendente | **resolved**: o documentador registrou Sous la Terre, o Quique, a regra das docas e a Histoire nova |

**Regressões do lote 1, todas no corte do celular:**
- rótulos do tijolo e do calcário colados;
- "cm" sozinho numa linha;
- a bola cobrindo o "0 cm" da régua no salto.

As três ficaram **resolved** no lote 2.

**Também corrigido** (a partir do relatório do documentador e da última observação do revisor):
- um fio escuro solto ao lado do medidor no celular;
- a régua do corte desenhada com `border-left` (o detector acusou "side-tab"), trocada por um pseudo-elemento;
- um ponto de 1–2 px ao lado da régua: era um traço de comprimento zero com ponta redonda, que agora fica escondido até ter comprimento.

**Veredito final do revisor:** `disposition: ship`. Pela regra do revisor, esse ship cobre os itens pontuados (as 5 correções e as 3 regressões), não a superfície inteira.

**Pendentes de revisão minha:** as correções de rota #28 e #33 (a Histoire e Sous la Terre sem a bola no reduced-motion).

**Ponto do teto que ficou de fora:** "o grão reage ao quadro" (o grão do saibro reagir ao pouso da bola). Nenhuma correção pediu.
