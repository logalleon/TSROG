"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Messenger_1 = require("../Message/Messenger");
class HelpScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.HELP;
    }
    render() {
        const { messenger } = this.game;
        this.renderHelp();
        messenger.renderReturnToMap();
    }
    renderHelp() {
        const { player } = this.game;
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const title = { text: 'Help' };
        const help = { text: '@TODO' };
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [title, help]);
    }
}
exports.default = HelpScreen;
//# sourceMappingURL=HelpScreen.js.map