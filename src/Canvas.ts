interface CanvasProps {
  height: number,
  width: number
}

const clearCanvas = (ctx: CanvasRenderingContext2D, canvasProps: CanvasProps): void => {
  ctx.fillStyle = '#000000';
  ctx.rect(0, 0, canvasProps.width, canvasProps.height);
  ctx.fill();
}

export { CanvasProps, clearCanvas };