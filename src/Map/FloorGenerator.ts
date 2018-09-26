import { Room } from './Room';
import { Corridor, Direction } from './Corridor';
import { Color } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';
import { Enemy } from '../Entity/Actor/Enemy';
import { FloorOptions, Floor, FloorPersistance } from './Floor';
import Game from '../Game';
import { floorData } from './Floor.data';
import { Random } from 'ossuary';

interface FloorGeneratorOptions {
  depth?: number
}

class FloorGenerator {

  public floorData: FloorOptions[];

  constructor (options: FloorGeneratorOptions) {
    this.floorData = floorData;
  }

  generateFloor (options: FloorGeneratorOptions): Floor {
    const possibleFloors = this.floorData.filter((floor) => {
      const allowed = true;
      if (typeof options.depth !== 'undefined') {
        if (floor.depthRange.low > options.depth || floor.depthRange.high < options.depth) {
          return false;
        }
      }
      return allowed;
    });
    return new Floor(Random.pluck(possibleFloors));
  }

  /**
   * Generates similar persistance floor
   * @param depth {number}
   */
  generateSimilarFloor (depth: number, startIndex: number): Floor {
    // If the floorPersistance just has and index value, it's part of a prior series
    const { floors } = Game.instance.dungeonGenerator;
    const startingFloor = floors[startIndex];
    const similarFloor = new Floor({
      maxCR: startingFloor.maxCR,
      floorCRRange: startingFloor.floorCRRange,
      depthRange: startingFloor.depthRange,
      variantEnemiesRange: startingFloor.variantEnemiesRange,
      roomHeightRange: startingFloor.roomHeightRange,
      roomWidthRange: startingFloor.roomWidthRange,
      corridorLengthRange: startingFloor.corridorLengthRange,
      numRoomsRange: startingFloor.numRoomsRange,
      floorHeight: startingFloor.floorHeight,
      floorWidth: startingFloor.floorWidth,
      pickupsRange: startingFloor.pickupsRange,
      name: startingFloor.name,
      regionName: startingFloor.regionName
    });
    const persistance: FloorPersistance = { startIndex };
    similarFloor.floorPersistance = persistance;
    similarFloor.depth = depth;
    return similarFloor;
  }

}
export { FloorGenerator, FloorGeneratorOptions };