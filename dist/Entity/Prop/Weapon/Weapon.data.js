"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prop_data_1 = require("../Prop.data");
const Prop_1 = require("../Prop");
const Player_1 = require("../../Actor/Player");
const Vector_1 = require("../../../Vector");
var WeaponType;
(function (WeaponType) {
    WeaponType["MELEE"] = "melee";
})(WeaponType || (WeaponType = {}));
var MeleeWeapons;
(function (MeleeWeapons) {
    MeleeWeapons[MeleeWeapons["SHORT_SWORD"] = 1] = "SHORT_SWORD";
    MeleeWeapons[MeleeWeapons["SCIMITAR"] = 2] = "SCIMITAR";
    MeleeWeapons[MeleeWeapons["MACE"] = 3] = "MACE";
    MeleeWeapons[MeleeWeapons["WARHAMMER"] = 4] = "WARHAMMER";
    MeleeWeapons[MeleeWeapons["RAPIER"] = 5] = "RAPIER";
    MeleeWeapons[MeleeWeapons["CLAYMORE"] = 6] = "CLAYMORE";
    MeleeWeapons[MeleeWeapons["BROADSWORD"] = 7] = "BROADSWORD";
    MeleeWeapons[MeleeWeapons["LONG_SWORD"] = 8] = "LONG_SWORD";
    MeleeWeapons[MeleeWeapons["SHOTEL"] = 9] = "SHOTEL";
    MeleeWeapons[MeleeWeapons["EPEE"] = 10] = "EPEE";
    MeleeWeapons[MeleeWeapons["CURIAS"] = 11] = "CURIAS";
    MeleeWeapons[MeleeWeapons["SHIV"] = 12] = "SHIV";
    MeleeWeapons[MeleeWeapons["DAGGER"] = 13] = "DAGGER";
    MeleeWeapons[MeleeWeapons["HAND_AXE"] = 14] = "HAND_AXE";
    MeleeWeapons[MeleeWeapons["GREATAXE"] = 15] = "GREATAXE";
    MeleeWeapons[MeleeWeapons["WHIP"] = 16] = "WHIP";
    MeleeWeapons[MeleeWeapons["CLEAVER"] = 17] = "CLEAVER";
    MeleeWeapons[MeleeWeapons["SPEAR"] = 18] = "SPEAR";
    MeleeWeapons[MeleeWeapons["LUCERNE"] = 19] = "LUCERNE";
    MeleeWeapons[MeleeWeapons["HALBERD"] = 20] = "HALBERD";
    MeleeWeapons[MeleeWeapons["LANCE"] = 21] = "LANCE";
    MeleeWeapons[MeleeWeapons["ULTRA_GREATSWORD"] = 22] = "ULTRA_GREATSWORD";
    MeleeWeapons[MeleeWeapons["ULTRA_GREATAXE"] = 23] = "ULTRA_GREATAXE";
    MeleeWeapons[MeleeWeapons["ULTRA_WARHAMMER"] = 24] = "ULTRA_WARHAMMER";
    MeleeWeapons[MeleeWeapons["ULTRA_HALBERD"] = 25] = "ULTRA_HALBERD";
})(MeleeWeapons || (MeleeWeapons = {}));
exports.MeleeWeapons = MeleeWeapons;
var RangedWeapons;
(function (RangedWeapons) {
})(RangedWeapons || (RangedWeapons = {}));
exports.RangedWeapons = RangedWeapons;
var PartNames;
(function (PartNames) {
    PartNames["HILT"] = "hilt";
    PartNames["POMMEL"] = "pommel";
})(PartNames || (PartNames = {}));
let M = MeleeWeapons;
let R = RangedWeapons;
let P = PartNames;
const Parts = {
    [P.HILT]: {
        name: P.HILT,
        decorations: [
            {
                decoration: Prop_1.Decoration.INLAID,
                decorationMaterials: [Prop_data_1.MaterialType.STONE]
            }
        ]
    }
};
exports.Parts = Parts;
const WeaponLookupTable = {
    [M.SHORT_SWORD]: {
        char: 's',
        parts: [
            Parts[P.HILT]
        ],
        name: 'short sword'
    },
};
exports.WeaponLookupTable = WeaponLookupTable;
const weaponData = {
    weapons: {
        [WeaponType.MELEE]: {
            [Prop_data_1.DamageType.SLASH]: [
                M.SHORT_SWORD,
                'scimitar'
            ],
            [Prop_data_1.DamageType.STRIKE]: [
                'mace',
                'warhammer'
            ],
            [Prop_data_1.DamageType.PIERCE]: [
                'rapier'
            ]
        }
    }
};
exports.weaponData = weaponData;
const weaponDefaultProperties = {
    type: Player_1.InventoryItems.WEAPONS,
    isPickup: true,
    isActive: true,
    pos: Vector_1.default.ZERO
};
exports.weaponDefaultProperties = weaponDefaultProperties;
//# sourceMappingURL=Weapon.data.js.map