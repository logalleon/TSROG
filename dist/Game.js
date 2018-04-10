"use strict";
exports.__esModule = true;
var Input_1 = require("./Input");
var Game = /** @class */ (function () {
    function Game(gameMap, screens, canvasProps, ctx, player) {
        this.player = player;
        this.gameMap = gameMap;
        this.screens = screens;
        this.activeScreen = screens[0];
        this.canvasProps = canvasProps;
        this.keyMap = {};
        this.ctx = ctx;
        window.onkeydown = this.handleInput.bind(this);
        window.onkeyup = this.handleInput.bind(this);
    }
    Game.prototype.handleInput = function (e) {
        e.preventDefault();
        var keyCode = e.keyCode, type = e.type;
        this.keyMap[keyCode] = type === 'keydown';
        if (type === 'keydown') {
            var char = Input_1.mapKeyPressToActualCharacter(Boolean(this.keyMap[Input_1.keyCharToCode['Shift']]), keyCode);
            // Not an uppercase-able character returns and empty string
            char = char.trim();
            if (!char) {
                char = Input_1.keyCodeToChar[keyCode];
            }
            this.activeScreen.handleInput(char);
            this.activeScreen.render(this.ctx);
        }
    };
    Game.prototype.updatePlayerPos = function (player, nextPos) {
        var tiles = this.gameMap.tiles;
        var _a = player.pos, x = _a.x, y = _a.y;
        var nextX = nextPos.x, nextY = nextPos.y;
        var row = tiles[y];
        var item = row[x];
        item.o = null;
        item.isOccupied = false;
        row = tiles[nextY];
        item = row[nextX];
        item.o = player;
        item.isOccupied = true;
        player.pos = nextPos;
    };
    return Game;
}());
exports["default"] = Game;
