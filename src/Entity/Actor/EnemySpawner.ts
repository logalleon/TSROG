import { Enemy, IEnemyType, EnemyOptions } from '../Actor/Enemy';
import { baseEnemies, CreatureTypes, Variation } from './Enemy.data';
import { randomInt, pluck } from '../../Random/Dice';

interface EnemyHashMap {
  [key: string]: EnemyOptions[]
}

class EnemySpawner {

  public baseEnemies: EnemyOptions[];

  public enemiesByCR: EnemyHashMap;
  public enemiesByCreatureType: EnemyHashMap;

  constructor () {
    // this.baseEnemies = this.loadEnemies();
    this.baseEnemies = baseEnemies;
    this.generateEnemyHashMaps();
  }

  generateEnemyHashMaps (): void {
    this.enemiesByCR = {};
    this.enemiesByCreatureType = {};
    this.baseEnemies.forEach((enemy) => {
      const { cr, enemyType } = enemy;
      const { creatureType } = enemyType;
      this.enemiesByCR[cr] ? 
        this.enemiesByCR[cr].push(enemy) :
        this.enemiesByCR[cr] = [enemy];
      this.enemiesByCreatureType[creatureType] ?
        this.enemiesByCreatureType[creatureType].push(enemy) :
        this.enemiesByCreatureType[creatureType] = [enemy];
    });
  }

  generateVariantEnemy (base: Enemy): Enemy {
    return base;
  }

  createEnemyByCr (cr: number, variant?: Variation): Enemy {
    if (this.enemiesByCR[cr]) {
      const options = pluck(this.enemiesByCR[cr]);
      return new Enemy(options, variant);
    } else {
      console.log('No enemies by that cr');
    }
  }

  createEnemyByCreatureType (creatureType: CreatureTypes, variant?: Variation) {
    if (this.enemiesByCreatureType[creatureType]) {
      const options = pluck(this.enemiesByCreatureType[creatureType]);
      return new Enemy(options, variant);
    } else {
      console.log('No enemies by that creature type')
    }
  }

}
export { EnemySpawner }