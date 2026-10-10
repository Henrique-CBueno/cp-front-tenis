# 24: Sous la Terre (a escavação)

**What to build:** uma cena presa e opaca, logo depois de Terre Battue (a figura das camadas sai de lá).
- **A escavação:**
  - a bola quica na superfície e a câmera desce sem ela;
  - o scroll cava as cinco camadas em descida contínua, uma por tela, com a textura real em tela cheia e parallax;
  - cada camada mostra o nome, a espessura e a função (com fonte).
- **O medidor:** conta a profundidade real de 0 a 80 cm, com tempo igual por camada.
- **O fim:** a câmera se afasta e mostra o corte inteiro em escala real, com a marca no topo. Depois a seção solta e o rali segue.
- **Celular:** igual.
- **Reduced-motion:** as camadas empilhadas, sem pin.

**Blocked by:** 22 (o quique na superfície)

**Status:** ready-for-agent

- [ ] O módulo do Medidor com testes Vitest (0 e 80 nas pontas, sempre crescente, fronteiras em progressos iguais)
- [ ] Texturas em tela cheia recortadas dos originais, com procedência e créditos
- [ ] A função de cada camada pesquisada, com fonte em `processo/pesquisa/` e no rodapé
- [ ] Playwright: o medidor chega a 80 cm; o fim mostra o corte; reduced-motion sem pin
- [ ] Sem transbordamento; o traço do rali não cruza texto
- [ ] Log da etapa em `processo/prompts/`
