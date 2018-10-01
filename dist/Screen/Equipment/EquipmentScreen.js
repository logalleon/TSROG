"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("../Screen");
const Game_1 = require("../../Game");
const Player_1 = require("../../Entity/Actor/Player");
const Messenger_1 = require("../../Message/Messenger");
const Color_1 = require("../../Canvas/Color");
const lodash_1 = require("lodash");
const Geometry_1 = require("../../Geometry");
var EquipmentScreenInputsMap;
(function (EquipmentScreenInputsMap) {
    EquipmentScreenInputsMap["DOWN"] = "Down";
    EquipmentScreenInputsMap["UP"] = "Up";
    EquipmentScreenInputsMap["LEGEND"] = "?";
    EquipmentScreenInputsMap["NEXT"] = "Right";
    EquipmentScreenInputsMap["PREV"] = "Left";
})(EquipmentScreenInputsMap || (EquipmentScreenInputsMap = {}));
class EquipmentScreen extends Screen_1.Screen {
    constructor() {
        super({});
        this.name = Screen_1.ScreenNames.EQUIPMENT;
        this.currentIndex = 0;
        this.length = Player_1.TOTAL_EQUIPMENT_SLOTS;
        this.awaitingConfirmation = false;
        this.renderYesNo = this.renderYesNo.bind(this);
        this.inputs = Object.assign(this.inputs, {
            [EquipmentScreenInputsMap.PREV]: () => {
                console.log(Geometry_1.modulo((this.currentIndex - 1), this.length));
                console.log(this.length, this.currentIndex);
                this.currentIndex = Geometry_1.modulo((this.currentIndex - 1), this.length);
                this.render();
            },
            [EquipmentScreenInputsMap.NEXT]: () => {
                this.currentIndex = Geometry_1.modulo((this.currentIndex + 1), this.length);
                this.render();
            }
        });
    }
    render() {
        this.renderEquippedItems();
        // @TODO it should be more obvious that yes/no is being rendered
    }
    renderEquippedItems() {
        console.log(this.inputs);
        const { player } = Game_1.default.instance;
        const { equipped: equipmentSlots } = player;
        let keyCode = 65;
        let i = 0;
        Game_1.default.instance.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const title = [{ text: 'Equipment' }];
        Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, title);
        this.itemReference = {};
        let index = 0;
        for (let slot in equipmentSlots) {
            let classList = `equipment equipment--${lodash_1.kebabCase(lodash_1.lowerCase(slot))}`;
            if (this.currentIndex === index) {
                classList += ' equipment--highlighted';
            }
            const itemOrEmptySlot = equipmentSlots[slot];
            const message = {
                text: `${String.fromCharCode(keyCode)}) ${itemOrEmptySlot ? itemOrEmptySlot.name
                    : 'nothing equipped'}`,
                color: Color_1.Colors.WHITE,
                classList
            };
            const reference = {
                item: itemOrEmptySlot,
                slot: slot
            };
            this.itemReference[String.fromCharCode(keyCode)] = reference;
            i++;
            keyCode++;
            Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [message]);
            index++;
        }
        // @TODO this might need to be updated to conform with the merge that's
        this.inputs = Object.assign(this.inputs, this.returnToMap);
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
                    Game_1.default.instance.player.attemptToUnequip(reference.slot);
                    Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text: `Unequipped ${item.name}.` }]);
                    this.awaitingConfirmation = false;
                },
                'n': () => {
                    this.awaitingConfirmation = false;
                }
            }, this.returnToMap);
        }
        else {
            const text = 'Cannot unequip empty slot.';
            Game_1.default.instance.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text }]);
        }
    }
    renderYesNo() {
        this.awaitingConfirmation = true;
        const { messenger } = Game_1.default.instance;
        const reference = this.itemReference[this.itemReferenceAccessor];
        const { item } = reference;
        messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        const text = `Unequip ${item.name} [y/n]?`;
        messenger.writeToPanel(Messenger_1.Panel.PANEL_1, [{ text }]);
    }
}
exports.default = EquipmentScreen;
//# sourceMappingURL=EquipmentScreen.js.map