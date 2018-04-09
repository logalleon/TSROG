"use strict";
exports.__esModule = true;
var Input_1 = require("./Input");
var Game = /** @class */ (function () {
    function Game(gameMap, screens, canvasProps, ctx) {
        console.log(gameMap, 'here');
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
    Game.prototype.updatePlayerPos = function (player) {
        var tiles = this.gameMap.tiles;
        var posX = player.posX, posY = player.posY;
        var row = tiles[posY];
        var item = row[posX];
        item.o = player;
        item.isOccupied = true;
        this.gameMap.tiles = tiles;
    };
    return Game;
}());
exports["default"] = Game;
