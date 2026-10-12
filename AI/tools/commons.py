"""Baixa fotos do Wikimedia Commons e grava autor, licença e link (para créditos e procedência).

Uso: python3 tools/commons.py   (grava em tools/source/commons/ e tools/source/commons/creditos.json)
"""
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'tools/source/commons'
UA = {'User-Agent': 'la-trace-fiap/1.0 (projeto academico; contato via GitHub Henrique-CBueno)'}

# chave: (arquivo no Commons, largura pedida). Planos abertos pedem mais resolução para o recorte do card.
FILES = {
    'guga-face': ('Kuerten_2004_Toronto_01.jpg', 1200),  # de perfil, prestes a sacar (Face-à-face)
    'nadal-face': ('Paris-FR-75-open_de_tennis-2-6--17-Roland_Garros-Rafael_Nadal-11.jpg', 2400),  # RG 2017, perfil
    'trofeu-mousquetaires': ('Coupe_des_Mousquetaires_(cropped).jpg', 1200),
    'trofeu-lenglen': ('Coupe_Suzanne-Lenglen_(cropped).jpg', 1200),
    'campeao-2006-nadal': ('Rafael_Nadal_at_the_2006_French_Open.jpg', 2400),
    'campeao-2012-sharapova': ('Maria_Sharapova_Roland_Garros_2012.jpg', 1200),
    'campeao-2015-serena': ('Serena_Williams_Won_Roland_Garros_in_2015.JPG', 1200),
    'campeao-2016-djokovic': ('Djokovic_2016.jpg', 1200),
    'campeao-2017-ostapenko': ('Jelena_Ostapenko_RG17.jpg', 1200),
    'campeao-2018-halep': ('Simona_Halep_Roland_Garros_2018.jpg', 1200),
    'campeao-2023-djokovic': ('Novak_Đoković_2023.jpg', 3024),
    'campeao-2023-swiatek': ('Iga_Świątek_French_Open_2023_(cropped).jpg', 600),
    'campeao-2024-alcaraz': ('Carlos_Alcaraz_-_Vainqueur_Roland_Garros_2024.jpg', 1493),
}


def fetch(url):
    """GET com pausa e novas tentativas: o Commons responde 429 quando as requisições vêm rápido demais."""
    for attempt in range(6):
        try:
            time.sleep(1.5)
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read()
        except urllib.error.HTTPError as error:
            if error.code != 429:
                raise
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(f'Commons recusou {url}')


def plain(html):
    return re.sub(r'<[^>]+>', '', html or '').strip()


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    credits = {}
    for key, (name, width) in FILES.items():
        params = urllib.parse.urlencode({
            'action': 'query', 'format': 'json', 'titles': f'File:{name}',
            'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size', 'iiurlwidth': width,
        })
        page = next(iter(json.loads(fetch(f'https://commons.wikimedia.org/w/api.php?{params}'))['query']['pages'].values()))
        info = page['imageinfo'][0]
        meta = info['extmetadata']
        target = OUT / f'{key}.jpg'
        if not target.exists():
            data = fetch((info.get('thumburl') or info['url']).split('?')[0])
            if not data.startswith(b'\xff\xd8'):  # uma página de erro (ex.: 429) não pode virar "foto"
                raise RuntimeError(f'{key}: o Commons não devolveu um JPEG')
            target.write_bytes(data)
        credits[key] = {
            'file': name,
            'page': info['descriptionurl'],
            'author': plain(meta.get('Artist', {}).get('value')),
            'license': meta.get('LicenseShortName', {}).get('value'),
            'license_url': meta.get('LicenseUrl', {}).get('value'),
            'size': f"{info['width']}x{info['height']}",
        }
        print(key, credits[key]['license'], '|', credits[key]['author'][:40], '|', credits[key]['size'])
    (OUT / 'creditos.json').write_text(json.dumps(credits, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
