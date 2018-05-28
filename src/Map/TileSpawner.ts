import { TileOptions, Tile, TileTypes } from './Tile';
import { tileData } from './Tile.data';
import { pluck } from '../Random/Dice';

interface TileRequestOptions {
  depth?: number,
  isPassible?: boolean,
  type?: TileTypes
}

class TileSpawner {

  public tileData: TileOptions[];

  public voidTile: Tile;

  constructor () {
    this.tileData = tileData;
    this.voidTile = this.getTile({ type: TileTypes.VOID });
  }

  getTile(options: TileRequestOptions): Tile {
    const possibleTiles = this.tileData.filter((tile) => {
      const allowed = true;
      if (typeof options.depth !== 'undefined') {
        if (tile.depthRange.low > options.depth || tile.depthRange.high < options.depth) {
          return false;
        }
      }
      if (typeof options.isPassible !== 'undefined') {
        if (tile.isPassible !== options.isPassible) {
          return false;
        }
      }
      if (options.type) {
        if (tile.type !== options.type) {
          return false;
        }
      }
      return allowed;
    });
    const tileOptions = pluck(possibleTiles);
    const tile: Tile = new Tile(pluck(possibleTiles));
    return tile;
  }

}
export { TileSpawner }