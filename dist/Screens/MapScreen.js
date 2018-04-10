"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas");
var Vector_1 = require("../Vector");
var MapScreen = /** @class */ (function () {
    function MapScreen() {
        var _this = this;
        this.name = 'mapScreen';
        this.inputs = {
            'I': {
                handler: function () {
                    var inventoryScreen = _this.game.screens[1];
                    _this.game.activeScreen = inventoryScreen;
                }
            },
            'w': { handler: this.attemptMovement.bind(this) },
            'a': { handler: this.attemptMovement.bind(this) },
            's': { handler: this.attemptMovement.bind(this) },
            'd': { handler: this.attemptMovement.bind(this) },
            'q': { handler: this.attemptMovement.bind(this) },
            'e': { handler: this.attemptMovement.bind(this) },
            'z': { handler: this.attemptMovement.bind(this) },
            'c': { handler: this.attemptMovement.bind(this) }
        };
    }
    MapScreen.prototype.setGame = function (game) {
        this.game = game;
    };
    MapScreen.prototype.handleInput = function (keyValue) {
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler(keyValue);
        }
    };
    ;
    MapScreen.prototype.render = function (ctx) {
        var _a = this.game, gameMap = _a.gameMap, canvasProps = _a.canvasProps;
        var tiles = gameMap.tiles;
        Canvas_1.clearCanvas(ctx, canvasProps);
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        ctx.textAlign = Canvas_1.fontOptions.defaultFontAlignment;
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
    MapScreen.prototype.attemptMovement = function (keyValue) {
        var _a = this.game, player = _a.player, gameMap = _a.gameMap;
        var pos = player.pos;
        var tiles = gameMap.tiles;
        var nextPos;
        switch (keyValue) {
            case 'w':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](0, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'a':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, 0));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 's':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](0, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'd':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, 0));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'q':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'e':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'z':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'c':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
        }
    };
    return MapScreen;
}());
exports["default"] = MapScreen;
