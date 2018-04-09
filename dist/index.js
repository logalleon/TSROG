"use strict";
exports.__esModule = true;
var Game_1 = require("./Game");
var MapScreen_1 = require("./Screens/MapScreen");
var InventoryScreen_1 = require("./Screens/InventoryScreen");
var height = 240;
var width = 600;
window.onload = function () {
    var canvas = document.getElementById('canvas');
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    // High DPI canvases
    var devicePixelRatio = window.devicePixelRatio;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    var ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    // Set the global font style
    ctx.font = '14px IBM Plex Mono';
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
        char: '.'
    }); };
    var W = function () { return ({
        isPassable: false,
        isOccupied: false,
        description: 'A wall',
        posX: 0,
        posY: 0,
        char: 'H'
    }); };
    var gameMap = {
        width: 10,
        height: 10,
        tiles: [
            [W(), W(), W(), W()],
            [W(), F(), F(), W()],
            [W(), F(), F(), W()],
            [W(), F(), F(), W()],
            [W(), F(), F(), W()],
            [W(), W(), W(), W()]
        ]
    };
    var screens = [
        new MapScreen_1["default"](),
        new InventoryScreen_1["default"]()
    ];
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    // Adds a player
    var player = {
        posX: 1,
        posY: 1,
        char: '@'
    };
    g.updatePlayerPos(player);
    g.activeScreen.render(g.ctx);
};
