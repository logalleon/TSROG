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
import { Message, Messenger } from '../../Message/Messenger';
import { Enemy } from './Enemy';
import { Colors } from '../../Canvas/Color';
import Game from '../../Game';
import { clamp } from '../../Random/Random';
import { BASE_REGEN_DELAY } from './config';
import { Hunger } from './Status/Hunger';
import { Thirst } from './Status/Thirst';
import { Skill, SkillNames, ISkill, SkillLevels, LevelingAllotment } from './Skill/Skill';
import { defaultSkills, SkillMap } from './Skill/Skill.data';

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
  actorOptions: ActorOptions, // @TODO refactor this out to flatten the structure
  maxHp: number,
  level: number,
  hpRegen: number,
  los: number
}

interface EquippedInventoryItemAccessors {
  [EquipmentSlots.NECK]: EquippedItemAccessor | null,
  [EquipmentSlots.ARMOR]: EquippedItemAccessor | null,
  [EquipmentSlots.LEFT_HAND]: EquippedItemAccessor | null,
  [EquipmentSlots.RIGHT_HAND]: EquippedItemAccessor | null,
  [EquipmentSlots.WEAPON]: EquippedItemAccessor | null
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
  public equipped: EquippedItems = {
    [EquipmentSlots.NECK]: null,
    [EquipmentSlots.ARMOR]: null,
    [EquipmentSlots.LEFT_HAND]: null,
    [EquipmentSlots.RIGHT_HAND]: null,
    [EquipmentSlots.WEAPON]: null
  };

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
      this.hp = clamp(this.hp, 0, this.maxHp);
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
    const weapon = this.equipped[EquipmentSlots.WEAPON];
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

export { Player, PlayerOptions, Pickup, EquipmentSlots, EquippedItemAccessor, EquippedInventoryItemAccessors,EquippedItems, InventoryItems };