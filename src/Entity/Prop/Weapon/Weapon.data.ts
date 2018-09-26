import { DamageType, MaterialType, Quality, Material, MaterialSubtype } from "../Prop.data";
import { Pickup, HasParts, Part } from "../Prop";
import { WeaponChar, WeaponDefaultProps } from "./WeaponInterfaces";
import { InventoryItems } from "../../Actor/Player";
import Vector2 from "../../../Vector";
import Game from "../../../Game";
import { Inlaid, Scratched } from "../Detail.data";

enum WeaponType {
  MELEE = 'melee'
}

enum MeleeWeapons {
  SHORT_SWORD = 1,
  SCIMITAR = 2,
  MACE = 3,
  WARHAMMER = 4,
  RAPIER = 5,
  CLAYMORE = 6,
  BROADSWORD = 7,
  LONG_SWORD = 8,
  SHOTEL = 9,
  EPEE = 10,
  CURIAS = 11,
  SHIV = 12,
  DAGGER = 13,
  HAND_AXE = 14,
  GREATAXE = 15,
  WHIP = 16,
  CLEAVER = 17,
  SPEAR = 18,
  LUCERNE = 19,
  HALBERD = 20,
  LANCE = 21,
  ULTRA_GREATSWORD = 22,
  ULTRA_GREATAXE = 23,
  ULTRA_WARHAMMER = 24,
  ULTRA_HALBERD = 25,
}

enum RangedWeapons {

}

enum PartNames {
  HILT = 'hilt',
  POMMEL = 'pommel',
  BLADE = 'blade'
}

type WeaponPartial = WeaponChar & HasParts;

interface WeaponMap {
  [key: number]: WeaponPartial
}

interface PartsMap {
  [key: string]: Part
}

let M = MeleeWeapons;
let R = RangedWeapons;
let P = PartNames;
let MT = MaterialType;

const Parts: PartsMap = {
  [P.HILT]: {
    name: P.HILT,
    details: [Inlaid([MT.STONE])]
  },
  [P.POMMEL]: {
    name: P.POMMEL,
    details: [Inlaid([MT.BONE])]
  },
  [P.BLADE]: {
    name: P.BLADE,
    details: [Scratched()]
  }
}

const WeaponLookupTable: WeaponMap = {
  [M.SHORT_SWORD]: {
    char: 's',
    parts: [
      Parts[P.HILT],
      Parts[P.BLADE],
      Parts[P.POMMEL]
    ],
    name: 'short sword'
  },
  // [M.SCIMITAR]: 'ś',
  // [M.MACE]: 'm',
  // [M.WARHAMMER]: 'w',
  // [M.RAPIER]: 'î'
};

const weaponData = {
  weapons: {
    [WeaponType.MELEE]: {
      [DamageType.SLASH]: [
        M.SHORT_SWORD,
        //M.SCIMITAR
      ],
      [DamageType.STRIKE]: [
        M.MACE,
        M.WARHAMMER
      ],
      [DamageType.PIERCE]: [
        M.RAPIER
      ]
    }
  }
}

const weaponDefaultProperties: WeaponDefaultProps = {
  type: InventoryItems.WEAPONS,
  canBePickedUp: true,
  isActive: true,
  pos: Vector2.ZERO
}

export { Parts, WeaponLookupTable, weaponData, weaponDefaultProperties, MeleeWeapons, RangedWeapons }
