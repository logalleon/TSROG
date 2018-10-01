import { ScreenNameMap, ScreenNames } from "./ScreenInterfaces";
import InventoryItemScreen from "./Inventory/InventoryItemScreen";
import InventoryScreen from "./Inventory/InventoryScreen";
import MapScreen from "./Map/MapScreen";
import { InventoryItems } from "../Entity/Actor/Player";
import CommandScreen from "./Command/CommandScreen";
import HelpScreen from "./Help/HelpScreen";
import EquipmentScreen from "./Equipment/EquipmentScreen";
import InspectScreen from "./Inspect/InspectScreen";
import { Skill } from "../Entity/Actor/Skill/Skill";
import SkillsScreen from "./Skills/SkillsScreen";
import { Screen } from "./Screen";


class ScreenManager {

  public screens: ScreenNameMap;
  public activeScreen: Screen;

  constructor () {
    this.screens = {
      [ScreenNames.MAP]: new MapScreen(),
      [ScreenNames.INVENTORY]: new InventoryScreen(),
      [ScreenNames.AMULET]: new InventoryItemScreen(ScreenNames.AMULET, InventoryItems.AMULETS),
      [ScreenNames.ARMOR]: new InventoryItemScreen(ScreenNames.ARMOR, InventoryItems.ARMOR),
      [ScreenNames.FOOD]: new InventoryItemScreen(ScreenNames.FOOD, InventoryItems.FOOD),
      [ScreenNames.KEYS]: new InventoryItemScreen(ScreenNames.KEYS, InventoryItems.KEYS),
      [ScreenNames.POTIONS]: new InventoryItemScreen(ScreenNames.POTIONS, InventoryItems.POTIONS),
      [ScreenNames.RING]: new InventoryItemScreen(ScreenNames.RING, InventoryItems.RINGS),
      [ScreenNames.SCROLL]: new InventoryItemScreen(ScreenNames.SCROLL, InventoryItems.SCROLLS),
      [ScreenNames.WEAPON]: new InventoryItemScreen(ScreenNames.WEAPON, InventoryItems.WEAPONS),
      [ScreenNames.COMMANDS]: new CommandScreen(),
      [ScreenNames.HELP]: new HelpScreen(),
      [ScreenNames.EQUIPMENT]: new EquipmentScreen(),
      [ScreenNames.INSPECT]: new InspectScreen(),
      [ScreenNames.SKILLS]: new SkillsScreen(),
      [ScreenNames.MESSAGES]: new SkillsScreen() // @TODO fix
    };
    // @TODO this won't likely be the first screen once players can pick options about their characters
    this.activeScreen = this.screens[ScreenNames.MAP];
  }

}

export { ScreenManager };