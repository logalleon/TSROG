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
import { Message, Messenger } from '../../Message/Message';
import { Enemy } from './Enemy';
import { Colors } from '../../Canvas/Color';
import Game from '../../Game';

const { colorize } = Messenger;

enum InventoryItems {
  AMULETS = 'amulets',
  ARMOR = 'armor',
  FOOD = 'food',
  KEYS = 'keys',
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

  public hasMoveInteracted: boolean = false;
  public hasMoved: boolean = false;

  public [InventoryItems.AMULETS]: Amulet[];
  public [InventoryItems.ARMOR]: Armor[];
  public [InventoryItems.FOOD]: Food[];
  public [InventoryItems.POTIONS]: Potion[];
  public [InventoryItems.RINGS]: Ring[];
  public [InventoryItems.SCROLLS]: Scroll[];
  public [InventoryItems.WEAPONS]: Weapon[];

  public equipped: EquippedItems = {
    [EquipmentSlots.NECK]: null,
    [EquipmentSlots.ARMOR]: null,
    [EquipmentSlots.LEFT_HAND]: null,
    [EquipmentSlots.RIGHT_HAND]: null,
    [EquipmentSlots.WEAPON]: null
  };

  constructor (options: PlayerOptions) {
    super(options.actorOptions);
    for (let key in InventoryItems) {
      this[InventoryItems[key]] = [];
    }
    for (let key in options) {
      if (key !== 'actorOptions') {
        this[key] = options[key];
      }
    }
  }

  /**
   * This runs at the end of the game update loop, so do things like
   * check if the player is alive, check disease status, check leveling,
   * reset any flags
   */
  update (): Message[] {
    this.hasMoveInteracted = false;
    this.hasMoved = false;
    return [];
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

  /**
   * @override
   * @param destination {Vector2}
   */
  move (destination: Vector2) {
    super.move(destination);
    // Set the player tile to open
    // When the game first starts, this may not yet be initialized
    if (Game.instance) {
      Game.instance.setTileToOpen(destination);
    }
    this.hasMoveInteracted = true;
    this.hasMoved = true;
  }

  /**
   * @override
   * @param target {Actor}
   */
  attemptAttack (target: Actor): boolean {
    this.hasMoveInteracted = true;
    return super.attemptAttack(target);
  }

  formatSuccessfulAttack (damage: number, target: Enemy, isCritical?: boolean): Message {
    const weapon = this.equipped[EquipmentSlots.WEAPON];
    const isMassiveDamage = damage >= target.massiveDamageThreshold;
    if (weapon) {
      return <Message>{
        color: Colors.DEFAULT,
        text: `You strike the
        ${colorize(target.formattedName(), Colors.TARGET_DEFAULT)} with your 
        ${weapon.getFormattedName()} for 
        ${colorize(
          String(damage),
          isMassiveDamage ? Colors.DAMAGE_MASSIVE :
          Colors.DAMAGE_DEFAULT)} damage!`
      }
    } else {
      return <Message>{
        text: `You strike the ${target.formattedName()} ${target.formattedChar()} for your bare hands for ${damage} damage!`,
        color: Colors.DEFAULT
      };
    }
  }

  formatUnsuccessfulAttack (target: Enemy): Message {
    return <Message>{
      color: Colors.DEFAULT,
      text: `
        You attempt to attack the 
        ${target.formattedName()} ${target.formattedChar()}
        ${colorize(` but it evades your blows!`, Colors.MISS_DEFAULT)}
      `
    }
  }

}

export { Player, PlayerOptions, Pickup, EquipmentSlots, EquippedItemAccessor, EquippedItems, InventoryItems };