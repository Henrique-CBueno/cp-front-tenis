// Camada de desenho do saque: dimensiona o canvas ao box e ao DPR e desenha só quando o quadro muda.
export function createServeCanvas(canvas) {
  const context = canvas.getContext('2d');
  let current = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const frame = current;
    current = null;
    draw(frame);
  }

  // "contain" ancorado embaixo: o jogador recortado inteiro, apoiado na linha de base.
  function draw(frame) {
    if (!frame || frame === current) return;
    current = frame;
    const scale = Math.min(canvas.width / frame.naturalWidth, canvas.height / frame.naturalHeight);
    const w = frame.naturalWidth * scale;
    const h = frame.naturalHeight * scale;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(frame, (canvas.width - w) / 2, canvas.height - h, w, h);
  }

  new ResizeObserver(resize).observe(canvas);
  return { draw };
}

export function loadImage(url) {
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
  return image.decode().then(() => image);
}
