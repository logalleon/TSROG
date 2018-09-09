"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const Messenger_1 = require("../Message/Messenger");
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
    ScreenNames["INSPECT"] = "inspect";
    ScreenNames["SKILLS"] = "skill";
})(ScreenNames || (ScreenNames = {}));
exports.ScreenNames = ScreenNames;
class Screen {
    constructor(inputs) {
        this.returnToMap = {
            'Space': this.returnToMapScreen,
            'Esc': this.returnToMapScreen
        };
        this.inputs = Object.assign({}, inputs, this.inputs, this.returnToMap);
    }
    setGame(game) {
        this.game = game;
    }
    handleInput(keyValue) {
        if (this.inputs[keyValue]) {
            return this.inputs[keyValue].call(this, keyValue);
        }
        else {
            return [Messenger_1.invalidInput(keyValue)];
        }
    }
    // Automatically break out of all screens
    returnToMapScreen() {
        // Set modified panel widths
        const mapScreen = Game_1.default.instance.screens[ScreenNames.MAP];
        Game_1.default.instance.activeScreen = mapScreen;
    }
    render(messages) {
        this.game.messenger.clearPanel(this.identifier);
        this.game.messenger.writeToPanel(this.identifier, messages);
    }
}
exports.Screen = Screen;
//# sourceMappingURL=Screen.js.map