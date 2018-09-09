"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const regionData = {
    name: Regions_1.RegionNames.Peruskkal,
    description: `
    The endless maze of Peruskkal is the first truly wicked place an adventurer of
    the Sunken Realms might encounter. Thus, the early halls of Peruskkal are lined with
    the bodies of the failed, their armor and bones forming high piles that sometimes block
    passageways. None but the bravest soldier onwards, revealing the true terrors of this
    place, deadly traps of acid, statues that come to life, and hallways that flood with
    black blood constructed by the lesser Mad Ones.
  `
};
exports.regionData = regionData;
const floorOptions = [
    {
        regionName: Regions_1.RegionNames.Peruskkal,
        name: `
      The
      {Endless|Twisted|Fractured|Blood-stained}
      {Haunt|Chasm|Maze}
    `
    },
    {
        regionName: Regions_1.RegionNames.Peruskkal,
        name: `
    
    `
    },
    {
        regionName: Regions_1.RegionNames.Peruskkal,
        name: `
    
    `
    }
];
exports.floorOptions = floorOptions;
//# sourceMappingURL=Peruskkal.js.map