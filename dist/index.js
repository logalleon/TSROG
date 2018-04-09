"use strict";
exports.__esModule = true;
var Game_1 = require("./Game");
var MapScreen_1 = require("./Screens/MapScreen");
var InventoryScreen_1 = require("./Screens/InventoryScreen");
var height = 600;
var width = 800;
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
    var gameMap = {
        width: 10,
        height: 10,
        tiles: []
    };
    var screens = [
        new MapScreen_1["default"](),
        new InventoryScreen_1["default"]()
    ];
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    g.activeScreen.render(g.ctx);
};
