# 009 · A bola, o traço e as camadas do hero

**Status:** decidida pela IA no ticket 04 (pendente de revisão minha) · **Data:** 2026-10-10

## A bola vira elemento próprio, rastreado no vídeo
- O recorte perde a bola (decisão 008). Como ela é amarelo-esverdeada contra o céu azul, `tools/saque.py` a **rastreia por cor** nos quadros originais (quadros 0–17) e grava a posição de cada quadro na lista dos conjuntos.
- A página desenha uma bola própria nessas posições. No contato (quadro 82, logo acima da borda do vídeo), a mesma bola segue um **traço contínuo** (curva) até a **Marca 01**.
- Assim, o "traço da bola" do brief nasce do gesto real, e não de uma decoração.

## Fases do hero (dentro do pin)
| Progresso | O que acontece |
|---|---|
| 0–78% | O saque (90 quadros) |
| ~72% | Contato: a bola aparece no ponto da raquete |
| 72–90% | Voo da bola; o traço é desenhado junto |
| 88–96% | A Marca 01 "afunda" no saibro e a legenda aparece; o título "estica" (largura 62% → 72%) |

## Camadas
- **Arquibancada** (Wikimedia, CC BY-SA): o recorte superior direito, **sem o telão com o logo oficial nem as placas de patrocinador**, em tons de cinza e tingido pelo saibro (`multiply`). Recua devagar.
- **Grão**: a textura real de saibro varrido (Pexels), espelhada em 2×2 para não ter emenda. Escorre mais rápido que a arquibancada e se adensa no instante do contato.
- **Jogador**: some suavemente na base (máscara), como se "nascesse" do saibro, o que esconde o corte do vídeo na coxa.

## Reduced-motion
Mostra direto o estado final: o quadro estático, o traço completo e a marca.
