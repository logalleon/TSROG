"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const Deity_1 = require("../../Data/Deity");
const regionData = {
    name: Regions_1.RegionNames.Emdynusk,
    description: `
    The lost city of Emdynusk is a testament to the foolishness of humans who
    in their pride attempted to rival and even exceed the masterwork tunnels and great halls
    of their dwarven cousins. While they revelled in short-lived success, they were soon overcome
    by the Wandering Madness and became slaves to mind-rotting diseases or worse:
    they were taken by the Touch of ${Deity_1.DeityNames.Xhsoa}.
  `
};
exports.regionData = regionData;
const floorOptions = [
    {
        regionName: Regions_1.RegionNames.Emdynusk,
        name: `
      The
      {Lost|Mired|Corrupted}
      {Village|Quarters|Town|Wasteland|Burrow}
    `
    },
    {
        regionName: Regions_1.RegionNames.Emdynusk,
        name: `
      [civilizations.human.names]\s
      {Sorrow|Madness|Folly|Fall|Hatred|Longing|Disease|Grave}
    `
    },
    {
        regionName: Regions_1.RegionNames.Emdynusk,
        name: `
      The
      {Longing|Infinite|Insane|Secret|Furtive}
      {Graves|Corpse|Madness|Knives|Claws|Wind|Passages|Labyrinth|Daggers|Stricken|Heretics}
    `
    }
];
exports.floorOptions = floorOptions;
//# sourceMappingURL=Emdynusk.js.map