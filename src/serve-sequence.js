function chooseSet(manifest, viewport) {
  if (viewport.reducedMotion) return 'static';
  return viewport.width <= manifest.mobileMaxWidth ? 'mobile' : 'desktop';
}

// Primeiro quadro, depois quadros-chave espaçados (o saque já "existe" grosseiramente), depois o resto.
function preloadOrder(count, keyframeEvery) {
  const keyframes = [];
  for (let i = 0; i < count; i += keyframeEvery) keyframes.push(i);
  const rest = [];
  for (let i = 0; i < count; i++) if (i % keyframeEvery !== 0) rest.push(i);
  return [...keyframes, ...rest];
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
    preload() {
      for (const index of preloadOrder(urls.length, manifest.keyframeEvery)) {
        loader(urls[index]).then(
          (image) => (loaded[index] = image),
          () => {}, // um quadro perdido é coberto pelo vizinho carregado
        );
      }
    },
    frameAt(progress) {
      const clamped = Math.min(1, Math.max(0, progress));
      return nearestLoaded(Math.round(clamped * (urls.length - 1)));
    },
  };
}
