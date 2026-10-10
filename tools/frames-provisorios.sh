#!/usr/bin/env bash
# Quadros PROVISÓRIOS do saque (com o fundo original do vídeo, sem recorte).
# Fonte: Mixkit 873 "Tennis player serving" (Mixkit Free License). O ticket 03 troca estes quadros pelos recortados.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC_URL="https://assets.mixkit.co/videos/873/873-720.mp4"
SRC="tools/source/mixkit-873.mp4"
START=2.4      # início do trecho (lançamento da bola)
DURATION=4.4   # até o follow-through
IMPACT=6.15    # instante do contato raquete-bola, no vídeo original
OUT="public/frames"

mkdir -p tools/source
[ -f "$SRC" ] || curl -sSL -o "$SRC" "$SRC_URL"

extract() { # nome, quantidade, largura
  local name=$1 count=$2 width=$3
  rm -rf "$OUT/$name" && mkdir -p "$OUT/$name"
  local fps
  fps=$(python3 -c "print($count / $DURATION)")
  ffmpeg -v error -ss "$START" -t "$DURATION" -i "$SRC" \
    -vf "fps=$fps,scale=$width:-2" -frames:v "$count" -c:v libwebp -quality 72 "$OUT/$name/%03d.webp"
}

extract desktop 90 1280
extract mobile 45 854
rm -rf "$OUT/static" && mkdir -p "$OUT/static"
ffmpeg -v error -ss "$IMPACT" -i "$SRC" -frames:v 1 -vf "scale=1280:-2" -c:v libwebp -quality 80 "$OUT/static/impacto.webp"

python3 - "$OUT" "$START" "$DURATION" "$IMPACT" <<'PY'
import json, os, sys
out, start, duration, impact = sys.argv[1], *map(float, sys.argv[2:])
def urls(name):
    files = sorted(os.listdir(os.path.join(out, name)))
    return [f"/frames/{name}/{f}" for f in files]
manifest = {
    "source": "Mixkit 873 (provisório, sem recorte)",
    "mobileMaxWidth": 720,
    "keyframeEvery": 8,
    "impactProgress": round((impact - start) / duration, 3),
    "sets": {"desktop": urls("desktop"), "mobile": urls("mobile"), "static": urls("static")},
}
json.dump(manifest, open("src/frames-manifest.json", "w"), indent=2)
print({k: len(v) for k, v in manifest["sets"].items()}, "impact", manifest["impactProgress"])
PY
du -sh "$OUT"/*
