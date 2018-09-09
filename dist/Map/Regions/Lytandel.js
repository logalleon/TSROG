"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const Deity_1 = require("../../Data/Deity");
const regionData = {
    name: Regions_1.RegionNames.Lytandel,
    description: `
    The halls of Lytandel writhe with the horrid creatures of Mad One ${Deity_1.DeityNames.Qirak}, their shifting
    shapes and shadowy limbs stretch out across rough hewn walls and blood-stained tiles. ${Deity_1.DeityNames.Qirak}
    had long-since abandoned the nightmares of Lytandel when they were first discovered by the demi-god
    heroes of old. What little information is known is passed down from generations on ancient, brittle
    tombs filled with the scrawled writings of insane monks.
  `
};
exports.regionData = regionData;
const floorOptions = [
    {
        regionName: Regions_1.RegionNames.Lytandel,
        name: `
    
    `
    },
    {
        regionName: Regions_1.RegionNames.Lytandel,
        name: `
    
    `
    },
    {
        regionName: Regions_1.RegionNames.Lytandel,
        name: `
    
    `
    }
];
exports.floorOptions = floorOptions;
//# sourceMappingURL=Lytandel.js.map