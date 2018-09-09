"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../../Game");
const Random_1 = require("../../Random/Random");
const Color_1 = require("../../Canvas/Color");
const Weapon_data_1 = require("./Weapon/Weapon.data");
const Weapon_1 = require("./Weapon/Weapon");
class PropSpawner {
    constructor() {
    }
    spawnWeapon(params) {
        const { legendary } = Game_1.default.instance;
        const bonus = Random_1.randomIntR(params.baseDamage.bonusRange);
        const damage = `d${Random_1.randomIntR(params.baseDamage.damageRange)}`;
        let type = Array.isArray(params.baseDamage.type) ? Random_1.pluck(params.baseDamage.type) : params.baseDamage.type; // @TODO this isn't right
        const quality = Random_1.pluck(params.quality);
        const index = legendary.parse(`[weapons.melee.${type}]`);
        let material;
        if (Array.isArray(params.material)) {
            material = Random_1.pluck(params.material);
        }
        else {
            const subtype = legendary.parse(`[${params.material}]`);
            material = {
                type: params.material,
                subtype
            };
        }
        const baseDamage = {
            damage,
            type
        };
        const weaponOfTypeDefaults = Weapon_data_1.WeaponLookupTable[Weapon_data_1.MeleeWeapons[index]];
        const weaponDefaults = Weapon_data_1.weaponDefaultProperties;
        const options = Object.assign({}, {
            color: Color_1.Colors.RED,
            weight: 0,
            material,
            quality,
            baseDamage // @TODO handle additional damage
        }, weaponOfTypeDefaults, weaponDefaults); // @TODO it isn't explicit that Object.assign
        // is properly merging the attributes of weapon of type and weapon defaults
        // this should be made explicit as to pickup any changes to interfaces down the road
        const weapon = new Weapon_1.Weapon(options);
        if (!weapon.description) { // @TODO this is for the future, if a weapon has a specified description (special items)
            const { description, descriptionLong } = weapon.generateDescription();
            weapon.description = description;
            weapon.descriptionLong = descriptionLong;
        }
        console.log(weapon);
        return weapon;
    }
}
exports.PropSpawner = PropSpawner;
//# sourceMappingURL=PropSpawner.js.map