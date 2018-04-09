"use strict";
exports.__esModule = true;
var fontSize = 14;
var fontColor = '#ffffff';
var defaultFontAlignment = 'left';
var padding = 20;
var fontOptions = {
    fontSize: fontSize,
    fontColor: fontColor,
    defaultFontAlignment: defaultFontAlignment
};
exports.fontOptions = fontOptions;
var clearCanvas = function (ctx, canvasProps) {
    ctx.fillStyle = '#000000';
    ctx.rect(0, 0, canvasProps.width, canvasProps.height);
    ctx.fill();
};
exports.clearCanvas = clearCanvas;
var renderSpaceToContinue = function (ctx, canvasProps) {
    var message = 'Press [SPACE] to continue';
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(message, canvasProps.width / 2, canvasProps.height - padding);
    ctx.textAlign = fontOptions.defaultFontAlignment;
};
exports.renderSpaceToContinue = renderSpaceToContinue;
