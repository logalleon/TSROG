"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
const Messenger_1 = require("../../Message/Messenger");
const Color_1 = require("../../Canvas/Color");
const Game_1 = require("../../Game");
const Random_1 = require("../../Random/Random");
const config_1 = require("./config");
const Hunger_1 = require("./Status/Hunger");
const Thirst_1 = require("./Status/Thirst");
const Skill_1 = require("./Skill/Skill");
const { colorize } = Messenger_1.Messenger;
var InventoryItems;
(function (InventoryItems) {
    InventoryItems["AMULETS"] = "amulets";
    InventoryItems["ARMOR"] = "armor";
    InventoryItems["FOOD"] = "food";
    InventoryItems["KEYS"] = "keys";
    InventoryItems["POTIONS"] = "potions";
    InventoryItems["RINGS"] = "rings";
    InventoryItems["SCROLLS"] = "scrolls";
    InventoryItems["WEAPONS"] = "weapons";
})(InventoryItems || (InventoryItems = {}));
exports.InventoryItems = InventoryItems;
var EquipmentSlots;
(function (EquipmentSlots) {
    EquipmentSlots["NECK"] = "neck";
    EquipmentSlots["ARMOR"] = "armor";
    EquipmentSlots["LEFT_HAND"] = "left hand";
    EquipmentSlots["RIGHT_HAND"] = "right hand";
    EquipmentSlots["WEAPON"] = "weapon";
})(EquipmentSlots || (EquipmentSlots = {}));
exports.EquipmentSlots = EquipmentSlots;
class Player extends Actor_1.Actor {
    constructor(options) {
        super(options.actorOptions);
        // Movement and turn-related activities
        this.hasMoveInteracted = false;
        this.hasMoved = false;
        // Currently equipped items
        this.equipped = {
            [EquipmentSlots.NECK]: null,
            [EquipmentSlots.ARMOR]: null,
            [EquipmentSlots.LEFT_HAND]: null,
            [EquipmentSlots.RIGHT_HAND]: null,
            [EquipmentSlots.WEAPON]: null
        };
        this.equippedAccessors = {
            [EquipmentSlots.NECK]: null,
            [EquipmentSlots.ARMOR]: null,
            [EquipmentSlots.LEFT_HAND]: null,
            [EquipmentSlots.RIGHT_HAND]: null,
            [EquipmentSlots.WEAPON]: null
        };
        this.regenDelay = config_1.BASE_REGEN_DELAY;
        this.regenDelayCounter = 0;
        this.skills = {};
        for (let key in InventoryItems) {
            this[InventoryItems[key]] = [];
        }
        for (let key in options) {
            if (key !== 'actorOptions') {
                this[key] = options[key];
            }
        }
        for (let key in Skill_1.SkillNames) {
            const skill = Skill_1.SkillNames[key];
            this.skills[skill] = new Skill_1.Skill({
                name: skill,
                level: Skill_1.SkillLevels.POOR,
                description: '',
                xp: 0,
                scale: [1, 2, 3, 4, 5, 6, 6, 7]
            });
        }
        this.skills[Skill_1.SkillNames.ALCHEMY].allotment = Skill_1.LevelingAllotment.MEDIUM;
        this.hunger = new Hunger_1.Hunger();
        this.thirst = new Thirst_1.Thirst();
    }
    /**
     * This runs at the end of the game update loop, so do things like
     * check if the player is alive, check disease status, check leveling,
     * reset any flags
     */
    update() {
        if (!this.isDead()) {
            if (this.hasMoveInteracted) {
                this.updateHp();
                this.updateRegenDelay();
            }
            // Render any status changes
            Game_1.default.instance.statusMenu.render();
        }
        this.hasMoveInteracted = false;
        this.hasMoved = false;
        return [];
    }
    updateHp() {
        if (this.regenDelayCounter === 0) {
            this.hp += this.hpRegen;
            this.hp = Random_1.clamp(this.hp, 0, this.maxHp);
        }
    }
    addToInventory(pickup) {
        this[pickup.type] = [].concat(this[pickup.type], pickup.item);
    }
    attemptToEquip(accessor, slot) {
        // There's already something in that equipment slot
        if (this.equipped[slot]) {
            return false;
            // Equip the item
        }
        else {
            this.equipped[slot] = this[accessor.type][accessor.index];
            this.equippedAccessors[slot] = accessor;
            return true;
        }
    }
    attemptToUnequip(slot) {
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
    move(destination) {
        super.move(destination);
        // Set the player tile to open
        // When the game first starts, this may not yet be initialized
        if (Game_1.default.instance) {
            Game_1.default.instance.setTileToOpen(destination);
        }
        this.hasMoveInteracted = true;
        this.hasMoved = true;
    }
    /**
     * @override
     * @param target {Actor}
     */
    attemptAttack(target) {
        this.hasMoveInteracted = true;
        // Set the regen delay
        // @TODO should this be set on attack attempt or when taking damage
        this.regenDelayCounter = this.regenDelay;
        return super.attemptAttack(target);
    }
    formatSuccessfulAttack(damage, target, isCritical) {
        const weapon = this.equipped[EquipmentSlots.WEAPON];
        const isMassiveDamage = damage >= target.massiveDamageThreshold;
        if (weapon) {
            return {
                color: Color_1.Colors.DEFAULT,
                text: `You strike the
        ${colorize(target.formattedName(), Color_1.Colors.TARGET_DEFAULT)} with your 
        ${weapon.getFormattedName()} for 
        ${colorize(String(damage), isMassiveDamage ? Color_1.Colors.DAMAGE_MASSIVE :
                    Color_1.Colors.DAMAGE_DEFAULT)} damage!`
            };
        }
        else {
            return {
                text: `You strike the ${target.formattedName()} ${target.formattedChar()} for your bare hands for ${damage} damage!`,
                color: Color_1.Colors.DEFAULT
            };
        }
    }
    formatUnsuccessfulAttack(target) {
        return {
            color: Color_1.Colors.DEFAULT,
            text: `
        You attempt to attack the 
        ${target.formattedName()} ${target.formattedChar()}
        ${colorize(` but it evades your blows!`, Color_1.Colors.MISS_DEFAULT)}
      `
        };
    }
    updateRegenDelay() {
        // Update the regen counter after updating the hp
        if (this.regenDelayCounter) {
            this.regenDelayCounter--;
        }
    }
    debugInitializePlayer() {
    }
}
InventoryItems.AMULETS, InventoryItems.ARMOR, InventoryItems.FOOD, InventoryItems.POTIONS, InventoryItems.RINGS, InventoryItems.SCROLLS, InventoryItems.WEAPONS;
exports.Player = Player;
//# sourceMappingURL=Player.js.map