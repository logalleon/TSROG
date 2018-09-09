"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quality;
(function (Quality) {
    Quality["RUINED"] = "ruined";
    Quality["POOR"] = "poor";
    Quality["FAIR"] = "fair";
    Quality["COMMON"] = "common";
    Quality["GOOD"] = "good";
    Quality["EXCEPTIONAL"] = "exceptional";
    Quality["LEGENDARY"] = "legendary";
    Quality["MYTHICAL"] = "mythical";
})(Quality || (Quality = {}));
exports.Quality = Quality;
var MaterialType;
(function (MaterialType) {
    MaterialType["METAL"] = "metal";
    MaterialType["WOOD"] = "wood";
    MaterialType["STONE"] = "stone";
    MaterialType["BONE"] = "bone";
    MaterialType["LEATHER"] = "leather";
    MaterialType["CLOTH"] = "cloth";
})(MaterialType || (MaterialType = {}));
exports.MaterialType = MaterialType;
var MaterialSubtype;
(function (MaterialSubtype) {
    // Metals
    MaterialSubtype["IRON"] = "iron";
    MaterialSubtype["STEEL"] = "steel";
    MaterialSubtype["COPPER"] = "copper";
    MaterialSubtype["BRASS"] = "brass";
    MaterialSubtype["BRONZE"] = "bronze";
    // Wood
    MaterialSubtype["CHERRY"] = "cherry";
    MaterialSubtype["OAK"] = "oak";
    MaterialSubtype["DARK_OAK"] = "dark oak";
    MaterialSubtype["MAHOGANY"] = "mahogany";
    MaterialSubtype["MAPLE"] = "maple";
    // Stone
    MaterialSubtype["GRANITE"] = "granite";
    MaterialSubtype["MARBLE"] = "marble";
    MaterialSubtype["OBSIDIAN"] = "obsidian";
    // Bone
    // Leather
    // Cloth
    MaterialSubtype["FLAX"] = "flax";
    MaterialSubtype["LINEN"] = "linen";
})(MaterialSubtype || (MaterialSubtype = {}));
exports.MaterialSubtype = MaterialSubtype;
let T = MaterialType;
let S = MaterialSubtype;
const materialData = {
    materials: {
        [T.METAL]: [
            S.IRON,
            S.STEEL
        ],
        [T.STONE]: [
            S.GRANITE,
            S.MARBLE,
            S.OBSIDIAN
        ],
        [T.WOOD]: [
            S.CHERRY,
            S.OAK,
            S.DARK_OAK,
            S.MAHOGANY,
            S.MAPLE
        ],
        [T.BONE]: [],
        [T.LEATHER]: [],
        [T.CLOTH]: [
            S.FLAX,
            S.LINEN
        ]
    }
};
exports.materialData = materialData;
var DamageType;
(function (DamageType) {
    DamageType["SLASH"] = "slash";
    DamageType["STRIKE"] = "strike";
    DamageType["PIERCE"] = "pierce";
    DamageType["FIRE"] = "fire";
    DamageType["COLD"] = "cold";
    DamageType["HOLY"] = "holy";
    DamageType["SHADOW"] = "shadow";
    DamageType["SHOCK"] = "shock";
    DamageType["POISON"] = "poison";
    DamageType["ARCANE"] = "arcane";
    DamageType["NECROTIC"] = "necrotic";
})(DamageType || (DamageType = {}));
exports.DamageType = DamageType;
//# sourceMappingURL=Prop.data.js.map