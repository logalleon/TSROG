"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas/Canvas");
var InventoryScreen = /** @class */ (function () {
    function InventoryScreen() {
        var _this = this;
        this.name = 'inventoryScreen';
        this.inputs = {
            'A': {
                handler: function () {
                    console.log('Handled A');
                }
            },
            'Space': {
                handler: function () {
                    var mapScreen = _this.game.screens.filter(function (screen) { return screen.name === 'mapScreen'; })[0];
                    _this.game.activeScreen = mapScreen;
                }
            }
        };
    }
    InventoryScreen.prototype.setGame = function (game) {
        this.game = game;
    };
    InventoryScreen.prototype.handleInput = function (keyValue) {
        console.log(keyValue);
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler();
        }
    };
    ;
    InventoryScreen.prototype.render = function (ctx) {
        var canvasProps = this.game.canvasProps;
        Canvas_1.clearCanvas(ctx, canvasProps);
        ctx.textAlign = Canvas_1.fontOptions.defaultFontAlignment;
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        var text = 'This is the inventory screen.';
        ctx.fillText(text, 10, 30);
        Canvas_1.renderSpaceToContinue(ctx, canvasProps);
    };
    return InventoryScreen;
}());
exports["default"] = InventoryScreen;
