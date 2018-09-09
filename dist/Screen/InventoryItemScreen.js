"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Screen_1 = require("./Screen");
const Player_1 = require("../Entity/Actor/Player");
const Messenger_1 = require("../Message/Messenger");
const lodash_1 = require("lodash");
const CommonHandlers_1 = require("./CommonHandlers");
var optionsKey;
(function (optionsKey) {
    optionsKey["EQUIP"] = "e";
    optionsKey["INSPECT"] = "i";
    optionsKey["UNEQUIP"] = "u";
})(optionsKey || (optionsKey = {}));
class InventoryItemScreen extends Screen_1.Screen {
    constructor(name, item) {
        super({});
        this.storedInputMaps = [];
        this.itemReference = {};
        this.name = name;
        this.item = item;
    }
    render() {
        const { messenger } = this.game;
        this.renderInventoryItems();
        messenger.renderReturnToMap();
    }
    renderTitle() {
        const message = {
            text: `${lodash_1.startCase(this.item)}`
        };
        return [message];
    }
    renderInventoryItems() {
        const { player } = this.game;
        // Start with A
        let keyCode = 65;
        let i = 0;
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_1);
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, this.renderTitle());
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_1, player[this.item].map((item, index) => {
            console.log(item);
            const message = {
                text: `${String.fromCharCode(keyCode)}) ${item.name}`,
            };
            const itemReference = {
                item,
                slot: this.getItemSlot(this.item)
            };
            this.itemReference[String.fromCharCode(keyCode)] = { item, itemReference, index };
            i++;
            keyCode++;
            return message;
        }));
        for (let itemReferenceAccessor in this.itemReference) {
            this.inputs[itemReferenceAccessor] = this.showOptions.bind(this, itemReferenceAccessor);
        }
    }
    getItemSlot(item) {
        switch (item) {
            case Player_1.InventoryItems.AMULETS:
                return Player_1.EquipmentSlots.NECK;
            case Player_1.InventoryItems.ARMOR:
                return Player_1.EquipmentSlots.ARMOR;
            case Player_1.InventoryItems.WEAPONS:
                return Player_1.EquipmentSlots.WEAPON;
            default:
                throw new Error('Uh ooooh');
        }
    }
    showOptions(itemReferenceAccessor) {
        this.storedInputMaps.push(this.inputs);
        this.storeAndSwapInputMap(CommonHandlers_1.applyEscapeHandlerBinding(this, {
            [optionsKey.EQUIP]: this.showEquipPrompt.bind(this, itemReferenceAccessor),
            [optionsKey.INSPECT]: this.showInspect.bind(this, itemReferenceAccessor),
            [optionsKey.UNEQUIP]: this.showUnequipPrompt.bind(this, itemReferenceAccessor)
        }, Messenger_1.Panel.PANEL_2));
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_2);
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_2, [
            {
                text: `${optionsKey.EQUIP}) equip`
            },
            {
                text: `${optionsKey.INSPECT}) inspect`
            },
            {
                text: `${optionsKey.UNEQUIP}) unequip`
            }
        ], true);
    }
    showEquipPrompt(itemReferenceAccessor) {
        const item = this.itemReference[itemReferenceAccessor].item;
        const itemReference = this.itemReference[itemReferenceAccessor].itemReference;
        const index = this.itemReference[itemReferenceAccessor].index;
        const message = {
            text: `Equip ${item.name} [y/n]?`
        };
        this.storeAndSwapInputMap(CommonHandlers_1.applyEscapeHandlerBinding(this, CommonHandlers_1.applyYesNoBinding(this, {}, () => {
            const accessor = {
                index,
                type: this.item
            };
            if (this.game.player.attemptToEquip(accessor, itemReference.slot)) {
                this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_3, [
                    { text: `Successfully equipped ${item.name}.` }
                ]);
            }
            else {
                const equippedItem = this.game.player.equipped[itemReference.slot];
                this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_3, [
                    { text: `Cannot equip ${item.name}. ${equippedItem.name} is equipped in that slot.` }
                ]);
            }
        }, () => { console.log('no'); }), Messenger_1.Panel.PANEL_3, Messenger_1.Panel.PANEL_2));
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_3);
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_3, [message], true);
    }
    storeAndSwapInputMap(nextInputs) {
        this.storedInputMaps.push(this.inputs);
        this.inputs = nextInputs;
        console.log(this.inputs, this.storedInputMaps); // @TODO still some weird duplication
    }
    showInspect(itemReferenceAccessor) {
        const item = this.itemReference[itemReferenceAccessor];
        this.storeAndSwapInputMap(CommonHandlers_1.applyEscapeHandlerBinding(this, {}, Messenger_1.Panel.PANEL_3, Messenger_1.Panel.PANEL_2));
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_3);
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_3, [{
                text: `Description ${item.descriptionLong}`
            }], true);
    }
    showUnequipPrompt(itemReferenceAccessor) {
        const { item } = this.itemReference[itemReferenceAccessor];
        // @TODO add inputs map
        const message = {
            text: `Unequip ${item.name} [y/n]?`
        };
        this.storeAndSwapInputMap(CommonHandlers_1.applyEscapeHandlerBinding(this, CommonHandlers_1.applyYesNoBinding(this, {}, () => { console.log('yes'); }, () => { console.log('no'); }), Messenger_1.Panel.PANEL_3, Messenger_1.Panel.PANEL_2));
        this.game.messenger.clearPanel(Messenger_1.Panel.PANEL_3);
        this.game.messenger.writeToPanel(Messenger_1.Panel.PANEL_3, [message], true);
    }
}
exports.default = InventoryItemScreen;
//# sourceMappingURL=InventoryItemScreen.js.map