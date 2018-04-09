"use strict";
exports.__esModule = true;
var InventoryScreen = /** @class */ (function () {
    function InventoryScreen() {
        this.inputs = {
            'A': {
                handler: function () {
                    console.log('Handled A');
                }
            }
        };
    }
    InventoryScreen.prototype.setGame = function (game) {
        this.game = game;
    };
    InventoryScreen.prototype.handleInput = function (keyValue) {
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler();
        }
    };
    ;
    InventoryScreen.prototype.render = function (ctx) {
    };
    return InventoryScreen;
}());
exports["default"] = InventoryScreen;
