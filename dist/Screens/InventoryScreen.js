"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas/Canvas");
var Player_1 = require("../Entity/Actor/Player");
var InventoryScreen = /** @class */ (function () {
    function InventoryScreen() {
        var _this = this;
        this.name = 'inventoryScreen';
        this.inputs = {
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
        this.renderPlayerInventory(ctx);
        Canvas_1.renderSpaceToContinue(ctx, canvasProps);
    };
    InventoryScreen.prototype.renderPlayerInventory = function (ctx) {
        var player = this.game.player;
        var padding = Canvas_1.fontOptions.fontSize * 2;
        var keyCode = 65;
        var i = 0;
        ctx.textAlign = Canvas_1.fontOptions.defaultFontAlignment;
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        for (var key in Player_1.InventoryItems) {
            player[Player_1.InventoryItems[key]].forEach(function (item) {
                ctx.fillText(String.fromCharCode(keyCode) + ") " + item.name, padding, Canvas_1.fontOptions.fontSize * i + padding);
                i++;
                keyCode++;
            });
        }
    };
    return InventoryScreen;
}());
exports["default"] = InventoryScreen;
