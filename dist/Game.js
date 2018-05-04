"use strict";
exports.__esModule = true;
var Input_1 = require("./Input");
var Message_1 = require("./Message/Message");
var Game = /** @class */ (function () {
    function Game(gameMap, screens, canvasProps, ctx, player, el) {
        this.player = player;
        this.gameMap = gameMap;
        this.screens = screens;
        this.activeScreen = screens[0];
        this.canvasProps = canvasProps;
        this.keyMap = {};
        this.ctx = ctx;
        this.messenger = new Message_1.Messenger(el);
        window.onkeydown = this.handleInput.bind(this);
        window.onkeyup = this.handleInput.bind(this);
    }
    /**
     * Effectively, this is the game loop. Since everything is turn-based,
     * the browser window waits for input and then responds accordingly.
     * Sometimes the screen is changed, sometimes enemies move: it all
     * depends on what the key input is from the user.
     * @param e - event
     */
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
            // Handle the player input first. The player gets priority for everything
            this.messenger.logMessages(this.activeScreen.handleInput(char));
            /*
            if (this.player.hasMoveInteracted && this.activeEnemies.length) {
              this.messenger.logMessages(this.activeEnemies.forEach(enemy => enemy.act());
            }
            this.messenger.logMessages(this.player.update());
            // some kill check in update
            */
            // Finally, render what's changed
            this.activeScreen.render(this.ctx);
        }
    };
    Game.prototype.updatePlayerPos = function (player, nextPos) {
        var tiles = this.gameMap.tiles;
        var _a = player.pos, x = _a.x, y = _a.y;
        var nextX = nextPos.x, nextY = nextPos.y;
        var row = tiles[y];
        var item = row[x];
        item.occupier = null;
        item.isOccupied = false;
        row = tiles[nextY];
        item = row[nextX];
        item.occupier = player;
        item.isOccupied = true;
        player.pos = nextPos;
    };
    return Game;
}());
exports["default"] = Game;
