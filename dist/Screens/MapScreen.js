"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas");
var MapScreen = /** @class */ (function () {
    function MapScreen() {
        this.inputs = {
            'I': {
                handler: function () {
                }
            }
        };
    }
    MapScreen.prototype.setGame = function (game) {
        this.game = game;
    };
    MapScreen.prototype.handleInput = function (keyValue) {
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler();
        }
    };
    ;
    MapScreen.prototype.render = function (ctx) {
        Canvas_1.clearCanvas(ctx, this.game.canvasProps);
        ctx.fillStyle = '#ffffff';
        var text = 'This is the main map screen.';
        ctx.fillText(text, 10, 10);
    };
    return MapScreen;
}());
exports["default"] = MapScreen;
