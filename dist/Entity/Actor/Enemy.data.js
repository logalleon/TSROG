"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../../Canvas/Color");
const ossuary_1 = require("ossuary");
var CreatureTypes;
(function (CreatureTypes) {
    CreatureTypes["UNDEAD"] = "UNDEAD";
    CreatureTypes["BEAST"] = "BEAST";
})(CreatureTypes || (CreatureTypes = {}));
exports.CreatureTypes = CreatureTypes;
const { BEAST, UNDEAD } = CreatureTypes;
var Variations;
(function (Variations) {
    Variations["FEROCIOUS"] = "FEROCIOUS";
    Variations["CURSED"] = "CURSED";
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
    },
    [Variations.CURSED]: {
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
        damage: ossuary_1.Dice.StandardDice.d2
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
        damage: ossuary_1.Dice.StandardDice.d2
    }
};
const baseEnemies = [
    zombie,
    skeleton
];
exports.baseEnemies = baseEnemies;
//# sourceMappingURL=Enemy.data.js.map