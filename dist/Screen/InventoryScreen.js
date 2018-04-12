"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Screen_1 = require("./Screen");
var Canvas_1 = require("../Canvas/Canvas");
var Player_1 = require("../Entity/Actor/Player");
var InventoryScreen = /** @class */ (function (_super) {
    __extends(InventoryScreen, _super);
    function InventoryScreen() {
        var _this = _super.call(this) || this;
        _this.name = Screen_1.ScreenNames.INVENTORY;
        return _this;
    }
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
}(Screen_1.Screen));
exports["default"] = InventoryScreen;
