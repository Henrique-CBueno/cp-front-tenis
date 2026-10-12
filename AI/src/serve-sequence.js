function chooseSet(manifest, viewport) {
  if (viewport.reducedMotion) return 'static';
  return viewport.width <= manifest.mobileMaxWidth ? 'mobile' : 'desktop';
}

// Os quadros-chave (o primeiro incluso) e o resto, para carregar em duas levas.
function splitKeyframes(count, keyframeEvery) {
  const keyframes = [];
  const rest = [];
  for (let i = 0; i < count; i++) (i % keyframeEvery === 0 ? keyframes : rest).push(i);
  return { keyframes, rest };
}

export function createServeSequence({ manifest, loader, viewport }) {
  const set = chooseSet(manifest, viewport);
  const urls = manifest.sets[set];
  const loaded = new Array(urls.length).fill(null);

  function nearestLoaded(target) {
    for (let distance = 0; distance < urls.length; distance++) {
      if (loaded[target - distance]) return loaded[target - distance];
      if (loaded[target + distance]) return loaded[target + distance];
    }
    return null;
  }

  return {
    set,
    // Primeiro os quadros-chave (o saque já "existe" grosseiramente): a promessa resolve quando eles terminam.
    // Depois, o resto, poucos de cada vez, para não entupir a rede e o decode de uma vez só.
    preload({ onProgress = () => {}, concurrency = 4 } = {}) {
      const { keyframes, rest } = splitKeyframes(urls.length, manifest.keyframeEvery);
      const load = (index) =>
        loader(urls[index]).then(
          (image) => (loaded[index] = image),
          () => {}, // um quadro perdido é coberto pelo vizinho carregado
        );

      let settled = 0;
      const ready = Promise.all(
        keyframes.map((index) => load(index).then(() => onProgress(++settled / keyframes.length))),
      );

      const queue = [...rest];
      const next = () => queue.length && load(queue.shift()).then(next);
      ready.then(() => {
        for (let i = 0; i < concurrency; i++) next();
      });
      return ready;
    },
    frameAt(progress) {
      const clamped = Math.min(1, Math.max(0, progress));
      return nearestLoaded(Math.round(clamped * (urls.length - 1)));
    },
  };
}
