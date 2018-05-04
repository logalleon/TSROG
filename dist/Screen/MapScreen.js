"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Screen_1 = require("./Screen");
var Canvas_1 = require("../Canvas/Canvas");
var Vector_1 = require("../Vector");
var Color_1 = require("../Canvas/Color");
var MapScreenInputs;
(function (MapScreenInputs) {
    MapScreenInputs["INVENTORY"] = "I";
    MapScreenInputs["AMULET"] = "t";
    MapScreenInputs["ARMOR"] = "u";
    MapScreenInputs["FOOD"] = "o";
    MapScreenInputs["KEYS"] = "y";
    MapScreenInputs["POTIONS"] = "p";
    MapScreenInputs["RING"] = "n";
    MapScreenInputs["SCROLL"] = "l";
    MapScreenInputs["WEAPONS"] = "k";
    MapScreenInputs["COMMANDS"] = "?";
    MapScreenInputs["UNEQUIP"] = "U";
    MapScreenInputs["MESSAGES"] = "M";
    MapScreenInputs["HELP"] = "/";
    MapScreenInputs["MOVE_UP"] = "w";
    MapScreenInputs["MOVE_LEFT"] = "a";
    MapScreenInputs["MOVE_DOWN"] = "s";
    MapScreenInputs["MOVE_RIGHT"] = "d";
    MapScreenInputs["MOVE_UP_LEFT"] = "q";
    MapScreenInputs["MOVE_UP_RIGHT"] = "e";
    MapScreenInputs["MOVE_DOWN_LEFT"] = "z";
    MapScreenInputs["MOVE_DOWN_RIGHT"] = "c";
})(MapScreenInputs || (MapScreenInputs = {}));
exports.MapScreenInputs = MapScreenInputs;
var MapScreen = /** @class */ (function (_super) {
    __extends(MapScreen, _super);
    function MapScreen() {
        var _this = _super.call(this) || this;
        _this.textSpacing = new Vector_1["default"](.9, 1.5);
        _this.name = Screen_1.ScreenNames.MAP;
        _this.inputs = (_a = {},
            _a[MapScreenInputs.INVENTORY] = _this.showInventoryScreen,
            _a[MapScreenInputs.AMULET] = _this.showAmuletScreen,
            _a[MapScreenInputs.ARMOR] = _this.showArmorScreen,
            _a[MapScreenInputs.FOOD] = _this.showFoodScreen,
            _a[MapScreenInputs.KEYS] = _this.showKeyItems,
            _a[MapScreenInputs.POTIONS] = _this.showPotionScreen,
            _a[MapScreenInputs.RING] = _this.showRingScreen,
            _a[MapScreenInputs.SCROLL] = _this.showScrollScreen,
            _a[MapScreenInputs.WEAPONS] = _this.showWeaponScreen,
            _a[MapScreenInputs.COMMANDS] = _this.showCommandScreen,
            _a[MapScreenInputs.UNEQUIP] = _this.showUnequipScreen,
            _a[MapScreenInputs.MESSAGES] = _this.showMessageScreen,
            _a[MapScreenInputs.HELP] = _this.showHelpScreen,
            _a[MapScreenInputs.MOVE_UP] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_LEFT] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_DOWN] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_RIGHT] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_UP_LEFT] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_UP_RIGHT] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_DOWN_LEFT] = _this.attemptMovement.bind(_this),
            _a[MapScreenInputs.MOVE_DOWN_RIGHT] = _this.attemptMovement.bind(_this),
            _a);
        return _this;
        var _a;
    }
    MapScreen.prototype.render = function (ctx) {
        var _a = this.game, gameMap = _a.gameMap, canvasProps = _a.canvasProps;
        var tiles = gameMap.tiles;
        Canvas_1.clearCanvas(ctx, canvasProps);
        this.game.messenger.logMessages([{ text: 'This is the map screen', color: Color_1.Colors.DEFAULT }]);
        this.renderTiles(tiles, ctx, canvasProps);
    };
    MapScreen.prototype.renderTiles = function (tiles, ctx, canvasProps) {
        var fontColor = Canvas_1.fontOptions.fontColor, fontSize = Canvas_1.fontOptions.fontSize;
        var width = canvasProps.width;
        var offset = this.calculateOffset(canvasProps, this.game.gameMap, fontSize);
        for (var row = 0; row < tiles.length; row++) {
            for (var col = 0; col < tiles[row].length; col++) {
                var tile = tiles[row][col];
                var _a = tile.isOccupied ?
                    tile.occupier : tile, char = _a.char, color = _a.color;
                ctx.fillStyle = color.hex || color.rgb;
                ctx.fillText(char, (col * fontSize * this.textSpacing.x) + offset.x, (row * fontSize * this.textSpacing.y) + offset.y);
            }
        }
    };
    MapScreen.prototype.calculateOffset = function (canvasProps, gameMap, fontSize) {
        // This centers the map on the canvas
        return new Vector_1["default"]((canvasProps.width / 2) - (gameMap.width / 2 * fontSize), (canvasProps.height / 2) - (gameMap.height / 2 * fontSize));
    };
    MapScreen.prototype.attemptMovement = function (keyValue) {
        var _a = this.game, player = _a.player, gameMap = _a.gameMap;
        var pos = player.pos;
        var tiles = gameMap.tiles;
        var nextPos;
        switch (keyValue) {
            case 'w':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](0, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'a':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, 0));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 's':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](0, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'd':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, 0));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'q':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'e':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'z':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'c':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
        }
        return null;
    };
    MapScreen.prototype.showHelpScreen = function () {
        var helpScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.HELP; })[0];
        this.game.activeScreen = helpScreen;
    };
    MapScreen.prototype.showUnequipScreen = function () {
        var unequipScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.UNEQUIP; })[0];
        this.game.activeScreen = unequipScreen;
    };
    MapScreen.prototype.showMessageScreen = function () {
        var messageScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.MESSAGES; })[0];
        this.game.activeScreen = messageScreen;
    };
    MapScreen.prototype.showCommandScreen = function () {
        var commandScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.COMMANDS; })[0];
        this.game.activeScreen = commandScreen;
    };
    MapScreen.prototype.showInventoryScreen = function () {
        var inventoryScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.INVENTORY; })[0];
        this.game.activeScreen = inventoryScreen;
    };
    MapScreen.prototype.showAmuletScreen = function () {
        var amuletScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.AMULET; })[0];
        this.game.activeScreen = amuletScreen;
    };
    MapScreen.prototype.showArmorScreen = function () {
        var armorScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.ARMOR; })[0];
        this.game.activeScreen = armorScreen;
    };
    MapScreen.prototype.showFoodScreen = function () {
        var foodScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.FOOD; })[0];
        this.game.activeScreen = foodScreen;
    };
    MapScreen.prototype.showKeyItems = function () {
        var keyItemScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.KEYS; })[0];
        this.game.activeScreen = keyItemScreen;
    };
    MapScreen.prototype.showPotionScreen = function () {
        var potionScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.POTIONS; })[0];
        this.game.activeScreen = potionScreen;
    };
    MapScreen.prototype.showRingScreen = function () {
        var ringScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.RING; })[0];
        this.game.activeScreen = ringScreen;
    };
    MapScreen.prototype.showScrollScreen = function () {
        var scrollScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.SCROLL; })[0];
        this.game.activeScreen = scrollScreen;
    };
    MapScreen.prototype.showWeaponScreen = function () {
        var weaponScreen = this.game.screens.filter(function (screen) { return screen.name === Screen_1.ScreenNames.WEAPON; })[0];
        this.game.activeScreen = weaponScreen;
    };
    return MapScreen;
}(Screen_1.Screen));
exports["default"] = MapScreen;
