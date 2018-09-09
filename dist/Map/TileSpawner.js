"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tile_1 = require("./Tile");
const Tile_data_1 = require("./Tile.data");
const Random_1 = require("../Random/Random");
class TileSpawner {
    constructor() {
        this.tileData = Tile_data_1.tileData;
        this.voidTile = this.getTile({ type: Tile_1.TileTypes.VOID });
    }
    getTile(options) {
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
        const tileOptions = Random_1.pluck(possibleTiles);
        const tile = new Tile_1.Tile(Random_1.pluck(possibleTiles));
        return tile;
    }
}
exports.TileSpawner = TileSpawner;
//# sourceMappingURL=TileSpawner.js.map