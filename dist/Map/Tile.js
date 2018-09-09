"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TileTypes;
(function (TileTypes) {
    TileTypes["WALL"] = "wall";
    TileTypes["FLOOR"] = "floor";
    TileTypes["DOOR"] = "door";
    TileTypes["FLOOR_UP"] = "staircase up";
    TileTypes["FLOOR_DOWN"] = "staircase down";
    TileTypes["VOID"] = "void";
})(TileTypes || (TileTypes = {}));
exports.TileTypes = TileTypes;
class Tile {
    constructor(options) {
        this.isPassible = true;
        this.isOccupied = false;
        this.occupiers = [];
        this.isVisible = false;
        this.hasVisited = false;
        for (let key in options) {
            this[key] = options[key];
        }
        if (!options.type || !options.char || !options.color) {
            throw 'Error: tile is borked';
        }
    }
    ;
}
exports.Tile = Tile;
//# sourceMappingURL=Tile.js.map