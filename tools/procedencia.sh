#!/usr/bin/env bash
# Grava a procedência (origem + licença + tratamento) dentro de cada raster publicado.
# Rodar depois de tools/imagens.sh e tools/saque.py. Confere com: impeccable embed-prompt --scan public/img public/frames
set -euo pipefail
cd "$(dirname "$0")/.."
IMP=.agents/skills/impeccable/scripts/impeccable
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

embed() { # arquivo, texto
  printf '%s\n' "$2" > "$TMP"
  "$IMP" embed-prompt "$1" --prompt-file "$TMP" >/dev/null
}

embed public/img/estadio.webp "Origem: 'Court Philippe Chatrier 2024.jpg', MFonzatti, CC BY-SA 4.0, Wikimedia Commons. Recortada (arquibancada superior, sem telão nem patrocinadores) e convertida para tons de cinza por tools/imagens.sh; esta versão também é CC BY-SA 4.0."
embed public/img/saibro.webp "Origem: Pexels 38381015 (close de linha em quadra de saibro), Pexels License. Recorte da textura acima da linha, espelhado 2x2 por tools/imagens.sh."
embed public/img/marca.webp "Origem: Pexels 38380408 (bola de tênis no saibro, close), Pexels License. Recortada e redimensionada por tools/imagens.sh."
embed public/img/camada-calcario.webp "Origem: Pexels 3964794 (fragmentos de pedra branca), Pexels License. Faixa recortada por tools/imagens.sh."
embed public/img/camada-clinquer.webp "Origem: Pexels 7138969 (carvão queimado), Pexels License. Faixa recortada por tools/imagens.sh."
embed public/img/camada-cascalho.webp "Origem: Pexels 414765 (cascalho cinza), Pexels License. Faixa recortada por tools/imagens.sh."
embed public/img/camada-pedras.webp "Origem: Pexels 4599912 (pedras), Pexels License. Faixa recortada por tools/imagens.sh."

for frame in public/frames/*/*.webp; do
  embed "$frame" "Origem: Mixkit 873 'Tennis player serving', Mixkit Free License. Quadro do trecho 2,4–6,8 s, recortado com rembg birefnet-general-lite e cortado na caixa do jogador por tools/saque.py."
done
echo "procedência gravada"
