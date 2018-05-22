import { IEnemyType, EnemyOptions } from './Enemy';
import { ActorOptions } from './Actor';
import { randomInt, StandardDice } from '../../Random/Dice';
import { Color, Colors } from '../../Canvas/Color';

enum CreatureTypes {
  UNDEAD = 'undead',
  BEAST = 'beast'
}

const {
  BEAST,
  UNDEAD
} = CreatureTypes;

const baseEnemies: EnemyOptions[] = [
  <EnemyOptions>{
    name: 'Salamander',
    cr: 1,
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
    name: 'Skeleton',
    cr: 1,
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
  }
];
export { baseEnemies, CreatureTypes };