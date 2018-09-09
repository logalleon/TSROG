"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const Deity_1 = require("../../Data/Deity");
const Tile_1 = require("../Tile");
const Color_1 = require("../../Canvas/Color");
const MAX_DUNGEON_DEPTH = 100; // @TODO proper import
const regionData = {
    name: Regions_1.RegionNames.Burm,
    description: `
    The Hell of Burm burns with the fury of ${Deity_1.DeityNames.Thothr}, the Mad One trapped in a world of
    flames and sorrow. None who have been banished to the Sunken Realm of Burm have ever seen the 
    mortal sun again.
  `
};
exports.regionData = regionData;
const floorOptions = [
    {
        regionName: Regions_1.RegionNames.Burm,
        name: `
    
    `
    },
    {
        regionName: Regions_1.RegionNames.Burm,
        name: `
    
    `
    },
    {
        regionName: Regions_1.RegionNames.Burm,
        name: `
    
    `
    }
];
exports.floorOptions = floorOptions;
const tileData = [
    // Floor
    {
        isPassible: false,
        description: 'Rough hewn wall',
        char: '0',
        color: new Color_1.Color({ html: 'red' }),
        depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
        type: Tile_1.TileTypes.FLOOR
    },
    // Walls
    {
        isPassible: false,
        description: 'Rough hewn wall',
        char: '0',
        color: new Color_1.Color({ html: 'red' }),
        depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
        type: Tile_1.TileTypes.WALL
    }
];
exports.tileData = tileData;
tileData.forEach((tile) => {
    tile.region = Regions_1.RegionNames.Burm;
});
//# sourceMappingURL=Burm.js.map