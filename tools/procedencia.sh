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
embed public/img/terra/camada-tijolo.webp "Origem: Pexels 38381015 (close de quadra de saibro), Pexels License. Recorte 16:10 da parte de cima (sem a linha) por tools/imagens.sh, para Sous la Terre."
embed public/img/terra/camada-calcario.webp "Origem: Pexels 3964794 (fragmentos de pedra branca), Pexels License. Recorte 16:10 em tela cheia por tools/imagens.sh, para Sous la Terre."
embed public/img/terra/camada-clinquer.webp "Origem: Pexels 7138969 (carvão queimado), Pexels License. Recorte 16:10 em tela cheia por tools/imagens.sh, para Sous la Terre."
embed public/img/terra/camada-cascalho.webp "Origem: Pexels 414765 (cascalho cinza), Pexels License. Recorte 16:10 em tela cheia por tools/imagens.sh, para Sous la Terre."
embed public/img/terra/camada-pedras.webp "Origem: Pexels 4599912 (pedras), Pexels License. Recorte 16:10 em tela cheia por tools/imagens.sh, para Sous la Terre."

# Rodada 2: a procedência de cada foto vem de tools/source/commons/creditos.json (gerado por tools/commons.py)
for img in public/img/rodada2/*.webp; do
  name=$(basename "$img" .webp); key=${name#face-}; [ "$key" = "$name" ] || key="$key-face"
  origin=$(python3 -c "import json,sys; c=json.load(open('tools/source/commons/creditos.json'))[sys.argv[1]]; print(f\"Origem: Wikimedia Commons, {c['file']} ({c['page']}), autor: {' '.join(c['author'].split())}, licença {c['license']}. Recortada por tools/rodada2.py.\")" "$key")
  embed "$img" "$origin"
done

for frame in public/frames/*/*.webp; do
  embed "$frame" "Origem: Mixkit 873 'Tennis player serving', Mixkit Free License. Quadro do trecho 2,4–6,8 s, recortado com rembg birefnet-general-lite e cortado na caixa do jogador por tools/saque.py."
done
echo "procedência gravada"
