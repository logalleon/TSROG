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
var MapScreen_1 = require("./MapScreen");
var CommandScreen = /** @class */ (function (_super) {
    __extends(CommandScreen, _super);
    function CommandScreen() {
        var _this = _super.call(this) || this;
        _this.name = Screen_1.ScreenNames.COMMANDS;
        return _this;
    }
    CommandScreen.prototype.render = function (ctx) {
        var canvasProps = this.game.canvasProps;
        Canvas_1.clearCanvas(ctx, canvasProps);
        this.renderTitle(ctx);
        this.renderMovement(ctx);
        Canvas_1.renderSpaceToContinue(ctx, canvasProps);
    };
    CommandScreen.prototype.renderTitle = function (ctx) {
        var title = "" + this.name[0].toUpperCase() + this.name.slice(1);
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        ctx.textAlign = 'center';
        ctx.fillText(title, this.game.canvasProps.width / 2, Canvas_1.padding);
    };
    CommandScreen.prototype.renderMovement = function (ctx) {
        ctx.textAlign = 'center';
        var text = MapScreen_1.MapScreenInputs.MOVE_UP_LEFT + " " + MapScreen_1.MapScreenInputs.MOVE_UP + " " + MapScreen_1.MapScreenInputs.MOVE_UP_RIGHT;
        ctx.fillText(text, Canvas_1.padding * 2.5, Canvas_1.padding);
        text = "\\|/\n";
        ctx.fillText(text, Canvas_1.padding * 2.5, Canvas_1.padding + Canvas_1.fontOptions.fontSize * 1.5);
        text = MapScreen_1.MapScreenInputs.MOVE_LEFT + "- -" + MapScreen_1.MapScreenInputs.MOVE_RIGHT;
        ctx.fillText(text, Canvas_1.padding * 2.5, Canvas_1.padding + Canvas_1.fontOptions.fontSize * 2.5);
        text = "/|\\";
        ctx.fillText(text, Canvas_1.padding * 2.5, Canvas_1.padding + Canvas_1.fontOptions.fontSize * 3.5);
        text = MapScreen_1.MapScreenInputs.MOVE_DOWN_LEFT + " " + MapScreen_1.MapScreenInputs.MOVE_DOWN + " " + MapScreen_1.MapScreenInputs.MOVE_DOWN_RIGHT;
        ctx.fillText(text, Canvas_1.padding * 2.5, Canvas_1.padding + Canvas_1.fontOptions.fontSize * 4.5);
    };
    CommandScreen.prototype.renderPlayerInventory = function (ctx) {
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
    return CommandScreen;
}(Screen_1.Screen));
exports["default"] = CommandScreen;
