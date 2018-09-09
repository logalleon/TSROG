"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const Prop_data_1 = require("../../Entity/Prop/Prop.data");
const regionData = {
    name: Regions_1.RegionNames.Jirdenth,
    description: `
    The mines and temples of Jirdenth recall the past glory of delving dwarves,
    their now vermin-and-beast-infested hallways the least of an adventurer\s concerns.
    In addition to the likes of natural monsters, mechanical traps of all kinds still
    prove deadly obstacles, though they often guard long-empty caches of dwarven treasures.
  `
};
exports.regionData = regionData;
const floorOptions = [
    {
        regionName: Regions_1.RegionNames.Jirdenth,
        name: `
      The
      {Desecrated|Ruined|Devoured|Forgotten|Secret}
      {Temple|Sanctum|Halls}
      of
      [civilizations.dwarf.names]
    `
    },
    {
        regionName: Regions_1.RegionNames.Jirdenth,
        name: `
      The
      {Overgrown|Rusted|Lonesome|Unspoken|Trapped}
      {Bridges|Halls|Factories|Workshops}
    `
    },
    {
        regionName: Regions_1.RegionNames.Jirdenth,
        name: `
      The
      [${Prop_data_1.MaterialType.METAL}|${Prop_data_1.MaterialType.STONE}]
      {Works|Forge|Stockpile|Stores}
    `
    }
];
exports.floorOptions = floorOptions;
//# sourceMappingURL=Jirdenth.js.map