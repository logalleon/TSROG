"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("../Screen");
const Game_1 = require("../../Game");
const Messenger_1 = require("../../Message/Messenger");
class HelpScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.HELP;
    }
    render() {
        const { messenger } = Game_1.default.instance;
        this.renderHelp();
        messenger.renderReturnToMap();
    }
    renderHelp() {
        const { player } = Game_1.default.instance;
        Game_1.default.instance.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const title = { text: 'Help' };
        const help = { text: '@TODO' };
        Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [title, help]);
    }
}
exports.default = HelpScreen;
//# sourceMappingURL=HelpScreen.js.map