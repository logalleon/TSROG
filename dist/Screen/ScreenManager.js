"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScreenInterfaces_1 = require("./ScreenInterfaces");
const InventoryItemScreen_1 = require("./Inventory/InventoryItemScreen");
const InventoryScreen_1 = require("./Inventory/InventoryScreen");
const MapScreen_1 = require("./Map/MapScreen");
const Player_1 = require("../Entity/Actor/Player");
const CommandScreen_1 = require("./Command/CommandScreen");
const HelpScreen_1 = require("./Help/HelpScreen");
const EquipmentScreen_1 = require("./Equipment/EquipmentScreen");
const InspectScreen_1 = require("./Inspect/InspectScreen");
const SkillsScreen_1 = require("./Skills/SkillsScreen");
class ScreenManager {
    constructor() {
        this.screens = {
            [ScreenInterfaces_1.ScreenNames.MAP]: new MapScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.INVENTORY]: new InventoryScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.AMULET]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.AMULET, Player_1.InventoryItems.AMULETS),
            [ScreenInterfaces_1.ScreenNames.ARMOR]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.ARMOR, Player_1.InventoryItems.ARMOR),
            [ScreenInterfaces_1.ScreenNames.FOOD]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.FOOD, Player_1.InventoryItems.FOOD),
            [ScreenInterfaces_1.ScreenNames.KEYS]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.KEYS, Player_1.InventoryItems.KEYS),
            [ScreenInterfaces_1.ScreenNames.POTIONS]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.POTIONS, Player_1.InventoryItems.POTIONS),
            [ScreenInterfaces_1.ScreenNames.RING]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.RING, Player_1.InventoryItems.RINGS),
            [ScreenInterfaces_1.ScreenNames.SCROLL]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.SCROLL, Player_1.InventoryItems.SCROLLS),
            [ScreenInterfaces_1.ScreenNames.WEAPON]: new InventoryItemScreen_1.default(ScreenInterfaces_1.ScreenNames.WEAPON, Player_1.InventoryItems.WEAPONS),
            [ScreenInterfaces_1.ScreenNames.COMMANDS]: new CommandScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.HELP]: new HelpScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.EQUIPMENT]: new EquipmentScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.INSPECT]: new InspectScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.SKILLS]: new SkillsScreen_1.default(),
            [ScreenInterfaces_1.ScreenNames.MESSAGES]: new SkillsScreen_1.default() // @TODO fix
        };
        // @TODO this won't likely be the first screen once players can pick options about their characters
        this.activeScreen = this.screens[ScreenInterfaces_1.ScreenNames.MAP];
    }
}
exports.ScreenManager = ScreenManager;
//# sourceMappingURL=ScreenManager.js.map