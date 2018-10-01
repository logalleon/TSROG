import Game from "../../../Game";
import { Colors } from "../../../Canvas/Color";
import { Enemy } from "../Enemy";

class EnemyCorpseSpawner {

  generateCorpse (enemy: Enemy) {
    const { pos } = enemy;
    const { x, y } = pos;
    Game.instance.currentFloor.tiles[y][x].char = Game.instance.currentFloor.tiles[y][x].occupiers[0].char; // @TODO this needs to get the actual index of the enemy and use it
    Game.instance.currentFloor.tiles[y][x].color = Colors.STANDARD_CORPSE;
  }

}

export { EnemyCorpseSpawner };