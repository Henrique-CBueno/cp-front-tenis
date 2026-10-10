# 008 · Método de recorte do jogador

**Status:** decidida pela IA no ticket 03 (pendente de revisão minha) · **Data:** 2026-10-10
**Evidências:** `../pesquisa/recorte/` (5 comparações)

## Contexto
O Mixkit 873 tem céu, arquibancada e alambrado atrás do jogador. Para pôr o jogador sobre o saibro da página, cada quadro precisa de um recorte (alpha).

## Opções testadas
| Método | Resultado | Tempo/quadro |
|---|---|---|
| **luma-key** (ffmpeg) | Tira o céu, mas também come a camisa branca, e deixa o alambrado | instantâneo |
| **color-key** no azul do céu (ffmpeg) | Mesmo problema: só o céu sai | instantâneo |
| **Placa limpa** (mediana dos quadros + diferença) | **Falhou:** a câmera se move, a placa sai borrada e a diferença acusa o alambrado inteiro | — |
| rembg `u2net_human_seg` | Recorte bom do corpo, borda mais dura | 0,3 s |
| rembg `u2net` | Igual ao birefnet nos quadros testados | 0,3 s |
| rembg `isnet-general-use` | Guarda a raquete borrada em alguns quadros, mas borra o braço | 0,8 s |
| rembg **`birefnet-general-lite`** | **Bordas mais limpas** (mãos, cabelo, boné) | 7–9 s |
| rembg `birefnet-general` (completo) | Igual ao lite nos testes, mais lento | 12 s |

## Escolha
**rembg `birefnet-general-lite`**, rodando numa venv local (`tools/.venv`). O script `tools/saque.py` é reproduzível e guarda os recortes em cache.

## Limitações conhecidas
- **A bola:** nenhum método a preserva (pequena demais contra o céu). → Vira um **elemento próprio da página**, animado no ticket 04 e ligado ao "traço da bola".
- **A raquete:** quando está afastada do corpo, todos os modelos a tratam como fundo. No golpe ela já está borrada no próprio vídeo. Ver a inspeção do resultado final.
- O jogador é cortado na altura da coxa pela borda do vídeo e fica "nascendo" da linha de base. Tratamento visual no ticket 04.

## Desempenho
Cada quadro é cortado na caixa que contém o jogador em todos os quadros, não no frame 1280×720 inteiro, o que reduz a memória decodificada (alerta da revisão do ticket 02).

## Resultado (inspeção da folha de contato, `../pesquisa/recorte/6-resultado-90-quadros.jpg`)
- A raquete aparece no início (preparação), no golpe e no follow-through. A bola aparece na mão antes do lançamento.
- **A raquete some nos quadros ~28 a 50** (fase do "troféu", em que ela fica baixa, atrás do quadril). É um trecho contínuo, sem piscar quadro a quadro. Fica na parte baixa do jogador, que o ticket 04 vai suavizar ao fazê-lo "nascer" do saibro.
- Pesos: desktop 2,3 MB (90 quadros), mobile 0,7 MB (45), estático 32 KB. Memória decodificada do desktop ≈ 210 MB (antes ≈ 330 MB).
