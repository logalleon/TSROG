import { Enemy, IEnemyType } from '../Actor/Enemy';

interface EnemyHashMap {
  [key: string]: Enemy[]
}

class EnemySpawner {

  public baseEnemies: Enemy[];

  public enemiesByCR: EnemyHashMap;
  public enemiesByCreatureType: EnemyHashMap;

  constructor () {
    // this.baseEnemies = this.loadEnemies();
    this.generateEnemyHashMaps();
  }

  generateEnemyHashMaps (): void {
    this.enemiesByCR = {};
    this.enemiesByCreatureType = {};
    this.baseEnemies.forEach((enemy) => {
      const { cr, enemyType } = enemy;
      const { creatureType } = enemyType;
      this.enemiesByCR[cr] ? this.enemiesByCR[cr].push(enemy) : this.enemiesByCR[cr] = [enemy];
      this.enemiesByCR[creatureType] ? this.enemiesByCR[creatureType].push(enemy) : this.enemiesByCR[creatureType] = [enemy];
    });
  }

  generateVariantEnemy (base: Enemy): Enemy {
    return base;
  }

}
export { EnemySpawner }