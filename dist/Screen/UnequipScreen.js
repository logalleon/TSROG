"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Messenger_1 = require("../Message/Messenger");
const Color_1 = require("../Canvas/Color");
class UnequipScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.UNEQUIP;
        this.awaitingConfirmation = false;
        this.renderYesNo = this.renderYesNo.bind(this);
    }
    render() {
        const { messenger } = this.game;
        if (!this.awaitingConfirmation) {
            this.renderEquippedItems();
        }
        else {
            this.renderYesNo();
        }
        // @TODO it should be more obvious that yes/no is being rendered
    }
    renderEquippedItems() {
        const { player } = this.game;
        const { equipped: equipmentSlots } = player;
        let keyCode = 65;
        let i = 0;
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const title = [{ text: 'Unequip Items' }];
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, title);
        this.itemReference = {};
        for (let slot in equipmentSlots) {
            const itemOrEmptySlot = equipmentSlots[slot];
            const message = {
                text: `${String.fromCharCode(keyCode)}) ${itemOrEmptySlot ? itemOrEmptySlot.name
                    : 'nothing equipped'}`,
                color: Color_1.Colors.WHITE
            };
            const reference = {
                item: itemOrEmptySlot,
                slot: slot
            };
            this.itemReference[String.fromCharCode(keyCode)] = reference;
            i++;
            keyCode++;
            this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [message]);
        }
        this.inputs = Object.assign({}, this.returnToMap);
        for (let itemReferenceAccessor in this.itemReference) {
            this.inputs[itemReferenceAccessor] = this.setItemReferenceAccessor.bind(this, itemReferenceAccessor);
        }
    }
    setItemReferenceAccessor(itemReferenceAccessor) {
        this.itemReferenceAccessor = itemReferenceAccessor;
        const reference = this.itemReference[this.itemReferenceAccessor];
        const item = reference.item;
        if (item !== null) {
            this.awaitingConfirmation = true;
            // @TODO there's obviously a possibility that the y or n lists
            // collide with these - make sure that the letters y and n can't be menu options
            this.inputs = Object.assign({}, {
                'y': () => {
                    this.game.player.attemptToUnequip(reference.slot);
                    this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text: `Unequipped ${item.name}.` }]);
                    this.awaitingConfirmation = false;
                },
                'n': () => {
                    this.awaitingConfirmation = false;
                }
            }, this.returnToMap);
        }
        else {
            const text = 'Cannot unequip empty slot.';
            this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text }]);
        }
    }
    renderYesNo() {
        this.awaitingConfirmation = true;
        const { messenger } = this.game;
        const reference = this.itemReference[this.itemReferenceAccessor];
        const { item } = reference;
        messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const text = `Unequip ${item.name} [y/n]?`;
        messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text }]);
    }
}
exports.default = UnequipScreen;
//# sourceMappingURL=UnequipScreen.js.map