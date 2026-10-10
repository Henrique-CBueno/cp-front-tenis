#!/usr/bin/env bash
# Camadas do parallax do hero, a partir das fotos com licença livre (créditos no rodapé da página).
set -euo pipefail
cd "$(dirname "$0")/.."
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36"
mkdir -p tools/source public/img

# Court Philippe-Chatrier 2024, MFonzatti, CC BY-SA 4.0 (Wikimedia Commons)
[ -f tools/source/chatrier-2024.jpg ] || curl -sSL -A "$UA" -o tools/source/chatrier-2024.jpg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Court_Philippe_Chatrier_2024.jpg?width=2400"
# Saibro com marcas de vassoura, Pexels 38381015 (Pexels License)
[ -f tools/source/pexels-38381015.jpg ] || curl -sSL -A "$UA" -o tools/source/pexels-38381015.jpg \
  "https://images.pexels.com/photos/38381015/pexels-photo-38381015.jpeg?auto=compress&w=1800"

# Arquibancada superior direita: sem telão (logo oficial) nem placas de patrocinador. Em tons de cinza;
# a cor vem do saibro da página (mix-blend-mode: multiply), então a obra derivada continua CC BY-SA.
ffmpeg -v error -y -i tools/source/chatrier-2024.jpg \
  -vf "crop=1560:820:2280:400,scale=1600:-2,format=gray,eq=contrast=1.15:brightness=0.06" \
  -c:v libwebp -quality 70 public/img/estadio.webp

# Só a textura (acima da linha pintada), para o grão do saibro. Espelhada em 2×2 para o tile não ter emenda.
ffmpeg -v error -y -i tools/source/pexels-38381015.jpg -filter_complex \
  "crop=1800:1200:0:0,scale=700:-2,split[a][b];[b]hflip[bh];[a][bh]hstack,split[t][u];[u]vflip[uv];[t][uv]vstack" \
  -c:v libwebp -quality 68 public/img/saibro.webp

# A marca vista de perto: bola no saibro com o desenho do quique logo abaixo. Pexels 38380408 (Pexels License)
[ -f tools/source/pexels-38380408.jpg ] || curl -sSL -A "$UA" -o tools/source/pexels-38380408.jpg \
  "https://images.pexels.com/photos/38380408/pexels-photo-38380408.jpeg?auto=compress&w=1800"
ffmpeg -v error -y -i tools/source/pexels-38380408.jpg \
  -vf "crop=1800:2300:0:120,scale=960:-2" -c:v libwebp -quality 74 public/img/marca.webp

# Sous la Terre: as cinco camadas debaixo da quadra, em tela cheia (todas Pexels License, baixadas a 2400 px):
# tijolo moído (38381015, o saibro acima da linha), calcário (3964794), clínquer/carvão queimado (7138969),
# cascalho (414765) e pedras (4599912). Recorte 16:10 no centro (no tijolo, a parte de cima, sem a linha).
mkdir -p tools/source/pexels-2400 public/img/terra
for spec in tijolo:38381015:0 calcario:3964794:c clinquer:7138969:c cascalho:414765:c pedras:4599912:c; do
  name=${spec%%:*}; rest=${spec#*:}; id=${rest%%:*}; top=${rest##*:}
  [ -f "tools/source/pexels-2400/$id.jpg" ] || curl -sSL -A "$UA" -o "tools/source/pexels-2400/$id.jpg" \
    "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=2400"
  if [ "$top" = "0" ]; then crop="crop=iw:iw*10/16:0:0"; else crop="crop='min(iw,ih*16/10)':'min(ih,iw*10/16)'"; fi
  ffmpeg -v error -y -i "tools/source/pexels-2400/$id.jpg" \
    -vf "$crop,scale=1920:1200" -c:v libwebp -quality 48 "public/img/terra/camada-$name.webp"
done

du -h public/img/*
