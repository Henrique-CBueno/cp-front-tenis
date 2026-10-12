# Spec rodada 3: uma bola só, o quique de verdade e Sous la Terre

Status: ready-for-agent

> Fontes: `processo/03-grilling-rodada-3.md` (decisões Q1–Q15), `CONTEXT.md` (glossário), `DESIGN.md` (sistema La Trace depois da rodada 2).

## Problem Statement

A bola é a protagonista da página, mas falha em três momentos:
- **Na Histoire ela some.** A bola do rali passa por trás da seção, o traço se interrompe, e uma outra bola aparece parada na 1ª data e só começa a pular quando a linha do tempo anda. Parece um truque, não a mesma bola.
- **As marcas dos quiques não convencem.** Elas começam a aparecer antes de a bola chegar, crescem devagar e se desfazem ao rolar para cima. Não parece um pingo, e a marca não fica.
- **As camadas da quadra parecem uma tabela de fotos de banco de imagens.** São faixas finas, fora de escala, com rótulos, e o material real fica pequeno demais para impressionar.

## Solution

- **Uma bola só na Histoire.**
  - O traço segue até a 1ª data. A bola quica ali e espera enquanto a seção prende.
  - No scroll lateral, ela pula de data em data, sem traço: a linha do tempo é o caminho.
  - Na última data, espera o fim, sai num arco e o traço continua pela página.
  - No celular é igual, na linha vertical.
- **Quique de verdade.**
  - No instante do toque, a marca nasce de uma vez, com um tranco: estica e assenta, e solta pó.
  - A bola achata e hesita um instante.
  - Depois, a marca escurece e afunda devagar no saibro.
  - A marca **fica**, também ao rolar para cima. Vale para todos os quiques e para as Marcas de capítulo 01–04.
- **Sous la Terre.** Uma cena presa nova, logo depois de Terre Battue.
  - A bola quica na superfície e a câmera **cava**: as cinco camadas sobem pela tela, uma por tela, com a textura real grande e parallax.
  - Cada camada mostra o nome, a espessura e o que ela faz, com fonte.
  - Um medidor conta a profundidade real, de 0 a 80 cm.
  - No fundo, a câmera se afasta e mostra o **corte** inteiro em escala real, com a marca lá em cima.
  - Depois a seção solta e o rali segue.

## User Stories

### Histoire
1. Como fã, quero ver a bola chegar desenhando o traço até a primeira data, para entender que é a mesma bola do saque.
2. Como fã, quero que a bola espere na primeira data enquanto a linha do tempo ainda não começou a andar.
3. Como fã, quero que a bola pule de data em data enquanto a linha do tempo corre, para que cada data seja um quique.
4. Como fã, quero que a bola espere na última data e depois saia num arco, voltando a desenhar o traço pela página.
5. Como fã no celular, quero a mesma passagem na linha do tempo vertical.
6. Como fã, quero ver uma bola só em cada momento, nunca duas.
7. Como visitante com reduced-motion, quero o estado final: o traço até a 1ª data, a bola na última e o traço saindo dela.

### Quique
8. Como fã, quero que a marca apareça só quando a bola toca o saibro, para sentir o pingo.
9. Como fã, quero um tranco no toque (a marca estica e assenta, o pó salta, a bola achata), para que o quique tenha peso.
10. Como fã, quero que a bola hesite um instante no toque, como uma bola de verdade perdendo velocidade.
11. Como fã, quero que a marca escureça e afunde devagar depois do toque, como o saibro assentando.
12. Como fã, quero que as marcas continuem lá quando eu rolo para cima ("todo saque deixa uma marca").
13. Como fã, quero que as Marcas 01–04 nasçam com o mesmo impacto, para a página falar uma língua só.
14. Como visitante com reduced-motion, quero todas as marcas já feitas.

### Sous la Terre
15. Como fã, quero uma cena logo depois de Terre Battue que me leve para debaixo do saibro.
16. Como fã, quero ver a bola quicar na superfície e a câmera descer sem ela.
17. Como fã, quero cavar com o scroll, camada por camada, cada uma ocupando a tela com a textura real grande.
18. Como fã, quero que a passagem entre as camadas seja contínua, com a fronteira subindo pela tela.
19. Como fã, quero ler, em cada camada, o nome, a espessura e para que ela serve.
20. Como fã, quero um medidor de profundidade que conte de 0 a 80 cm, para sentir a profundidade real.
21. Como fã, quero que, no fundo, a câmera se afaste e mostre o corte inteiro em escala real, com a marca no topo.
22. Como fã no celular, quero a mesma escavação em tela cheia.
23. Como visitante com reduced-motion, quero as camadas empilhadas com os textos e o corte, sem a seção presa.
24. Como fotógrafo, quero meu crédito e a licença no rodapé.
25. Como leitor curioso, quero a fonte de cada função de camada.

### Processo
26. Como aluno, quero cada etapa registrada (prompt, decisões, correções) e uma revisão final com veredito.

## Implementation Decisions

- **Histoire:**
  - a seção continua presa e opaca;
  - a entrada e a saída do traço são desenhadas **dentro** da seção, porque o desenho do rali corre por trás da seção presa e se descolaria da data;
  - o traço do rali termina na borda de cima da Histoire e recomeça logo abaixo do fim da seção presa;
  - a bola visível passa de um desenho para o outro no ponto exato de pouso (a 1ª data) e de saída (a última), então só uma bola aparece;
  - o quique entre as datas reaproveita a lógica atual.
- **Quique:**
  - cada marca guarda o próprio estado (feita ou não);
  - o impacto dispara quando a ponta do traço cruza o contato, descendo;
  - é uma animação curta e independente do scroll (tranco e pó), seguida de um afundar lento (escurece);
  - a bola acentua o achatamento e a inércia diminui por um instante;
  - nada se desfaz ao subir.
- **Sous la Terre:**
  - seção nova, presa e opaca, logo depois de Terre Battue; a figura das camadas sai de Terre Battue;
  - um módulo puro, o **Medidor**, converte o progresso da escavação em profundidade real: um mapa por trechos com tempo igual por camada (0 → 2 mm → 7 cm → 15 cm → 45 cm → 80 cm);
  - texturas em tela cheia recortadas dos originais com licença, com procedência e créditos;
  - as funções das camadas são pesquisadas com fonte;
  - no fim, as alturas passam para a escala real e o conjunto se afasta;
  - o rali faz um quique no topo da cena e passa por trás dela.
- **Vocabulário** do glossário `CONTEXT.md`: bola, traço, quique, marca, respiro, faixa da bola, cena presa, escavação, camada, corte.

## Testing Decisions

- **Testamos o comportamento visível**, não a implementação.
- **Unidade (Vitest):** o Medidor:
  - profundidade 0 no começo e 80 cm no fim;
  - sempre crescente;
  - as fronteiras entre camadas em progressos iguais;
  - o valor exato em cada fronteira.
- **Página (Playwright):**
  - nenhuma marca de quique está feita antes de a bola passar, e todas continuam feitas depois de rolar para cima;
  - na Histoire, só uma bola visível em cada momento (antes, durante e depois do pin);
  - a bola parada na 1ª data no começo do pin e na última no fim;
  - Sous la Terre: o medidor chega a 80 cm, a camada certa aparece em cada trecho e o fim mostra o corte;
  - reduced-motion sem pin e tudo no estado final;
  - os testes antigos continuam valendo (o traço nunca cruza texto, nada passa da borda).
- **Evidências:** screenshots 1440 e 390 por ticket, fluidez com CPU 4x, detector e procedência.

## Out of Scope

- Som do quique.
- WebGL / 3D de verdade nas camadas.
- Mudar o trajeto do rali fora da Histoire e de Sous la Terre.
- A faixa da bola no celular (aceita como limitação na rodada 2).

## Further Notes

- **Risco: mais uma cena presa.** A página já tem o saque, a Histoire e o Face-à-face presos. Sous la Terre fica entre Terre Battue e a Histoire, então são duas cenas presas seguidas, com só um respiro entre elas. Se o ritmo cansar, a revisão final decide.
- **Risco: a escala real do corte.** O tijolo tem 1–2 mm em 80 cm: no corte em escala ele vira um fio. Isso é proposital (é o "1–2 mm de tudo o que a bola toca"), mas precisa de rótulo legível.
