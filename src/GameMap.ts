interface GameMap {
  height: number,
  width: number,
  tiles: Tile[][]
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