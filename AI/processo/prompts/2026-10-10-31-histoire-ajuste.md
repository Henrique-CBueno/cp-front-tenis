# Prompt 31 · ajuste da Histoire (ticket 23, segunda versão)

**Data:** 2026-10-10 · **Ferramenta:** Claude Code (Claude Opus 5.5)

## O que eu pedi (literal)
> nao gostei de como ficou a Histoire, gostava qde como era ante, so queria mudar que a bola chegasse ate la, e saisse de la, com seu rastro ficando para tras juto ao scroll lateral

## Perguntas da IA e minhas respostas
- **O que volta a ser como antes?** Só **1891 na esquerda** (o layout antigo). As datas que nascem como marcas e a espera na 1ª e na última data ficam.
- **O que deixa rastro?** **A chegada e os pulos** (recomendação da IA): o traço da chegada e um arco de giz a cada pulo, tudo correndo junto com a linha.
- **Por onde a bola sai depois de 2020?** **Um pouco mais de linha** (recomendação da IA): a linha continua um trecho depois de 2020, por onde a bola sai.

## O que a IA fez
- **Layout:** voltou ao de antes. 1891 fica à esquerda, embaixo do título, e a linha começa como era. No fim, a linha ganhou um trecho a mais (18% da tela) depois de 2020.
- **O rastro mora dentro da linha do tempo:**
  - a chegada (o traço desce pela direita do título e varre o vão até 1891) e os arcos dos pulos correm para a esquerda **junto com as datas** no scroll lateral;
  - cada arco tem a mesma parábola que a bola faz no pulo. Os arcos ficam desenhados depois que a bola passa, como as marcas.
- **Saída:** em 2020 a bola corre pelo trecho de linha a mais, passa à direita do texto, desce, e o traço segue até Les Légendes.
- **No celular:** a mesma ideia na linha vertical, com os arcos dos pulos ao lado da linha.
- **Testes:**
  - os 3 da Histoire continuam valendo e passam sem mudança: uma bola só, parada nas pontas, e o traço sem cruzar texto;
  - total: 50 E2E e 20 unitários.
- **Fluidez:** no trecho da Histoire, 60 fps a 4x de CPU.
- Evidências refeitas em `processo/evidencias/23/` (`desktop-sequencia.png`, `mobile-sequencia.png`).
