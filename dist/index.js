"use strict";
var _this = this;
exports.__esModule = true;
var Game_1 = require("./Game");
var MapScreen_1 = require("./Screens/MapScreen");
var InventoryScreen_1 = require("./Screens/InventoryScreen");
var Vector_1 = require("./Vector");
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
            [W(), W(), W(), W(), W(), W(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), W(), W(), W(), W(), W(), W()],
        ],
        inBounds: function (width, height, v) {
            console.log(_this.width);
            console.log(v);
            return v.x >= 0 &&
                v.y >= 0 &&
                v.x < width &&
                v.y < height;
        }
    };
    var screens = [
        new MapScreen_1["default"](),
        new InventoryScreen_1["default"]()
    ];
    // Adds a player
    var player = {
        pos: new Vector_1["default"](1, 1),
        char: '@'
    };
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx, player);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    g.updatePlayerPos(player, player.pos);
    g.activeScreen.render(g.ctx);
};
