import { EnemyOptions } from './Enemy';
import { ActorOptions } from './Actor';
import { Color, Colors } from '../../Canvas/Color';
import { RegionNames } from '../../Map/Regions/Regions';
import { Dice } from 'ossuary';

enum CreatureTypes {
  UNDEAD = 'UNDEAD',
  BEAST = 'BEAST'
}

const {
  BEAST,
  UNDEAD
} = CreatureTypes;

enum Variations {
  FEROCIOUS = 'FEROCIOUS',
  CURSED = 'CURSED'
}

interface Variation {
  name: Variations,
  modifications: VariantModification[],
  xpmod: VariantModification,
  crmod: VariantModification
}

interface VariantModification {
  [key: string]: {
    multiply?: number,
    add?: number
  }
}

type V = keyof typeof Variations;
type VariantMap = {
  [Key in V]: Variation
}

const defaultVariations: VariantMap = {
  [Variations.FEROCIOUS]: {
    name: Variations.FEROCIOUS,
    xpmod: <VariantModification>{
      xp: {
        multiply: 1.2
      }
    },
    crmod: <VariantModification>{
      cr: {
        add: 1
      }
    },
    modifications: <VariantModification[]>[
      {
        hp: {
          multiply: 1.4
        }
      }
    ],
  } as Variation,
  [Variations.CURSED]: { // TODO
    name: Variations.FEROCIOUS,
    xpmod: <VariantModification>{
      xp: {
        multiply: 1.2
      }
    },
    crmod: <VariantModification>{
      cr: {
        add: 1
      }
    },
    modifications: <VariantModification[]>[
      {
        hp: {
          multiply: 1.4
        }
      }
    ],
  } as Variation
};

// Base enemies
const zombie: EnemyOptions = {
  name: 'Zombie',
  cr: 1,
  xp: 30,
  creatureType: UNDEAD,
  actorOptions: {
    color: Colors.RED,
    hp: 6,
    ac: 6,
    char: 'z',
    damage: Dice.StandardDice.d2
  }
};

const skeleton: EnemyOptions = {
  name: 'Skeleton',
  cr: 1,
  xp: 40,
  creatureType: UNDEAD,
  actorOptions: {
    color: new Color({ hex: '#ab7799' }),
    hp: 5,
    ac: 6,
    char: 's',
    damage: Dice.StandardDice.d2
  }
};

const baseEnemies: EnemyOptions[] = [
  zombie,
  skeleton
];
export { baseEnemies, CreatureTypes, Variation, VariantModification, Variations, defaultVariations };