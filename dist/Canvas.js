"use strict";
exports.__esModule = true;
var clearCanvas = function (ctx, canvasProps) {
    ctx.fillStyle = '#000000';
    ctx.rect(0, 0, canvasProps.width, canvasProps.height);
    ctx.fill();
};
exports.clearCanvas = clearCanvas;
