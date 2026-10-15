# Prompt 45 · a bola ainda sumia (no saque)

**Data:** 2026-10-12 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi
> a bola ainda esta sumindo

## O que a IA fez
- **Mediu de forma mais realista:** roda do mouse com o Lenis, quadro a quadro, registrando se havia bola à vista e o que estava por cima dela.
- **Achou o buraco no saque:** o rastreio do vídeo para no quadro 17, e a bola sumia no ar até o contato (correção #40).
- **Completou a trajetória** (`src/ball-track.js`, com testes primeiro): buracos soltos interpolados, e a subida até um pico dentro da tela seguida da descida até a raquete.
- **Achou um limite de composição:** no desktop, o golpe acontece acima da tela. Ofereceu três caminhos, e **eu escolhi deixar como está**.
- **Testes:** 33 de unidade e 68 de 68 E2E verdes.
