import { FloorGenerator, FloorGeneratorOptions } from './FloorGenerator';
import { TileSpawner } from './TileSpawner';
import { clamp } from '../Random/Dice';
import { Floor } from './Floor';

interface DungeonOptions {
  depth: number
}

const MAX_DUNGEON_DEPTH = 100;

class DungeonGenerator {

  public static MAX_DUNGEON_DEPTH = MAX_DUNGEON_DEPTH;

  public floorGenerator: FloorGenerator;
  public tileSpawner: TileSpawner;

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
    this.tileSpawner = new TileSpawner();
  }

  generateNewFloor () {
    if (this.currentDepth <= this.maxDepth) {
      this.floors.push(this.floorGenerator.generateFloor(this.currentDepth));
      this.floors[this.currentDepth].buildFloor();
      this.currentDepth += 1;
    } else {
      console.log('Player shouldnt be here.');
    }
  }

  debugAllFloors () {
    const wrapper = document.getElementById('tiles');
    this.floors.forEach((floor) => {
      const p = document.createElement('p');
      let html = `<h2>Floor ${floor.depth}</h2>`
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
      let html = `<h2>Floor ${floor.depth}</h2>`
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