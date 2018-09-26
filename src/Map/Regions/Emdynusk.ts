import { RegionData, RegionNames } from './Regions';
import { DeityNames } from '../../Data/Deity';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Emdynusk,
  description: `
    The lost city of Emdynusk is a testament to the foolishness of humans who
    in their pride attempted to rival and even exceed the masterwork tunnels and great halls
    of their dwarven cousins. While they revelled in short-lived success, they were soon overcome
    by the Wandering Madness and became slaves to mind-rotting diseases or worse:
    they were taken by the Touch of ${DeityNames.Xhsoa}.
  `
};

// const floorOptions: FloorOptions[] = [
//   {
//     regionName: RegionNames.Emdynusk,
//     name: `
//       The
//       {Lost|Mired|Corrupted}
//       {Village|Quarters|Town|Wasteland|Burrow}
//     `
//   },
//   {
//     regionName: RegionNames.Emdynusk,
//     name: `
//       [civilizations.human.names]\s
//       {Sorrow|Madness|Folly|Fall|Hatred|Longing|Disease|Grave}
//     `
//   },
//   {
//     regionName: RegionNames.Emdynusk,
//     name: `
//       The
//       {Longing|Infinite|Insane|Secret|Furtive}
//       {Graves|Corpse|Madness|Knives|Claws|Wind|Passages|Labyrinth|Daggers|Stricken|Heretics}
//     `
//   }
// ];

// export { regionData, floorOptions };