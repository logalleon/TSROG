"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prop_1 = require("../Prop");
const Game_1 = require("../../../Game");
const ossuary_1 = require("ossuary");
const Util_1 = require("../../../Util");
class Weapon extends Prop_1.AbstractDamagingPickupMaterialProp {
    constructor(options) {
        super(options);
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
        let partsToDescribe = Game_1.default.instance.dungeonGenerator.propSpawner.detailGenerator.getNumberOfDetails(this.quality);
        const parts = Util_1.shuffle([].concat(this.parts));
        if (partsToDescribe > parts.length) {
            partsToDescribe = parts.length;
        }
        let description = `The ${this.getFormattedName()} is of ${this.quality} quality.`;
        let descriptionLong = '';
        // @TODO shuffle the array of parts
        for (let i = 0; i < partsToDescribe; i++) {
            const part = parts[i];
            const { name, details } = part;
            description += ` The ${name} `;
            const phrase = ossuary_1.Random.pluck(details);
            description += `${Game_1.default.instance.legendary.recursiveslyParse(phrase(this.quality, Game_1.default.instance))}`
                .replace(/\n/g, '')
                .replace(/\t/g, '');
        }
        return { description, descriptionLong };
    }
}
exports.Weapon = Weapon;
//# sourceMappingURL=Weapon.js.map