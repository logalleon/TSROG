"use strict";
exports.__esModule = true;
var Game_1 = require("./Game");
var GameMap_1 = require("./GameMap");
var Screen_1 = require("./Screen/Screen");
var Canvas_1 = require("./Canvas/Canvas");
var Player_1 = require("./Entity/Actor/Player");
var MapScreen_1 = require("./Screen/MapScreen");
var InventoryScreen_1 = require("./Screen/InventoryScreen");
var Vector_1 = require("./Vector");
var Canvas_2 = require("./Canvas/Canvas");
var Armor_1 = require("./Entity/Prop/Armor");
var Prop_data_1 = require("./Entity/Prop/Prop.data");
var InventoryItemScreen_1 = require("./Screen/InventoryItemScreen");
var CommandScreen_1 = require("./Screen/CommandScreen");
var Color_1 = require("./Canvas/Color");
var height = 240;
var width = 600;
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = Canvas_1.setupCanvas(canvas, height, width);
    var canvasProps = {
        height: height,
        width: width
    };
    var el = document.getElementById('messages');
    // TEST DATA ///////////////////////////////////////
    var F = function () { return ({
        isPassable: true,
        isOccupied: false,
        description: 'Hard stone floor',
        posX: 0,
        posY: 0,
        char: '.',
        color: new Color_1.Color({ hex: Canvas_2.fontOptions.fontColor })
    }); };
    var W = function () { return ({
        isPassable: false,
        isOccupied: false,
        description: 'A wall',
        posX: 0,
        posY: 0,
        char: '\u2592',
        color: new Color_1.Color({ hex: '#CCB69B' })
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
    // END TEST DATA
    var screens = [
        new MapScreen_1["default"](),
        new InventoryScreen_1["default"](),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.AMULET, Player_1.InventoryItems.AMULETS),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.ARMOR, Player_1.InventoryItems.ARMOR),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.FOOD, Player_1.InventoryItems.FOOD),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.KEYS, Player_1.InventoryItems.KEYs),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.POTIONS, Player_1.InventoryItems.POTIONS),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.RING, Player_1.InventoryItems.RINGS),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.SCROLL, Player_1.InventoryItems.SCROLLS),
        new InventoryItemScreen_1["default"](Screen_1.ScreenNames.WEAPON, Player_1.InventoryItems.WEAPONS),
        new CommandScreen_1["default"]()
    ];
    // Adds a player TEST DATAAAAAa
    var actorOptions = {
        pos: new Vector_1["default"](1, 1),
        char: '@',
        isActive: true,
        color: new Color_1.Color({ hex: '#ff3354' }),
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
        color: new Color_1.Color({ hex: '#ff00ff' }),
        char: 'A',
        name: 'Plate Mail',
        canBePickedUp: true,
        description: 'A set of plate mail'
    };
    var armorOptions = {
        modifier: 4,
        material: 'Iron',
        quality: Prop_data_1.Quality.FAIR,
        propOptions: armorPropOptions
    };
    var plateMail = new Armor_1.Armor(armorOptions);
    var armorPropOptions1 = {
        isActive: true,
        color: new Color_1.Color({ hex: '#ff00ff' }),
        char: 'A',
        name: 'Chain Mail',
        canBePickedUp: true,
        description: 'A set of chain mail'
    };
    var armorOptions1 = {
        modifier: 2,
        material: 'Tin',
        quality: Prop_data_1.Quality.POOR,
        propOptions: armorPropOptions1
    };
    var chainMail = new Armor_1.Armor(armorOptions1);
    // END TEST DATA ////////////////////
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx, player, el);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    // TESSSSSSSSSSST DATA
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
    // END TEST DATA
    g.activeScreen.render(g.ctx);
};
