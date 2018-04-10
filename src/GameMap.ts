import Vector2 from './Vector';

interface GameMap {
  height: number,
  width: number,
  tiles: Tile[][]
  inBounds(width: number, height: number, v: Vector2): boolean
}

interface Tile {
  isPassable: boolean,
  isOccupied: boolean,
  description: string,
  posX: number,
  posY: number,
  char: string,
  o?: any
}
export { GameMap, Tile };