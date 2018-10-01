"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const Messenger_1 = require("../Message/Messenger");
const ScreenInterfaces_1 = require("./ScreenInterfaces");
exports.ScreenNames = ScreenInterfaces_1.ScreenNames;
class Screen {
    constructor(inputs) {
        this.returnToMap = {
            'Space': this.returnToMapScreen,
            'Esc': this.returnToMapScreen
        };
        this.inputs = Object.assign({}, inputs, this.inputs, this.returnToMap);
    }
    handleInput(keyValue) {
        console.log(keyValue, 'kv');
        console.log(this.inputs);
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
        const mapScreen = Game_1.default.instance.screenManager.screens[ScreenInterfaces_1.ScreenNames.MAP];
        Game_1.default.instance.screenManager.activeScreen = mapScreen;
    }
    render(messages) {
        this.game.messenger.clearPanel(this.identifier);
        if (messages) {
            this.game.messenger.writeToPanel(this.identifier, messages);
        }
    }
}
exports.Screen = Screen;
//# sourceMappingURL=Screen.js.map