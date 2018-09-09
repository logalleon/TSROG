import { FloorGenerator, FloorGeneratorOptions } from './FloorGenerator';
import { TileSpawner } from './TileSpawner';
import { clamp } from '../Random/Random';
import { Floor } from './Floor';
import { convert } from 'roman-numeral';
import { TileTypes } from './Tile';
import { PropSpawner } from '../Entity/Prop/PropSpawner';
import { EnemySpawner } from '../Entity/Actor/EnemySpawner';

interface DungeonOptions {
  depth: number
}

const MAX_DUNGEON_DEPTH = 100;

class DungeonGenerator {

  public static MAX_DUNGEON_DEPTH = MAX_DUNGEON_DEPTH;

  public floorGenerator: FloorGenerator;
  public enemySpawner: EnemySpawner;
  public tileSpawner: TileSpawner;
  public propSpawner: PropSpawner;

  public maxDepth: number;
  public initialDepth: number = 0;
  public currentDepth: number = 0;

  public floors: Floor[] = [];

  constructor (options: DungeonOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
    this.maxDepth = clamp(options.depth, 1, DungeonGenerator.MAX_DUNGEON_DEPTH);
    this.floorGenerator = new FloorGenerator(<FloorGeneratorOptions>{});
    this.enemySpawner = new EnemySpawner();
    this.tileSpawner = new TileSpawner();
    this.propSpawner = new PropSpawner();
  }

  generateNewFloor () {
    if (this.currentDepth <= this.maxDepth) {
      // Generate a similar floor if the previous floor had persistance
      if (this.nextFloorShouldPersist()) {
        this.floors.push(this.floorGenerator.generateSimilarFloor(
          this.currentDepth,
          this.floors[this.currentDepth - 1].floorPersistance.startIndex
        ));
      } else {
        this.floors.push(this.floorGenerator.generateFloor(<FloorGeneratorOptions>{
          depth: this.currentDepth
        }));
      }
      // Make sure to set the depth here
      this.floors[this.currentDepth].depth = this.currentDepth;
      this.floors[this.currentDepth].buildFloor();
      this.currentDepth += 1;
    } else {
      console.log('Player shouldnt be here.');
    }
  }

  nextFloorShouldPersist (): boolean {
    if (this.currentDepth === 0 || !this.floors[this.currentDepth - 1].floorPersistance) {
      return false;
    }
    const { startIndex } = this.floors[this.currentDepth - 1].floorPersistance;
    const startingFloor = this.floors[startIndex];
    const { willPersistFor } = startingFloor;
    // The floor should only persist if the persistance value hasn't stopped
    return (this.currentDepth - startingFloor.depth <= willPersistFor);
  }

  debugAllFloors () {
    const wrapper = document.getElementById('tiles');
    this.floors.forEach((floor) => {
      const p = document.createElement('p');
      let html = `<h2>${floor.getFormattedName()}</h2>`
      for (let y = 0; y < floor.floorHeight; y++) {
        for (let x = 0; x < floor.floorWidth; x++) {
          const tile = floor.tiles[y][x];
          const { char, color } = tile;
          html += `<span class='tile' style="color: ${color.val()}">${char}</span>`;
        }
        html += '<br/>'
      }
      p.innerHTML = html;
      wrapper.appendChild(p);
    });
  }

  debugAndGenerateAllFloors () {
    for (let i = 0; i < this.maxDepth; i++) {
      this.generateNewFloor();
    }
    const wrapper = document.getElementById('tiles');
    this.floors.forEach((floor) => {
      const p = document.createElement('p');
      let html = `<h2>${floor.getFormattedName()}</h2>`
      for (let y = 0; y < floor.floorHeight; y++) {
        for (let x = 0; x < floor.floorWidth; x++) {
          const tile = floor.tiles[y][x];
          const { char, color } = tile;
          html += `<span class='tile' style="color: ${color.val()}">${char}</span>`;
        }
        html += '<br/>'
      }
      p.innerHTML = html;
      wrapper.appendChild(p);
    });
  }

}
export { DungeonGenerator, DungeonOptions, MAX_DUNGEON_DEPTH };