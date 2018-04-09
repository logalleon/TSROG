interface CanvasProps {
  height: number,
  width: number
}

const fontSize = 14;
const fontColor = '#ffffff';
const defaultFontAlignment = 'left';
const padding: number = 20;

interface FontOptions {
  fontSize: number,
  fontColor: string,
  defaultFontAlignment: string
}

const fontOptions: FontOptions = {
  fontSize,
  fontColor,
  defaultFontAlignment
}

const clearCanvas = (ctx: CanvasRenderingContext2D, canvasProps: CanvasProps): void => {
  ctx.fillStyle = '#000000';
  ctx.rect(0, 0, canvasProps.width, canvasProps.height);
  ctx.fill();
}

const renderSpaceToContinue = (ctx: CanvasRenderingContext2D, canvasProps: CanvasProps): void => {
  const message = 'Press [SPACE] to continue'
  ctx.fillStyle = fontOptions.fontColor;
  ctx.textAlign = 'center';
  ctx.fillText(message, canvasProps.width / 2, canvasProps.height - padding);
  ctx.textAlign = fontOptions.defaultFontAlignment;
}

export { CanvasProps, clearCanvas, renderSpaceToContinue, fontOptions };