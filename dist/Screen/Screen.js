"use strict";
exports.__esModule = true;
var Message_1 = require("../Message/Message");
var ScreenNames;
(function (ScreenNames) {
    ScreenNames["MAP"] = "map";
    ScreenNames["INVENTORY"] = "inventory";
    ScreenNames["MESSAGES"] = "messages";
    ScreenNames["HELP"] = "help";
    ScreenNames["COMMANDS"] = "commands";
    ScreenNames["ARMOR"] = "armor";
    ScreenNames["AMULET"] = "amulet";
    ScreenNames["POTIONS"] = "potions";
    ScreenNames["FOOD"] = "food";
    ScreenNames["KEYS"] = "keyItems";
    ScreenNames["RING"] = "ring";
    ScreenNames["SCROLL"] = "scroll";
    ScreenNames["WEAPON"] = "weapon";
    ScreenNames["UNEQUIP"] = "unequip";
})(ScreenNames || (ScreenNames = {}));
exports.ScreenNames = ScreenNames;
var Screen = /** @class */ (function () {
    function Screen() {
        this.spaceReturnToMap = {
            'Space': this.returnToMapScreen
        };
        this.inputs = Object.assign({}, this.inputs, this.spaceReturnToMap);
    }
    Screen.prototype.setGame = function (game) {
        this.game = game;
    };
    Screen.prototype.handleInput = function (keyValue) {
        if (this.inputs[keyValue]) {
            return this.inputs[keyValue].call(this, keyValue);
        }
        else {
            return [Message_1.invalidInput(keyValue)];
        }
    };
    Screen.prototype.returnToMapScreen = function () {
        var game = this.game;
        var mapScreen = game.screens.filter(function (screen) { return screen.name === ScreenNames.MAP; })[0];
        game.activeScreen = mapScreen;
    };
    Screen.prototype.render = function (ctx) {
        return null;
    };
    return Screen;
}());
exports.Screen = Screen;
