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
