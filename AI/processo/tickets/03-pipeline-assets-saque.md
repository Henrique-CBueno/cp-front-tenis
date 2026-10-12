# 03: Preparação das imagens do saque (Mixkit 873)

**What to build:** o jogador aparece **recortado**, sem céu nem alambrado, sobre o saibro da página. Um script reproduzível (fora do bundle) transforma o trecho do saque (~2,4–6,8 s) do Mixkit 873 em três conjuntos WebP com alpha (desktop ~90, mobile ~45 e estático = 1 quadro do impacto) e numa lista dos conjuntos, que o módulo Sequência do Saque consome no lugar dos quadros provisórios. A comparação dos métodos de recorte fica registrada no processo.

**Blocked by:** 02

**Status:** done

- [x] Script reproduzível: download/trecho → ffmpeg → remoção de fundo → WebP com alpha → lista dos conjuntos
- [x] rembg roda numa venv local (não é instalado no sistema); o luma-key do ffmpeg é testado como comparação
- [x] Comparação visual dos dois métodos (cabelo, raquete, bola) salva em `processo/pesquisa/` e decisão em `processo/decisoes/`
- [x] A bola continua visível no lançamento depois do recorte
- [x] Os conjuntos desktop, mobile e estático existem e a lista os descreve (contagem, dimensões)
- [x] O hero passa a usar os quadros recortados; os testes 02 continuam verdes
- [x] Peso total do conjunto desktop registrado (meta: até ~8 MB)
- [x] Log da etapa em `processo/prompts/`

## Comments

- 2026-10-10 (Claude, revisão do 02): os 90 quadros desktop de 1280×720, decodificados, ocupam ~330 MB de memória. Ao recortar, cortar cada quadro na caixa do jogador (não no frame inteiro) e medir o consumo. O script `tools/frames-provisorios.sh` já tem o trecho, o instante do impacto e a geração da lista dos conjuntos, então dá para estender.
- 2026-10-10 (Claude): concluído com rembg `birefnet-general-lite` (decisão 008). O luma-key foi testado e reprovado. Desktop com 2,3 MB, abaixo da meta de 8 MB. A bola não é preservada por nenhum método e vira elemento próprio no ticket 04. A raquete some nos quadros ~28–50.
