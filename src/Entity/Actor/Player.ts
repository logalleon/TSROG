import Vector2 from '../../Vector';
import { Actor, ActorOptions } from './Actor';
import { Amulet } from '../Prop/Amulet';
import { Armor } from '../Prop/Armor';
import { Food } from '../Prop/Food';
import { Potion } from '../Prop/Potion';
import { Ring } from '../Prop/Ring';
import { Scroll } from '../Prop/Scroll';
import { Weapon } from '../Prop/Weapon';
import { Prop } from '../Prop/Prop';

enum InventoryItems {
  AMULETS = 'amulets',
  ARMOR = 'armor',
  FOOD = 'food',
  POTIONS = 'potions',
  RINGS = 'rings',
  SCROLLS = 'scrolls',
  WEAPONS = 'weapons'
}

enum EquipmentSlots {
  NECK = 'neck',
  ARMOR = 'armor',
  LEFT_HAND = 'left hand',
  RIGHT_HAND = 'right hand',
  WEAPON = 'weapon'
}

interface PlayerOptions {
  actorOptions: ActorOptions
}

interface EquippedItems {
  [EquipmentSlots.NECK]: Amulet | null,
  [EquipmentSlots.ARMOR]: Armor | null,
  [EquipmentSlots.LEFT_HAND]: Ring | null,
  [EquipmentSlots.RIGHT_HAND]: Ring | null,
  [EquipmentSlots.WEAPON]: Weapon | null
}

interface Pickup {
  type: InventoryItems,
  item: Prop
}

interface EquippedItemAccessor {
  index: number,
  type: InventoryItems
}

class Player extends Actor {

  public [InventoryItems.AMULETS]: Amulet[] = [];
  public [InventoryItems.ARMOR]: Armor[] = [];
  public [InventoryItems.FOOD]: Food[] = [];
  public [InventoryItems.POTIONS]: Potion[] = [];
  public [InventoryItems.RINGS]: Ring[] = [];
  public [InventoryItems.SCROLLS]: Scroll[] = [];
  public [InventoryItems.WEAPONS]: Weapon[] = [];

  public equipped: EquippedItems = {
    [EquipmentSlots.NECK]: null,
    [EquipmentSlots.ARMOR]: null,
    [EquipmentSlots.LEFT_HAND]: null,
    [EquipmentSlots.RIGHT_HAND]: null,
    [EquipmentSlots.WEAPON]: null
  };

  constructor (options: PlayerOptions) {
    super(options.actorOptions);
    for (let key in options) {
      if (key !== 'actorOptions') {
        this[key] = options[key];
      }
    }
  }

  addToInventory (pickup: Pickup) {
    this[pickup.type] = [].concat(this[pickup.type], pickup.item);
  }

  attemptToEquip (accessor: EquippedItemAccessor, slot: EquipmentSlots): boolean {
    // There's already something in that equipment slot
    if (this.equipped[slot]) {
      return false;
    // Equip the item
    } else {
      this.equipped[slot] = this[accessor.type][accessor.index];
      return true;
    }
  }

}

export { Player, PlayerOptions, Pickup, EquipmentSlots, EquippedItemAccessor, EquippedItems, InventoryItems };