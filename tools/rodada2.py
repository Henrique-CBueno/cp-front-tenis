"""Imagens da rodada 2: Face-à-face (Guga × Nadal), troféus e cards do Palmarès.

Uso: tools/.venv/bin/python -I tools/rodada2.py   (depois de python3 tools/commons.py)
Entrada: tools/source/commons/*.jpg · Saída: public/img/rodada2/*.webp
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'tools/source/commons'
OUT = ROOT / 'public/img/rodada2'
WORK = ROOT / 'tools/work/rodada2'

# Face-à-face: Guga fica à esquerda e precisa olhar para a direita; Nadal, à direita, olhando para a esquerda.
# A foto do Guga olha para a esquerda e é espelhada (CC BY permite); a do Nadal já olha para a esquerda.
FACES = {'guga': ('guga-face', True), 'nadal': ('nadal-face', False)}
TROPHIES = ['trofeu-mousquetaires', 'trofeu-lenglen']
# Świątek 2023 fica de fora: na foto livre ela está ao lado do troféu (no chão), e o retrato 4:5 não fecha rosto + troféu.
CHAMPIONS = [p.stem for p in sorted(SRC.glob('campeao-*.jpg')) if p.stem != 'campeao-2023-swiatek']


def cutout(session, name):
    cache = WORK / f'{name}.png'
    if not cache.exists():
        remove(Image.open(SRC / f'{name}.jpg').convert('RGB'), session=session).save(cache)
    return Image.open(cache)


def bbox(rgba, threshold=40):
    return Image.fromarray((np.asarray(rgba)[:, :, 3] > threshold).astype(np.uint8) * 255).getbbox()


def save(img, path, **kw):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, 'WEBP', method=6, **kw)
    print(path.relative_to(ROOT), img.size)


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    fine = new_session('birefnet-general-lite')

    for who, (name, mirror) in FACES.items():
        cut = cutout(fine, name)
        cut = cut.crop(bbox(cut))
        if mirror:
            cut = ImageOps.mirror(cut)
        if cut.height > 1400:
            cut = cut.resize((round(cut.width * 1400 / cut.height), 1400), Image.LANCZOS)
        save(cut, OUT / f'face-{who}.webp', quality=86)

    for name in TROPHIES:
        cut = cutout(fine, name)
        cut = cut.crop(bbox(cut))
        cut.thumbnail((700, 700), Image.LANCZOS)
        save(cut, OUT / f'{name}.webp', quality=86)

    # Cards: retrato 4:5 em volta da silhueta (campeão + troféu), sem o pódio com o logo embaixo
    people = new_session('u2net_human_seg')
    for name in CHAMPIONS:
        photo = Image.open(SRC / f'{name}.jpg').convert('RGB')
        left, top, right, bottom = bbox(cutout(people, name))
        # o retrato 4:5 cabe sempre dentro da foto (sem faixas pretas); se não couber inteiro, encolhe
        h = min((bottom - top) * 1.12, photo.height, photo.width / 0.8)
        w = h * 0.8
        cx = (left + right) / 2
        box = [cx - w / 2, top - (bottom - top) * 0.06, cx + w / 2, top - (bottom - top) * 0.06 + h]
        dx = max(0, -box[0]) - max(0, box[2] - photo.width)
        dy = max(0, -box[1]) - max(0, box[3] - photo.height)
        box = [box[0] + dx, box[1] + dy, box[2] + dx, box[3] + dy]
        card = photo.crop([round(v) for v in box]).resize((640, 800), Image.LANCZOS)
        save(card, OUT / f'{name}.webp', quality=80)


if __name__ == '__main__':
    main()
