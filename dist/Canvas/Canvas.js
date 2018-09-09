"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fontSize = 14;
const fontColor = '#ffffff';
const defaultFontAlignment = 'left';
const padding = 20;
exports.padding = padding;
const fontOptions = {
    fontSize,
    fontColor,
    defaultFontAlignment
};
exports.fontOptions = fontOptions;
const clearCanvas = (ctx, canvasProps) => {
    ctx.fillStyle = '#000000';
    ctx.rect(0, 0, canvasProps.width, canvasProps.height);
    ctx.fill();
};
exports.clearCanvas = clearCanvas;
const setupCanvas = (canvas, height, width) => {
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    // High DPI canvases
    const { devicePixelRatio } = window;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    const ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    // Set the global font style
    ctx.font = '16px Fira Mono';
    return ctx;
};
exports.setupCanvas = setupCanvas;
//# sourceMappingURL=Canvas.js.map