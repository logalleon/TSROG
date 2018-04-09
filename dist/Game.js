"use strict";
exports.__esModule = true;
var Input_1 = require("./Input");
var Game = /** @class */ (function () {
    function Game(map, screens, canvasProps, ctx) {
        this.screens = screens;
        this.activeScreen = screens[0];
        this.canvasProps = canvasProps;
        this.keyMap = {};
        this.ctx = ctx;
        window.onkeydown = this.handleInput.bind(this);
        window.onkeyup = this.handleInput.bind(this);
    }
    Game.prototype.handleInput = function (e) {
        var keyCode = e.keyCode, type = e.type;
        this.keyMap[keyCode] = type === 'keydown';
        if (type === 'keydown') {
            var char = Input_1.mapKeyPressToActualCharacter(Boolean(this.keyMap[Input_1.keyCharToCode['Shift']]), keyCode);
            this.activeScreen.handleInput(char);
        }
    };
    return Game;
}());
exports["default"] = Game;
