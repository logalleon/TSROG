"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas");
var MapScreen = /** @class */ (function () {
    function MapScreen() {
        var _this = this;
        this.name = 'mapScreen';
        this.inputs = {
            'I': {
                handler: function () {
                    var inventoryScreen = _this.game.screens[1];
                    console.log(inventoryScreen);
                    console.log(_this.game);
                    _this.game.activeScreen = inventoryScreen;
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
        var _a = this.game, gameMap = _a.gameMap, canvasProps = _a.canvasProps;
        var tiles = gameMap.tiles;
        Canvas_1.clearCanvas(ctx, canvasProps);
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        var text = 'This is the main map screen.';
        ctx.fillText(text, 10, 30);
        this.renderTiles(tiles, ctx, canvasProps);
    };
    MapScreen.prototype.renderTiles = function (tiles, ctx, canvasProps) {
        var fontColor = Canvas_1.fontOptions.fontColor, fontSize = Canvas_1.fontOptions.fontSize;
        var width = canvasProps.width;
        var padding = fontSize * 3;
        ctx.fillStyle = fontColor;
        ctx.textAlign = 'center';
        for (var row = 0; row < tiles.length; row++) {
            var chars = [];
            for (var col = 0; col < tiles[row].length; col++) {
                var char = (tiles[row][col].isOccupied ?
                    tiles[row][col].o : tiles[row][col]).char;
                chars.push(char);
            }
            ctx.fillText(chars.join(''), width / 2, (row * fontSize) + padding);
        }
    };
    return MapScreen;
}());
exports["default"] = MapScreen;
