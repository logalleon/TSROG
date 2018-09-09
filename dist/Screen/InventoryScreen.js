"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Player_1 = require("../Entity/Actor/Player");
const Color_1 = require("../Canvas/Color");
const Messenger_1 = require("../Message/Messenger");
class InventoryScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.INVENTORY;
    }
    render() {
        const { messenger } = this.game;
        this.renderPlayerInventory();
        messenger.renderReturnToMap();
    }
    renderPlayerInventory() {
        const { player } = this.game;
        let keyCode = 65;
        let i = 0;
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const title = [{ text: 'Inventory' }];
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, title);
        for (let key in Player_1.InventoryItems) {
            this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, player[Player_1.InventoryItems[key]].map((item) => {
                const message = {
                    text: `${String.fromCharCode(keyCode)}) ${item.name}`,
                    color: Color_1.Colors.WHITE
                };
                i++;
                keyCode++;
                return message;
            }));
        }
    }
}
exports.default = InventoryScreen;
//# sourceMappingURL=InventoryScreen.js.map