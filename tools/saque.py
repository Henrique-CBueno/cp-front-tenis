"""Pipeline do saque: Mixkit 873 → quadros recortados (WebP com alpha) + lista dos conjuntos.

Uso: tools/.venv/bin/python -I tools/saque.py
Reproduzível: baixa o vídeo se faltar, guarda os recortes em cache (tools/work/cut) e regrava public/frames + src/frames-manifest.json.
"""
import json
import shutil
import subprocess
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
SRC_URL = 'https://assets.mixkit.co/videos/873/873-720.mp4'
SRC = ROOT / 'tools/source/mixkit-873.mp4'
WORK = ROOT / 'tools/work'
OUT = ROOT / 'public/frames'
MANIFEST = ROOT / 'src/frames-manifest.json'

START, DURATION, IMPACT = 2.4, 4.4, 6.15  # trecho do saque e instante do contato (s)
DESKTOP_COUNT = 90
MOBILE_SCALE = 0.6
MODEL = 'birefnet-general-lite'  # escolhido na comparação (ver processo/decisoes/008)
ALPHA_MIN = 24
PAD = 16


def extract(dest: Path):
    dest.mkdir(parents=True, exist_ok=True)
    if len(list(dest.glob('*.png'))) == DESKTOP_COUNT:
        return
    fps = DESKTOP_COUNT / DURATION
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(START), '-t', str(DURATION), '-i', SRC,
                    '-vf', f'fps={fps}', '-frames:v', str(DESKTOP_COUNT), dest / '%03d.png'], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(IMPACT), '-i', SRC, '-frames:v', '1',
                    dest / 'impacto.png'], check=True)


def cut_all(raw: Path, cut: Path):
    cut.mkdir(parents=True, exist_ok=True)
    session = new_session(MODEL)
    for frame in sorted(raw.glob('*.png')):
        target = cut / frame.name
        if not target.exists():
            remove(Image.open(frame), session=session).save(target)
            print('recortado', frame.name, flush=True)


def union_box(images):
    boxes = [Image.fromarray((np.asarray(im)[:, :, 3] > ALPHA_MIN).astype(np.uint8) * 255).getbbox() for im in images]
    boxes = [b for b in boxes if b]
    w, h = images[0].size
    return (max(0, min(b[0] for b in boxes) - PAD), max(0, min(b[1] for b in boxes) - PAD),
            min(w, max(b[2] for b in boxes) + PAD), h)  # embaixo o jogador é cortado pela borda do vídeo


def main():
    if not SRC.exists():
        SRC.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(SRC_URL, SRC)
    raw, cut = WORK / 'raw', WORK / 'cut'
    extract(raw)
    cut_all(raw, cut)

    frames = [Image.open(p) for p in sorted(cut.glob('[0-9]*.png'))]
    box = union_box(frames)
    for name in ('desktop', 'mobile', 'static'):
        shutil.rmtree(OUT / name, ignore_errors=True)
        (OUT / name).mkdir(parents=True)

    for i, im in enumerate(frames):
        crop = im.crop(box)
        crop.save(OUT / 'desktop' / f'{i:03d}.webp', quality=80, method=6)
        if i % 2 == 0:
            small = crop.resize((round(crop.width * MOBILE_SCALE), round(crop.height * MOBILE_SCALE)), Image.LANCZOS)
            small.save(OUT / 'mobile' / f'{i // 2:03d}.webp', quality=78, method=6)
    Image.open(cut / 'impacto.png').crop(box).save(OUT / 'static' / 'impacto.webp', quality=85, method=6)

    def urls(name):
        return [f'/frames/{name}/{p.name}' for p in sorted((OUT / name).glob('*.webp'))]

    w, h = frames[0].size
    manifest = {
        'source': f'Mixkit 873, recortado com rembg ({MODEL})',
        'mobileMaxWidth': 720,
        'keyframeEvery': 8,
        'impactProgress': round((IMPACT - START) / DURATION, 3),
        'crop': {'x': box[0] / w, 'y': box[1] / h, 'width': (box[2] - box[0]) / w, 'height': (box[3] - box[1]) / h},
        'sets': {name: urls(name) for name in ('desktop', 'mobile', 'static')},
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n')
    print('caixa', box, {k: len(v) for k, v in manifest['sets'].items()})


if __name__ == '__main__':
    main()
