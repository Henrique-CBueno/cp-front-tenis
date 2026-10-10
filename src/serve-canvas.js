// Camada de desenho do saque: dimensiona o canvas ao box e ao DPR e desenha só quando o quadro muda.
export function createServeCanvas(canvas) {
  const context = canvas.getContext('2d');
  let current = null;
  let rect = null; // onde o quadro foi desenhado, em px CSS relativos ao canvas

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
    const x = (canvas.width - w) / 2;
    const y = canvas.height - h;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(frame, x, y, w, h);
    const css = canvas.clientWidth / canvas.width;
    rect = { x: x * css, y: y * css, width: w * css, height: h * css };
  }

  // Converte um ponto normalizado do quadro (0–1) em px relativos ao offsetParent do canvas.
  function pointAt([fx, fy]) {
    if (!rect) return null;
    return { x: canvas.offsetLeft + rect.x + fx * rect.width, y: canvas.offsetTop + rect.y + fy * rect.height };
  }

  new ResizeObserver(resize).observe(canvas);
  return { draw, pointAt };
}

export function loadImage(url) {
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
  return image.decode().then(() => image);
}
