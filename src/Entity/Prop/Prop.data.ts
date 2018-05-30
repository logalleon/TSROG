enum Quality {
  RUINED = 'ruined',
  POOR = 'poor',
  FAIR = 'fair',
  COMMON = 'common',
  GOOD = 'good',
  EXCEPTIONAL = 'exceptional',
  LEGENDARY = 'legendary',
  MYTHICAL = 'mythical'
}

interface Material {
  type: MaterialType,
  subtype: MaterialSubtype
}

interface Damage {
  damage: string,
  bonus?: number,
  type: DamageType
}

enum MaterialType {
  METAL = 'metal',
  WOOD = 'wood',
  STONE = 'stone',
  BONE = 'bone',
  LEATHER = 'leather',
  CLOTH = 'cloth'
}

enum MaterialSubtype {
  // Metals
  IRON = 'iron',
  STEEL = 'steel',
  COPPER = 'copper',
  BRASS = 'brass',
  BRONZE = 'bronze',
  // Wood
  CHERRY = 'cherry',
  OAK = 'oak',
  DARK_OAK = 'dark oak',
  MAHOGANY = 'mahogany',
  MAPLE = 'maple',
  // Stone
  GRANITE = 'granite',
  MARBLE = 'marble',
  OBSIDIAN = 'obsidian',
  // Bone
  // Leather
  // Cloth
  FLAX = 'flax',
  LINEN = 'linen'
}

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
    [T.BONE]: [

    ],
    [T.LEATHER]: [

    ],
    [T.CLOTH]: [
      S.FLAX,
      S.LINEN
    ]
  }
}

enum WeaponType {
  MELEE = 'melee'
}

enum DamageType {
  SLASH = 'slash',
  STRIKE = 'strike',
  PIERCE = 'pierce',
  FIRE = 'fire',
  COLD = 'cold',
  HOLY = 'holy',
  SHADOW = 'shadow',
  SHOCK = 'shock',
  POISON = 'poison',
  ARCANE = 'arcane',
  NECROTIC = 'necrotic'
}

// For consumption by Legendary
const weaponData = {
  weapons: {
    [WeaponType.MELEE]: {
      [DamageType.SLASH]: [
        'short sword',
        'scimitar'
      ],
      [DamageType.STRIKE]: [
        'mace',
        'warhammer'
      ],
      [DamageType.PIERCE]: [
        'rapier'
      ]
    }
  }
}

export {
  Quality,
  weaponData,
  Material,
  MaterialType,
  MaterialSubtype,
  WeaponType,
  DamageType,
  materialData,
  Damage
};