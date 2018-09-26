"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../../Game");
const Color_1 = require("../../Canvas/Color");
const Weapon_data_1 = require("./Weapon/Weapon.data");
const Weapon_1 = require("./Weapon/Weapon");
const DetailGenerator_1 = require("./DetailGenerator");
const ossuary_1 = require("ossuary");
class PropSpawner {
    constructor() {
        this.detailGenerator = new DetailGenerator_1.DetailGenerator();
    }
    spawnWeapon(params) {
        console.log(params);
        const { legendary } = Game_1.default.instance;
        const bonus = ossuary_1.Random.randomIntRange(params.baseDamage.bonusRange);
        const damage = `d${ossuary_1.Random.randomIntRange(params.baseDamage.damageRange)}`;
        let type = Array.isArray(params.baseDamage.type) ? ossuary_1.Random.pluck(params.baseDamage.type) : params.baseDamage.type; // @TODO this isn't right
        const quality = ossuary_1.Random.pluck(params.quality);
        const index = legendary.parse(`[weapons.melee.${type}]`);
        let material;
        if (Array.isArray(params.material)) {
            material = ossuary_1.Random.pluck(params.material);
        }
        else {
            const subtype = legendary.parse(`[materials.${params.material}]`);
            console.log(subtype, 'sub');
            material = {
                type: params.material,
                subtype
            };
        }
        const baseDamage = {
            damage,
            type
        };
        const weaponOfTypeDefaults = Weapon_data_1.WeaponLookupTable[1]; // @TODO wat
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