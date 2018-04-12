"use strict";
exports.__esModule = true;
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
var returnToMapScreen = function (game) {
    var mapScreen = game.screens.filter(function (screen) { return screen.name === ScreenNames.MAP; })[0];
    game.activeScreen = mapScreen;
};
exports.returnToMapScreen = returnToMapScreen;
