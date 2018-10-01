"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("../Screen");
const Game_1 = require("../../Game");
const Player_1 = require("../../Entity/Actor/Player");
const Color_1 = require("../../Canvas/Color");
const Messenger_1 = require("../../Message/Messenger");
class InventoryScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.INVENTORY;
    }
    render() {
        const { messenger } = Game_1.default.instance;
        this.renderPlayerInventory();
        messenger.renderReturnToMap();
    }
    renderPlayerInventory() {
        const { player } = Game_1.default.instance;
        let keyCode = 65;
        let i = 0;
        Game_1.default.instance.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const title = [{ text: 'Inventory' }];
        Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, title);
        for (let key in Player_1.InventoryItems) {
            Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, player[Player_1.InventoryItems[key]].map((item) => {
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