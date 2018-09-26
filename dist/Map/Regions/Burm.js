"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const Deity_1 = require("../../Data/Deity");
const MAX_DUNGEON_DEPTH = 100; // @TODO proper import
const regionData = {
    name: Regions_1.RegionNames.Burm,
    description: `
    The Hell of Burm burns with the fury of ${Deity_1.DeityNames.Thothr}, the Mad One trapped in a world of
    flames and sorrow. None who have been banished to the Sunken Realm of Burm have ever seen the 
    mortal sun again.
  `
};
// const floorOptions: FloorOptions[] = [
//   {
//     regionName: RegionNames.Burm,
//     name: `
//     `
//   },
//   {
//     regionName: RegionNames.Burm,
//     name: `
//     `
//   },
//   {
//     regionName: RegionNames.Burm,
//     name: `
//     `
//   }
// ];
// const tileData: TileOptions[] = [
//   // Floor
//   {
//     isPassible: false,
//     description: 'Rough hewn wall',
//     char: '0',
//     color: new Color({ html: 'red' }),
//     depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
//     type: TileTypes.FLOOR
//   },
//   // Walls
//   {
//   isPassible: false,
//     description: 'Rough hewn wall',
//     char: '0',
//     color: new Color({ html: 'red' }),
//     depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
//     type: TileTypes.WALL
//   }
// ];
// tileData.forEach((tile) => {
//   tile.region = RegionNames.Burm;
// });
// export { regionData, floorOptions, tileData };
//# sourceMappingURL=Burm.js.map