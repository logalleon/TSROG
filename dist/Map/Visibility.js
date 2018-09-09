"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("../Vector");
const Game_1 = require("../Game");
const Random_1 = require("../Random/Random");
const Tile_1 = require("./Tile");
const Screen_1 = require("../Screen/Screen");
const Geometry_1 = require("../Geometry");
class RaycastVisibility {
    constructor(mapWidth, mapHeight) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }
    updateMapSize(width, height) {
        this.mapWidth = width;
        this.mapHeight = height;
    }
    resetLos(origin, losRange) {
        const { tiles } = Game_1.default.instance.currentFloor;
        // const left = clamp(origin.x - losRange, 0, this.mapWidth);
        // const right = clamp(origin.x + losRange, 0, this.mapWidth);
        // const top = clamp(origin.y - losRange - 1, 0, this.mapHeight);
        // const bottom = clamp(origin.y + losRange + 1, 0, this.mapHeight); @todo this is buggy
        for (let y = 0; y < Game_1.default.instance.currentFloor.floorHeight; y++) {
            for (let x = 0; x < Game_1.default.instance.currentFloor.floorWidth; x++) {
                tiles[y][x].isVisible = false;
                // @TODO the map screen really should have its own refernce
                Game_1.default.instance.screens[Screen_1.ScreenNames.MAP].redrawTile(new Vector_1.default(x, y));
            }
        }
    }
    compute(origin, losRange) {
        const { tiles } = Game_1.default.instance.currentFloor;
        // The origin is always visible
        tiles[origin.y][origin.x].isVisible = true;
        // Redraw the origin tile
        Game_1.default.instance.screens[Screen_1.ScreenNames.MAP].redrawTile(origin);
        // Calculate clipping for the x coordinate
        const left = Random_1.clamp(origin.x - losRange, 0, this.mapWidth);
        const right = Random_1.clamp(origin.x + losRange, 0, this.mapWidth);
        // Calculate clipping for the y coordinate
        const top = Random_1.clamp(origin.y - losRange - 1, 0, this.mapHeight);
        const bottom = Random_1.clamp(origin.y + losRange + 1, 0, this.mapHeight);
        for (let x = left; x < right; x++) {
            this.traceLine(origin, x, top, losRange);
            this.traceLine(origin, x, bottom - 1, losRange);
        }
        for (let y = top + 1; y < bottom - 1; y++) {
            this.traceLine(origin, left, y, losRange);
            this.traceLine(origin, right - 1, y, losRange);
        }
    }
    traceLine(origin, x2, y2, losRange) {
        const { tiles } = Game_1.default.instance.currentFloor;
        const xDelta = x2 - origin.x;
        const yDelta = y2 - origin.y;
        let xLen = Math.abs(xDelta);
        let yLen = Math.abs(yDelta);
        let xInc = Math.sign(xDelta); // @TODO hack hack hack
        let yInc = Math.sign(yDelta) << 16; // @TODO wat understand this
        let index = (origin.y << 16) + origin.x;
        // Raytrace on the longest axis or swap
        if (xLen < yLen) {
            let t = xLen;
            let u = xInc;
            xLen = yLen;
            yLen = t;
            xInc = yInc;
            yInc = u;
        }
        let errorInc = yLen * 2;
        let error = -xLen;
        let errorReset = xLen * 2;
        // Skip the origin of the ray as this is the same as the origin above (always visible)
        while (--xLen >= 0) {
            index += xInc; // advance down the long axis (could be x or y as swapped above)
            error += errorInc;
            if (error > 0) {
                error -= errorReset;
                index += yInc;
            }
            let x = index & 0xFFFF; // @TODO wtf is going on here look up the algorithm
            let y = index >> 16;
            // Range check to immediately stop
            if (Math.ceil(Geometry_1.distance(origin, new Vector_1.default(x, y))) > losRange) {
                break;
            }
            tiles[y][x].isVisible = true;
            if (tiles[y][x].type !== Tile_1.TileTypes.VOID) { // @TODO figure out why the tracings is sometimes exposing void tiles in the first place
                tiles[y][x].hasVisited = true;
            }
            // Redraw the tile to expose it
            Game_1.default.instance.screens[Screen_1.ScreenNames.MAP].redrawTile(new Vector_1.default(x, y));
            // Stop looping after exposing a los-blocking tile
            if (tiles[y][x].blocksVisibility) {
                break;
            }
        }
    }
}
exports.default = RaycastVisibility;
//# sourceMappingURL=Visibility.js.map