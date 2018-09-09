"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Screen_1 = require("./Screen");
const Canvas_1 = require("../Canvas/Canvas");
const Player_1 = require("../Entity/Actor/Player");
const MapScreen_1 = require("./MapScreen");
const lodash_2 = require("lodash");
const Messenger_1 = require("../Message/Messenger");
class CommandScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.COMMANDS;
    }
    render() {
        const { messenger } = this.game;
        this.renderCommands();
        messenger.renderReturnToMap();
    }
    renderTitle() {
        const title = `${lodash_2.titleCase(this.name)}`;
    }
    renderCommands() {
        const { messenger } = this.game;
        const I = MapScreen_1.MapScreenInputs;
        const S = Screen_1.ScreenNames;
        const text = `
      ${lodash_1.startCase(this.name)}<br/>
      ${I.MOVE_UP_LEFT} ${I.MOVE_UP} ${I.MOVE_UP_RIGHT}<br/>
      &nbsp;\\|/<br/>
      ${I.MOVE_LEFT}- -${I.MOVE_RIGHT}<br/>
      &nbsp;/|\\<br/>
      ${I.MOVE_DOWN_LEFT} ${I.MOVE_DOWN} ${I.MOVE_DOWN_RIGHT}<br/>
      ${I.INVENTORY} - ${S.INVENTORY}<br/>
      ${I.HELP} - ${S.HELP}<br/>
      ${I.AMULET} - ${S.AMULET}<br/>
      ${I.WEAPONS} - ${S.WEAPON}<br/>
      ${I.RING} - ${S.RING}<br/>
      ${I.ARMOR} - ${S.ARMOR}<br/>
      ${I.SCROLL} - ${S.SCROLL}<br/>
      ${I.POTIONS} - ${S.POTIONS}<br/>
      ${I.FOOD} - ${S.FOOD}<br/>
      ${I.KEYS} - ${S.KEYS}<br/>
      ${I.UNEQUIP} - ${S.UNEQUIP}<br/>
    `;
        console.log(text);
        messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{
                text
            }]);
    }
    renderPlayerInventory() {
        const { player } = this.game;
        const padding = Canvas_1.fontOptions.fontSize * 2;
        let keyCode = 65;
        let i = 0;
        for (let key in Player_1.InventoryItems) {
            player[Player_1.InventoryItems[key]].forEach((item) => {
                keyCode++;
            });
        }
    }
}
exports.default = CommandScreen;
//# sourceMappingURL=CommandScreen.js.map