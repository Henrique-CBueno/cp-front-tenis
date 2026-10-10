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
