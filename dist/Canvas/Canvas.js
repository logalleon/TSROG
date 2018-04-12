"use strict";
exports.__esModule = true;
var fontSize = 14;
var fontColor = '#ffffff';
var defaultFontAlignment = 'left';
var padding = 20;
exports.padding = padding;
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
var setupCanvas = function (canvas, height, width) {
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    // High DPI canvases
    var devicePixelRatio = window.devicePixelRatio;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    var ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    // Set the global font style
    ctx.font = '16px Fira Mono';
    return ctx;
};
exports.setupCanvas = setupCanvas;
