import { Tile } from '../GameMap';
import { Room } from './Room';
import { Corridor, Direction } from './Corridor';
import { randomInt, Range } from '../Random/Dice';
import { Color } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';
import { Enemy } from '../Entity/Actor/Enemy';
import { FloorOptions, Floor } from './Floor';

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
        depth
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

}
export { FloorGenerator, FloorGeneratorOptions };