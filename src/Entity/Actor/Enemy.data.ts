import { IEnemyType, EnemyOptions } from './Enemy';
import { ActorOptions } from './Actor';
import { StandardDice } from '../../Random/Dice';
import { Color, Colors } from '../../Canvas/Color';
import { RegionNames } from '../../Map/Regions/Regions';

enum CreatureTypes {
  UNDEAD = 'undead',
  BEAST = 'beast'
}

const {
  BEAST,
  UNDEAD
} = CreatureTypes;

enum Variations {
  FEROCIOUS = 'ferocious',
  CURSED = 'cursed'
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

interface VariantMap {
  [key: string]: Variation
}

const defaultVariations: VariantMap = {
  [Variations.FEROCIOUS]: <Variation>{
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
  }
};

const baseEnemies: EnemyOptions[] = [
  <EnemyOptions>{
    name: 'Salamander',
    cr: 1,
    xp: 25,
    enemyType: {
      creatureType: BEAST,
      variant: null,
      descriptor: 'Frozen'
    },
    actorOptions: {
      color: Colors.INDIGO,
      hp: 6,
      ac: 7,
      char: 'S',
      damage: StandardDice.d2
    }
  },
  <EnemyOptions>{
    name: 'Iguana',
    cr: 1,
    xp: 25,
    enemyType: {
      creatureType: BEAST,
      variant: null,
      descriptor: 'Lurid'
    },
    actorOptions: {
      color: Colors.RED,
      hp: 6,
      ac: 7,
      char: 'l',
      damage: StandardDice.d2
    }
  },
  <EnemyOptions>{
    name: 'Fierce Iguana',
    cr: 2,
    xp: 25,
    enemyType: {
      creatureType: BEAST,
      variant: null,
      descriptor: 'Lurid'
    },
    actorOptions: {
      color: new Color({ html: 'indigo' }),
      hp: 6,
      ac: 7,
      char: 'L',
      damage: StandardDice.d2
    }
  },
  <EnemyOptions>{
    name: 'Skeleton',
    cr: 1,
    xp: 40,
    enemyType: {
      creatureType: UNDEAD,
      variant: null,
      descriptor: ''
    },
    actorOptions: {
      color: Colors.GREEN,
      hp: 5,
      ac: 6,
      char: 'k',
      damage: StandardDice.d2
    }
  },
  <EnemyOptions>{
    name: 'Zombie',
    cr: 1,
    xp: 30,
    enemyType: {
      creatureType: UNDEAD,
      variant: null,
      descriptor: ''
    },
    actorOptions: {
      color: Colors.ORANGE,
      hp: 6,
      ac: 6,
      char: 'ø',
      damage: StandardDice.d2
    }
  }
];
export { baseEnemies, CreatureTypes, Variation, VariantModification, Variations, defaultVariations };