import Vector2 from '../../Vector';
import { Actor, ActorOptions } from './Actor';
import { Prop, PickupProp } from '../Prop/Prop';
import { Message, Messenger } from '../../Message/Messenger';
import { Enemy } from './Enemy';
import { Colors } from '../../Canvas/Color';
import Game from '../../Game';
import { BASE_REGEN_DELAY } from './config';
import { Hunger } from './Status/Hunger';
import { Thirst } from './Status/Thirst';
import { Skill, SkillNames, ISkill, SkillLevels, LevelingAllotment } from './Skill/Skill';
import { defaultSkills, SkillMap } from './Skill/Skill.data';
import { Random } from 'ossuary';
import { Amulet } from '../Prop/Amulet/Amulet';
import { Armor } from '../Prop/Armor/Armor';
import { Food } from '../Prop/KeyItems/KeyItems';
import { Potion } from '../Prop/Potion/Potion';
import { Ring } from '../Prop/Ring/Ring';
import { Scroll } from '../Prop/Scroll/Scroll';
import { Weapon } from '../Prop/Weapon/Weapon';

const { colorize } = Messenger;

const TOTAL_EQUIPMENT_SLOTS = 5;

enum InventoryItems {
  AMULETS = 'AMULETS',
  ARMOR = 'ARMOR',
  FOOD = 'FOOD',
  KEYS = 'KEYS',
  POTIONS = 'POTIONS',
  RINGS = 'RINGS',
  SCROLLS = 'SCROLLS',
  WEAPONS = 'WEAPON'
}

enum EquipmentSlots {
  NECK = 'NECK',
  ARMOR = 'ARMOR',
  LEFT_HAND = 'LEFT_HAND',
  RIGHT_HAND = 'RIGHT_HAND',
  WEAPON = 'WEAPON'
}

interface PlayerOptions {
  actorOptions: ActorOptions, // @TODO refactor this out to flatten the structure
  maxHp: number,
  level: number,
  hpRegen: number,
  los: number
}

type ES = keyof typeof EquipmentSlots;

type EquippedInventoryItemAccessors = {
  [Key in ES]: EquippedItemAccessor | null
}

type EquippedItems = {
  [Key in ES]: PickupProp | null
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

  public level: number;
  public maxHp: number;
  public hpRegen: number;

  public los: number;

  // Movement and turn-related activities
  public hasMoveInteracted: boolean = false;
  public hasMoved: boolean = false;

  // The current inventory of the player
  public [InventoryItems.AMULETS]: Amulet[];
  public [InventoryItems.ARMOR]: Armor[];
  public [InventoryItems.FOOD]: Food[];
  public [InventoryItems.POTIONS]: Potion[];
  public [InventoryItems.RINGS]: Ring[];
  public [InventoryItems.SCROLLS]: Scroll[];
  public [InventoryItems.WEAPONS]: Weapon[];

  // Currently equipped items
  public equipped: EquippedItems;

  public equippedAccessors: EquippedInventoryItemAccessors = {
    [EquipmentSlots.NECK]: null,
    [EquipmentSlots.ARMOR]: null,
    [EquipmentSlots.LEFT_HAND]: null,
    [EquipmentSlots.RIGHT_HAND]: null,
    [EquipmentSlots.WEAPON]: null
  };

  private regenDelay = BASE_REGEN_DELAY;
  private regenDelayCounter = 0;

  public skills: SkillMap = {}

  public hunger: Hunger;
  public thirst: Thirst;

  constructor (options: PlayerOptions) {
    super(options.actorOptions);
    this.equipped = {
      [EquipmentSlots.NECK]: null,
      [EquipmentSlots.ARMOR]: null,
      [EquipmentSlots.LEFT_HAND]: null,
      [EquipmentSlots.RIGHT_HAND]: null,
      [EquipmentSlots.WEAPON]: null
    };
    for (let key in InventoryItems) {
      this[InventoryItems[key]] = [];
    }
    for (let key in options) {
      if (key !== 'actorOptions') {
        this[key] = options[key];
      }
    }
    for (let key in SkillNames) {
      const skill = SkillNames[key];
      this.skills[skill] = new Skill({
        name: <SkillNames>skill,
        level: SkillLevels.POOR,
        description: '',
        xp: 0,
        scale: [1,2,3,4,5,6,6,7]
      })
    }

    this.skills[SkillNames.ALCHEMY].allotment = LevelingAllotment.MEDIUM;

    this.hunger = new Hunger();
    this.thirst = new Thirst();
  }

  /**
   * This runs at the end of the game update loop, so do things like
   * check if the player is alive, check disease status, check leveling,
   * reset any flags
   */
  update (): Message[] {
    if (!this.isDead()) {
      if (this.hasMoveInteracted) {
        this.updateHp();
        this.updateRegenDelay();
      }
      // Render any status changes
      Game.instance.statusMenu.render();
    }
    this.hasMoveInteracted = false;
    this.hasMoved = false;
    return [];
  }

  updateHp (): void {
    if (this.regenDelayCounter === 0) {
      this.hp += this.hpRegen;
      this.hp = Random.clamp(this.hp, 0, this.maxHp);
    }
  }

  addToInventory (pickup: Pickup): void {
    this[pickup.type] = [].concat(this[pickup.type], pickup.item);
  }

  attemptToEquip (accessor: EquippedItemAccessor, slot: EquipmentSlots): boolean {
    // There's already something in that equipment slot
    if (this.equipped[slot]) {
      return false;
    // Equip the item
    } else {
      this.equipped[slot] = this[accessor.type][accessor.index];
      this.equippedAccessors[slot] = accessor;
      return true;
    }
  }

  attemptToUnequip (slot: EquipmentSlots): boolean {
    // @TODO can't unequip cursed items
    console.log(slot);
    this.equipped[slot] = null;
    console.log(this);
    return true;
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
    // Set the regen delay
    // @TODO should this be set on attack attempt or when taking damage
    this.regenDelayCounter = this.regenDelay;
    return super.attemptAttack(target);
  }

  formatSuccessfulAttack (damage: number, target: Enemy, isCritical?: boolean): Message {
    const weapon: Weapon = this.equipped[EquipmentSlots.WEAPON] as Weapon;
    const isMassiveDamage = damage >= target.massiveDamageThreshold;
    if (weapon) {
      return {
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
      return {
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

  updateRegenDelay (): void {
    // Update the regen counter after updating the hp
    if (this.regenDelayCounter) {
      this.regenDelayCounter--;
    }
  }

  debugInitializePlayer () {
    
  }

}

export { Player, PlayerOptions, Pickup, EquipmentSlots, EquippedItemAccessor,
  EquippedInventoryItemAccessors,EquippedItems, InventoryItems, TOTAL_EQUIPMENT_SLOTS };