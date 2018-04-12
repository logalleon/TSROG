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
var InventoryItemScreen = /** @class */ (function (_super) {
    __extends(InventoryItemScreen, _super);
    function InventoryItemScreen(name, item) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.item = item;
        return _this;
    }
    InventoryItemScreen.prototype.render = function (ctx) {
        var canvasProps = this.game.canvasProps;
        Canvas_1.clearCanvas(ctx, canvasProps);
        this.renderTitle(ctx);
        this.renderInventoryItems(ctx);
        Canvas_1.renderSpaceToContinue(ctx, canvasProps);
    };
    InventoryItemScreen.prototype.renderTitle = function (ctx) {
        var title = "" + this.item[0].toUpperCase() + this.item.slice(1);
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        ctx.textAlign = 'center';
        ctx.fillText(title, this.game.canvasProps.width / 2, Canvas_1.padding);
    };
    InventoryItemScreen.prototype.renderInventoryItems = function (ctx) {
        var player = this.game.player;
        var padding = Canvas_1.fontOptions.fontSize * 2;
        var keyCode = 65;
        var i = 0;
        ctx.textAlign = Canvas_1.fontOptions.defaultFontAlignment;
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        console.log(player);
        console.log(this.item);
        player[this.item].forEach(function (item) {
            ctx.fillText(String.fromCharCode(keyCode) + ") " + item.name, padding, Canvas_1.fontOptions.fontSize * i + padding);
            i++;
            keyCode++;
        });
    };
    return InventoryItemScreen;
}(Screen_1.Screen));
exports["default"] = InventoryItemScreen;
