"use strict";
exports.__esModule = true;
var Message_1 = require("../Message");
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
})(ScreenNames || (ScreenNames = {}));
exports.ScreenNames = ScreenNames;
var Screen = /** @class */ (function () {
    function Screen() {
    }
    Screen.prototype.setGame = function (game) {
        this.game = game;
    };
    Screen.prototype.handleInput = function (keyValue) {
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler.call(this, keyValue);
            return { status: Message_1.Status.SUCCESS, message: '' };
        }
        else {
            return { status: Message_1.Status.FAILURE, message: Message_1.invalidInput(keyValue) };
        }
    };
    Screen.prototype.returnToMapScreen = function (game) {
        var mapScreen = game.screens.filter(function (screen) { return screen.name === ScreenNames.MAP; })[0];
        game.activeScreen = mapScreen;
    };
    Screen.prototype.render = function (ctx) {
        return null;
    };
    return Screen;
}());
exports.Screen = Screen;
