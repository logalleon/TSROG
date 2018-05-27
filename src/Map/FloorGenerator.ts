import { Tile } from '../GameMap';
import { Room } from './Room';
import { Corridor, Direction } from './Corridor';
import { randomInt, Range } from '../Random/Dice';
import { Color } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';
import { Enemy } from '../Entity/Actor/Enemy';
import { FloorOptions, Floor, FloorPersistance } from './Floor';
import Game from '../Game';

interface FloorGeneratorOptions {

}

class FloorGenerator {

  constructor (options: FloorGeneratorOptions) {
  }

  generateFloor (depth: number): Floor {
    if (depth === 0) {
      return new Floor(<FloorOptions>{
        maxCR: 10,
        variantEnemiesRange: { low: 0, high: 1 },
        pickupsRange: { low: 0, high: 1 },
        floorHeight: 40,
        floorWidth: 40,
        roomHeightRange: { low: 5, high: 8 },
        roomWidthRange: { low: 5, high: 8 },
        numRoomsRange: { low: 5, high: 10 },
        corridorLengthRange: { low: 3, high: 12 },
        depth,
        floorPersistance: <FloorPersistance>{
          persistance: <Range>{ low: 3, high: 6}
        }
      });
    } else {
      return new Floor(<FloorOptions>{
          maxCR: 10,
          variantEnemiesRange: { low: 0, high: 1 },
          pickupsRange: { low: 0, high: 1 },
          floorHeight: 30,
          floorWidth: 30,
          roomHeightRange: { low: 5, high: 8 },
          roomWidthRange: { low: 5, high: 8 },
          numRoomsRange: { low: 5, high: 10 },
          corridorLengthRange: { low: 3, high: 12 },
          depth
      });
    }
  }

  /**
   * Generates similar persistance floor
   * @param depth {number}
   */
  generateSimilarFloor (depth: number, startIndex: number): Floor {
    // If the floorPersistance just has and index value, it's part of a prior series
    const { floors } = Game.instance.dungeonGenerator;
    const startingFloor = floors[startIndex];
    const similarFloor = new Floor(<FloorOptions>{
      maxCR: startingFloor.maxCR,
      variantEnemiesRange: startingFloor.variantEnemiesRange,
      roomHeightRange: startingFloor.roomHeightRange,
      roomWidthRange: startingFloor.roomWidthRange,
      corridorLengthRange: startingFloor.corridorLengthRange,
      numRoomsRange: startingFloor.numRoomsRange,
      floorHeight: startingFloor.floorHeight,
      floorWidth: startingFloor.floorWidth,
      pickupsRange: startingFloor.pickupsRange,
    });
    similarFloor.floorPersistance = <FloorPersistance>{
      startIndex
    };
    similarFloor.depth = depth;
    return similarFloor;
  }

}
export { FloorGenerator, FloorGeneratorOptions };