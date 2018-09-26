import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';
import { MaterialType } from '../../Entity/Prop/Prop.data';

const regionData: RegionData = {
  name: RegionNames.Jirdenth,
  description: `
    The mines and temples of Jirdenth recall the past glory of delving dwarves,
    their now vermin-and-beast-infested hallways the least of an adventurer\s concerns.
    In addition to the likes of natural monsters, mechanical traps of all kinds still
    prove deadly obstacles, though they often guard long-empty caches of dwarven treasures.
  `
};

// const floorOptions: FloorOptions[] = [
//   {
//     regionName: RegionNames.Jirdenth,
//     name: `
//       The
//       {Desecrated|Ruined|Devoured|Forgotten|Secret}
//       {Temple|Sanctum|Halls}
//       of
//       [civilizations.dwarf.names]
//     `
//   },
//   {
//     regionName: RegionNames.Jirdenth,
//     name: `
//       The
//       {Overgrown|Rusted|Lonesome|Unspoken|Trapped}
//       {Bridges|Halls|Factories|Workshops}
//     `
//   },
//   {
//     regionName: RegionNames.Jirdenth,
//     name: `
//       The
//       [${MaterialType.METAL}|${MaterialType.STONE}]
//       {Works|Forge|Stockpile|Stores}
//     `
//   }
// ];

// export { regionData, floorOptions };