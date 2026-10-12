import { describe, it, expect } from 'vitest';
import { createMurRules } from './le-mur-rules.js';

const court = { width: 800, height: 600 };

// avança o tempo em passos de 1/60 s até o predicado valer (ou estourar o limite), juntando os eventos
function run(rules, until = () => false, seconds = 10) {
  const events = [];
  for (let t = 0; t < seconds; t += 1 / 60) {
    events.push(...rules.step(1 / 60));
    if (until(events)) break;
  }
  return events;
}
const types = (events) => events.map((e) => e.type);
// espera a bola descer (uma rebatida só vale com ela caindo)
const falling = (rules) => run(rules, () => rules.state().vh < 0, 3);

describe('Le Mur: parado', () => {
  it('começa parado, no meio da quadra, quicando sem contar erro', () => {
    const rules = createMurRules(court);
    expect(rules.state()).toMatchObject({ phase: 'idle', x: 400, score: 0, errors: 0 });
    const events = run(rules, () => false, 5);
    expect(types(events)).toContain('bounce');
    expect(types(events)).not.toContain('error');
    expect(events.every((e) => e.type !== 'bounce' || !e.valid)).toBe(true);
  });

  it('a primeira rebatida começa a partida e conta 1', () => {
    const rules = createMurRules(court);
    falling(rules);
    expect(rules.hit()).toBe(true);
    expect(rules.state()).toMatchObject({ phase: 'playing', score: 1 });
  });

  it('uma rebatida com a bola subindo não vale', () => {
    const rules = createMurRules(court);
    run(rules, () => rules.state().vh > 0, 3);
    expect(rules.hit()).toBe(false);
    expect(rules.state().score).toBe(0);
  });

  it('a rebatida limpa (quality 1) sobe mais que a de raspão (quality 0)', () => {
    const apex = (quality) => {
      const rules = createMurRules(court);
      falling(rules);
      rules.hit({ quality });
      let top = 0;
      run(rules, () => {
        top = Math.max(top, rules.state().h);
        return rules.state().vh < 0;
      });
      return top;
    };
    expect(apex(1)).toBeGreaterThan(apex(0) * 1.2);
  });

  it('a bola só fica ao alcance descendo e no terço de baixo', () => {
    const rules = createMurRules(court);
    falling(rules);
    rules.hit();
    expect(rules.reachable()).toBe(false); // subindo
    run(rules, () => rules.state().vh < 0);
    expect(rules.reachable()).toBe(false); // no alto
    run(rules, () => rules.state().h < 600 * 0.3);
    expect(rules.reachable()).toBe(true);
  });
});

describe('Le Mur: a regra do tênis', () => {
  it('depois da rebatida, o primeiro quique vale e deixa marca; o segundo é erro', () => {
    const rules = createMurRules(court);
    falling(rules);
    rules.hit();
    const events = run(rules, (ev) => types(ev).includes('error'));
    const bounces = events.filter((e) => e.type === 'bounce');
    expect(bounces).toHaveLength(1);
    expect(bounces[0].valid).toBe(true);
    expect(types(events).at(-1)).toBe('error');
    expect(rules.state()).toMatchObject({ phase: 'waiting', errors: 1, score: 1 });
  });

  it('a bola fora pela lateral é erro', () => {
    const rules = createMurRules(court);
    falling(rules);
    rules.hit({ aim: 1 });
    const events = run(rules, (ev) => types(ev).includes('error'));
    // pode quicar uma vez antes de sair: o erro é a saída, não o segundo quique
    expect(events.at(-1)).toMatchObject({ type: 'error', reason: 'out' });
  });

  it('depois de um erro, a bola volta ao meio e espera a rebatida, sem contar mais erros', () => {
    const rules = createMurRules(court);
    falling(rules);
    rules.hit();
    run(rules, (ev) => types(ev).includes('error'));
    expect(rules.state().x).toBe(400);
    expect(types(run(rules, () => false, 5))).not.toContain('error');
    falling(rules);
    rules.hit();
    expect(rules.state()).toMatchObject({ phase: 'playing', score: 2, errors: 1 });
  });

  it('o terceiro erro encerra a partida com o total de rebatidas e atualiza o recorde', () => {
    const rules = createMurRules(court);
    let over = [];
    for (let i = 0; i < 3; i++) {
      falling(rules);
      rules.hit();
      over = run(rules, (ev) => types(ev).includes('error'));
    }
    expect(types(over)).toEqual(expect.arrayContaining(['error', 'over']));
    expect(rules.state()).toMatchObject({ phase: 'over', score: 3, errors: 3, best: 3 });
  });

  it('rebater depois do fim começa outra partida do zero', () => {
    const rules = createMurRules(court);
    for (let i = 0; i < 3; i++) {
      falling(rules);
      rules.hit();
      run(rules, (ev) => types(ev).includes('error'));
    }
    falling(rules);
    rules.hit();
    expect(rules.state()).toMatchObject({ phase: 'playing', score: 1, errors: 0, best: 3 });
  });

  it('o recorde só sobe', () => {
    const rules = createMurRules({ ...court, best: 10 });
    for (let i = 0; i < 3; i++) {
      falling(rules);
      rules.hit();
      run(rules, (ev) => types(ev).includes('error'));
    }
    expect(rules.state()).toMatchObject({ phase: 'over', score: 3, best: 10 });
  });
});

// o pico e o desvio lateral de uma rebatida
function flight(hit, rules = createMurRules(court)) {
  falling(rules);
  const x0 = rules.state().x;
  rules.hit(hit);
  let top = 0;
  run(rules, () => {
    top = Math.max(top, rules.state().h);
    return rules.state().vh < 0;
  });
  return { top, drift: rules.state().x - x0 };
}

describe('Le Mur: o contato e a dificuldade', () => {
  it('o centro das cordas manda alto e reto; a borda, baixo e para o lado dela', () => {
    const center = flight({ quality: 1, side: 1 });
    const edge = flight({ quality: 0, side: 1 });
    const left = flight({ quality: 0, side: -1 });
    expect(center.top).toBeGreaterThan(edge.top * 1.2);
    expect(Math.abs(center.drift)).toBeLessThan(1);
    expect(edge.drift).toBeGreaterThan(40);
    expect(left.drift).toBeLessThan(-40);
  });

  it('a força do gesto muda a velocidade: parado é fraco, subindo é forte', () => {
    const still = flight({ power: 0 });
    const strong = flight({ power: 1 });
    expect(strong.top).toBeGreaterThan(still.top * 1.4);
  });

  it('a dificuldade sobe a cada 5 rebatidas, e não antes', () => {
    const rules = createMurRules(court);
    const levels = [];
    for (let i = 0; i < 10; i++) {
      falling(rules);
      rules.hit();
      levels.push(rules.state().level);
    }
    expect(levels).toEqual([0, 0, 0, 0, 1, 1, 1, 1, 1, 2]);
  });

  it('num nível acima, a bola sobe a mesma altura em menos tempo (cai mais rápido)', () => {
    // o tempo da rebatida até o pico: depende só da gravidade e da altura do pico
    const rise = (rules) => {
      falling(rules);
      rules.hit();
      let t = 0;
      run(rules, () => {
        t += 1 / 60;
        return rules.state().vh < 0;
      });
      return t;
    };
    const easy = createMurRules(court);
    const hard = createMurRules(court);
    for (let i = 0; i < 4; i++) rise(hard); // a 5ª rebatida já é no nível 1
    expect(rise(hard)).toBeLessThan(rise(easy) - 2 / 60);
  });
});
