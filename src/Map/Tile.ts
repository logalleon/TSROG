import { Color } from '../Canvas/Color';
import Vector2 from '../Vector';
import { RegionNames } from './Regions/Regions';
import { RRange } from '../Random/RRange';

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
  depthRange?: RRange,
  occupiers?: any[],
  isOccupied?: boolean,
  type: TileTypes,
  region?: RegionNames
  blocksVisibility?: boolean
}

class Tile {

  public isPassible: boolean = true;

  public isOccupied: boolean = false;;
  public occupiers: any[] = [];

  public description: string;
  public char: string;
  public color: Color;

  public depthRange: Range;
  
  public type: TileTypes;

  public region: RegionNames;

  public isVisible: boolean = false;
  public blocksVisibility: boolean;

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