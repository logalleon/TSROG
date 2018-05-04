import Vector2 from './Vector';
import { Color } from './Canvas/Color';

interface GameMapOptions {
  tiles: Tile[][]
}

interface Tile {
  isPassable: boolean,
  isOccupied: boolean,
  description: string,
  posX: number,
  posY: number,
  char: string,
  color: Color
  occupier?: any
}

class GameMap {

  public height: number;
  public width: number;
  public tiles: Tile[][];

  constructor (options: GameMapOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
    this.height = this.tiles.length;
    this.width = this.tiles[0].length;
  }

  inBounds (width: number, height: number, v: Vector2): boolean {
    return v.x >= 0 &&
      v.y >= 0 &&
      v.x < width &&
      v.y < height;
  }

}



export { GameMap, GameMapOptions, Tile };