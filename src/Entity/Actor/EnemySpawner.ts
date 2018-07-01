import { Enemy, EnemyOptions } from '../Actor/Enemy';
import { baseEnemies, CreatureTypes, Variation } from './Enemy.data';
import { randomInt, pluck } from '../../Random/Random';
import { RegionNames } from '../../Map/Regions/Regions';

import { enemyOptions as LEO } from '../../Map/Regions/Lorlerach';

interface EnemyHashMap {
  [key: string]: EnemyOptions[]
}

class EnemySpawner {

  public baseEnemies: EnemyOptions[];

  public enemiesByCR: EnemyHashMap;
  public enemiesByCreatureType: EnemyHashMap;

  constructor () {
    // this.baseEnemies = this.loadEnemies();
    this.baseEnemies = [].concat(
      baseEnemies,
      LEO
    );
    this.generateEnemyHashMaps();
  }

  generateEnemyHashMaps (): void {
    this.enemiesByCR = {};
    this.enemiesByCreatureType = {};
    this.baseEnemies.forEach((enemy) => {
      const { cr, creatureType } = enemy;
      this.enemiesByCR[cr] ? 
        this.enemiesByCR[cr].push(enemy) :
        this.enemiesByCR[cr] = [enemy];
      const ct: string = Array.isArray(creatureType) ? creatureType[0] : creatureType;
      this.enemiesByCreatureType[ct] ?
        this.enemiesByCreatureType[ct].push(enemy) :
        this.enemiesByCreatureType[ct] = [enemy];
    });
  }

  generateVariantEnemy (base: Enemy): Enemy {
    return base;
  }

  createEnemyByCr (cr: number, variant?: Variation, region?: RegionNames): Enemy {
    if (this.enemiesByCR[cr]) {
      let options;
      if (region) {
        options = pluck(this.enemiesByCR[cr].filter((enemyOptions) => {
          const regions: RegionNames[] = enemyOptions.regions;
          return (typeof regions === 'undefined' || regions.includes(region));
        }));
      } else {
        options = pluck(this.enemiesByCR[cr]);
      }
      return new Enemy(options, variant);
    } else {
      console.log('No enemies by that cr');
    }
  }

  createEnemyByCreatureType (creatureType: CreatureTypes, variant?: Variation, region?: RegionNames) {
    if (this.enemiesByCreatureType[creatureType]) {
      const options = pluck(this.enemiesByCreatureType[creatureType]);
      return new Enemy(options, variant);
    } else {
      console.log('No enemies by that creature type')
    }
  }

}
export { EnemySpawner }