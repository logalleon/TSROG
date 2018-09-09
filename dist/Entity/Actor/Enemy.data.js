"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dice_1 = require("../../Random/Dice");
const Color_1 = require("../../Canvas/Color");
var CreatureTypes;
(function (CreatureTypes) {
    CreatureTypes["UNDEAD"] = "undead";
    CreatureTypes["BEAST"] = "beast";
})(CreatureTypes || (CreatureTypes = {}));
exports.CreatureTypes = CreatureTypes;
const { BEAST, UNDEAD } = CreatureTypes;
var Variations;
(function (Variations) {
    Variations["FEROCIOUS"] = "ferocious";
    Variations["CURSED"] = "cursed";
})(Variations || (Variations = {}));
exports.Variations = Variations;
const defaultVariations = {
    [Variations.FEROCIOUS]: {
        name: Variations.FEROCIOUS,
        xpmod: {
            xp: {
                multiply: 1.2
            }
        },
        crmod: {
            cr: {
                add: 1
            }
        },
        modifications: [
            {
                hp: {
                    multiply: 1.4
                }
            }
        ],
    }
};
exports.defaultVariations = defaultVariations;
// Base enemies
const zombie = {
    name: 'Zombie',
    cr: 1,
    xp: 30,
    creatureType: UNDEAD,
    actorOptions: {
        color: Color_1.Colors.RED,
        hp: 6,
        ac: 6,
        char: 'z',
        damage: Dice_1.StandardDice.d2
    }
};
const skeleton = {
    name: 'Skeleton',
    cr: 1,
    xp: 40,
    creatureType: UNDEAD,
    actorOptions: {
        color: new Color_1.Color({ hex: '#ab7799' }),
        hp: 5,
        ac: 6,
        char: 's',
        damage: Dice_1.StandardDice.d2
    }
};
const baseEnemies = [
    zombie,
    skeleton
];
exports.baseEnemies = baseEnemies;
//# sourceMappingURL=Enemy.data.js.map