# 012 · Fotos da rodada 2

**Status:** decidida pela IA no ticket 13 (pendente de revisão minha) · **Data:** 2026-10-10

- **Fonte:** só o Wikimedia Commons, com licença livre (CC BY, CC BY-SA, CC0). O Getty fica só como referência visual (Q3). O Flickr CC não cobriu nenhuma lacuna.
- **Face-à-face:** Guga (Toronto 2004, espelhado) × Nadal (RG 2017), recortados com rembg `birefnet-general-lite`. Os dois de perfil, se encarando. A foto do Guga não é em Roland-Garros e tem resolução baixa; a escolha privilegiou o **perfil** (o pedido era "se olhando").
- **Troféus:** os recortes do Commons (já sem fundo) passaram pelo rembg para ganhar transparência real.
- **Palmarès:** 8 campeões no ano em que venceram, com o troféu, em retratos 4:5 enquadrados automaticamente pela silhueta (u2net_human_seg), dentro dos limites da foto e sem o pódio com o logo.
- **Fora:** as lacunas sem foto livre, os ex-campeões da cerimônia de 2012 e a Świątek 2023 (o troféu não cabe no retrato).
- **Créditos e procedência:** autor, licença e link no rodapé, gerados de `tools/source/commons/creditos.json`. A procedência está embutida em cada WebP (`tools/procedencia.sh`; scan com 155 imagens e 0 pendentes).
- **Reprodutível:** `python3 tools/commons.py` → `tools/.venv/bin/python -I tools/rodada2.py` → `tools/procedencia.sh`.
