# 23: Histoire com uma bola só

**What to build:**
- **Entrada:** o traço vem até a 1ª data da Histoire. A bola quica nela e fica parada enquanto a seção prende.
- **Durante o scroll lateral:** a bola pula de data em data, sem traço (a linha do tempo é o caminho).
- **Saída:** na última data, a bola espera o fim do pin, sai num arco e o traço continua pela página.
- **Celular:** a mesma regra, na linha vertical, sem pin.
- **Reduced-motion:** o estado final.
- **Bola visível:** só uma em cada momento.

**Blocked by:** 22 (o quique na 1ª data usa o impacto novo)

**Status:** ready-for-agent

- [ ] Só uma bola visível antes, durante e depois do pin (Playwright)
- [ ] Bola parada na 1ª data no início do pin e na última no fim (Playwright)
- [ ] O traço chega à 1ª data e sai da última, sem cruzar texto
- [ ] Celular e reduced-motion
- [ ] Log da etapa em `processo/prompts/`
