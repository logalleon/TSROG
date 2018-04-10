"use strict";
exports.__esModule = true;
var Game_1 = require("./Game");
var GameMap_1 = require("./GameMap");
var Canvas_1 = require("./Canvas/Canvas");
var Player_1 = require("./Entity/Actor/Player");
var MapScreen_1 = require("./Screens/MapScreen");
var InventoryScreen_1 = require("./Screens/InventoryScreen");
var Vector_1 = require("./Vector");
var Canvas_2 = require("./Canvas/Canvas");
var height = 240;
var width = 600;
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = Canvas_1.setupCanvas(canvas, height, width);
    var canvasProps = {
        height: height,
        width: width
    };
    var F = function () { return ({
        isPassable: true,
        isOccupied: false,
        description: 'Hard stone floor',
        posX: 0,
        posY: 0,
        char: '.',
        color: { hex: Canvas_2.fontOptions.fontColor }
    }); };
    var W = function () { return ({
        isPassable: false,
        isOccupied: false,
        description: 'A wall',
        posX: 0,
        posY: 0,
        char: '\u2592',
        color: { hex: '#CCB69B' }
    }); };
    var gameMap = new GameMap_1.GameMap({
        tiles: [
            [W(), W(), W(), W(), W(), W(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), W(), W(), W(), W(), W(), W()],
        ]
    });
    var screens = [
        new MapScreen_1["default"](),
        new InventoryScreen_1["default"]()
    ];
    // Adds a player
    var options = {
        pos: new Vector_1["default"](1, 1),
        char: '@',
        isActive: true,
        color: { hex: '#ff3354' },
        hp: 17,
        ac: 10,
        damage: '1d4',
        cth: 0
    };
    var player = new Player_1["default"](options);
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx, player);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    g.updatePlayerPos(player, player.pos);
    g.activeScreen.render(g.ctx);
};
