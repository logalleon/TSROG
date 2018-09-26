import { TileOptions, Tile, TileTypes } from './Tile';
import { tileData } from './Tile.data';
import { RegionNames } from './Regions/Regions';
import { Random } from 'ossuary';

interface TileRequestOptions {
  depth?: number,
  isPassible?: boolean,
  type?: TileTypes,
  region?: RegionNames
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
      if (typeof options.depth !== 'undefined' && tile.depthRange) {
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
      if (options.region) {
        if (typeof tile.region == 'undefined' || tile.region !== options.region) {
          return false;
        }
      }
      return allowed;
    });
    if (!possibleTiles.length) {
      throw new Error('No tile selected? Uh ooh . . .');
    }
    const tileOptions = Random.pluck(possibleTiles);
    const tile: Tile = new Tile(Random.pluck(possibleTiles));
    return tile;
  }

}
export { TileSpawner }