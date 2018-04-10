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
var Armor_1 = require("./Entity/Prop/Armor");
var Prop_1 = require("./Entity/Prop/Prop");
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
    var actorOptions = {
        pos: new Vector_1["default"](1, 1),
        char: '@',
        isActive: true,
        color: { hex: '#ff3354' },
        hp: 17,
        ac: 10,
        damage: '1d4',
        cth: 0
    };
    var options = {
        actorOptions: actorOptions
    };
    var player = new Player_1.Player(options);
    // Some test equipment for the player
    var armorPropOptions = {
        isActive: true,
        color: { hex: '#ff00ff' },
        char: 'A',
        name: 'Plate Mail',
        canBePickedUp: true,
        description: 'A set of plate mail'
    };
    var armorOptions = {
        modifier: 4,
        material: 'Iron',
        quality: Prop_1.Quality.FAIR,
        propOptions: armorPropOptions
    };
    var plateMail = new Armor_1.Armor(armorOptions);
    var armorPropOptions1 = {
        isActive: true,
        color: { hex: '#ff00ff' },
        char: 'A',
        name: 'Chain Mail',
        canBePickedUp: true,
        description: 'A set of chain mail'
    };
    var armorOptions1 = {
        modifier: 2,
        material: 'Tin',
        quality: Prop_1.Quality.POOR,
        propOptions: armorPropOptions1
    };
    var chainMail = new Armor_1.Armor(armorOptions1);
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx, player);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    var pickup = {
        type: Player_1.InventoryItems.ARMOR,
        item: plateMail
    };
    player.addToInventory(pickup);
    player.attemptToEquip({ index: 0, type: Player_1.InventoryItems.ARMOR }, Player_1.EquipmentSlots.ARMOR);
    pickup = {
        type: Player_1.InventoryItems.ARMOR,
        item: chainMail
    };
    player.addToInventory(pickup);
    g.updatePlayerPos(player, player.pos);
    g.activeScreen.render(g.ctx);
};
