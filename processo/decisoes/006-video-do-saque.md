# 006 · Vídeo do saque

**Status:** decidida (por mim) · **Data:** 2026-10-10

## Contexto
O hero precisa de uma sequência de quadros de um saque real. Na pesquisa, o top pick era o Pexels cottonbro, escolhido pelo fundo preto.
Para avaliar sem depender das descrições, a IA baixou os 3 candidatos e gerou **folhas de contato** (quadros lado a lado com timestamp),
que estão em `../pesquisa/videos/`.

## Comparação

| | Cottonbro 10340706 | Shkraba 4902146 | Mixkit 873 |
|---|---|---|---|
| Fundo | Preto liso (recorte fácil) | Saibro real, com tela verde e logo Babolat | Céu, alambrado e refletores |
| Enquadramento | Da cintura para cima, raquete sai do quadro | Corpo inteiro, lateral | Contra-plongée, da cintura para cima, raquete visível |
| Lançamento | Visível | Quase invisível | Bem visível contra o céu |
| Fluidez | Golpe ~0,5 s ≈ 12 quadros | Golpe ~0,4 s ≈ 10 quadros | **Câmera lenta**, saque ~4 s ≈ 100 quadros |

## Escolha
**Mixkit 873, "Tennis player serving"** (1280×720, 23,976 fps, Mixkit Free License, sem atribuição obrigatória). Trecho do saque: de ~2,4 s a ~6,8 s.

## Porquê
O scroll estica o gesto. Num vídeo em velocidade normal, o golpe (o momento mais importante) tem só ~10 quadros e "picota".
A câmera lenta dá ~100 quadros fluidos, e a bola subindo contra o céu é a imagem mais forte do saque.

## Consequências
- **O top pick da pesquisa caiu.** O fundo fácil de recortar pesava menos que a fluidez (ver `../correcoes-de-rota.md` #8).
- O recorte vai ser mais difícil (céu e alambrado, não um fundo liso): o rembg vira o caminho principal, e o luma-key fica só como comparação.
- A quadra do vídeo é dura, não saibro. Como o fundo vai ser substituído pelas camadas de saibro, isso deixa de importar.
- Resolução 720p: os quadros desktop ficam limitados a ~720 px de altura do jogador.
