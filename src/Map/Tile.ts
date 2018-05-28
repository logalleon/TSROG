import { Color } from '../Canvas/Color';
import Vector2 from '../Vector';
import { Range } from '../Random/Dice';

enum TileTypes {
  WALL = 'wall',
  FLOOR = 'floor',
  DOOR = 'door',
  FLOOR_UP = 'staircase up',
  FLOOR_DOWN = 'staircase down',
  VOID = 'void'
}

interface TileOptions {
  isPassible: boolean,
  description: string,
  char: string,
  color: Color,
  depthRange: Range,
  occupiers?: any[],
  isOccupied?: boolean,
  pos?: Vector2,
  type: TileTypes
}

class Tile {

  public isPassible: boolean = true;

  public isOccupied: boolean = false;;
  public occupiers: any[] = [];

  public description: string;
  public char: string;
  public color: Color;

  public depthRange: Range;
  
  public pos: Vector2;

  public type: TileTypes;

  constructor (options: TileOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
    if (!options.type || !options.char || !options.color) {
      throw 'Error: tile is borked';
    }
  }

}
export { Tile, TileOptions, TileTypes };