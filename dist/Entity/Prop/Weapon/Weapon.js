"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("../../Actor/Player");
class Weapon {
    constructor(options) {
        this.isPickup = true;
        this.type = Player_1.InventoryItems.WEAPONS;
        for (let key in options) {
            this[key] = options[key];
        }
    }
    getDamage() {
        const { damage, bonus } = this.baseDamage;
        return `${damage}+${bonus || 0}`;
    }
    getAdditionalDamage() {
        return [];
    }
    getFormattedName() {
        const { name, material } = this;
        return `${material.subtype} ${name.toLowerCase()}`;
    }
    generateDescription() {
        return {
            description: 'This is a weapon',
            descriptionLong: 'This is the long description'
        };
    }
}
exports.Weapon = Weapon;
//# sourceMappingURL=Weapon.js.map