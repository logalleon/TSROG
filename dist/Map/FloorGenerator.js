"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Random_1 = require("../Random/Random");
const Floor_1 = require("./Floor");
const Game_1 = require("../Game");
const Floor_data_1 = require("./Floor.data");
class FloorGenerator {
    constructor(options) {
        this.floorData = Floor_data_1.floorData;
    }
    generateFloor(options) {
        const possibleFloors = this.floorData.filter((floor) => {
            const allowed = true;
            if (typeof options.depth !== 'undefined') {
                if (floor.depthRange.low > options.depth || floor.depthRange.high < options.depth) {
                    return false;
                }
            }
            return allowed;
        });
        return new Floor_1.Floor(Random_1.pluck(possibleFloors));
    }
    /**
     * Generates similar persistance floor
     * @param depth {number}
     */
    generateSimilarFloor(depth, startIndex) {
        // If the floorPersistance just has and index value, it's part of a prior series
        const { floors } = Game_1.default.instance.dungeonGenerator;
        const startingFloor = floors[startIndex];
        const similarFloor = new Floor_1.Floor({
            maxCR: startingFloor.maxCR,
            floorCRRange: startingFloor.floorCRRange,
            depthRange: startingFloor.depthRange,
            variantEnemiesRange: startingFloor.variantEnemiesRange,
            roomHeightRange: startingFloor.roomHeightRange,
            roomWidthRange: startingFloor.roomWidthRange,
            corridorLengthRange: startingFloor.corridorLengthRange,
            numRoomsRange: startingFloor.numRoomsRange,
            floorHeight: startingFloor.floorHeight,
            floorWidth: startingFloor.floorWidth,
            pickupsRange: startingFloor.pickupsRange,
            name: startingFloor.name,
            regionName: startingFloor.regionName
        });
        const persistance = { startIndex };
        similarFloor.floorPersistance = persistance;
        similarFloor.depth = depth;
        return similarFloor;
    }
}
exports.FloorGenerator = FloorGenerator;
//# sourceMappingURL=FloorGenerator.js.map