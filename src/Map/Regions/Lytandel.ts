import { RegionData, RegionNames } from './Regions';
import { DeityNames } from '../../Data/Deity';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Lytandel,
  description: `
    The halls of Lytandel writhe with the horrid creatures of Mad One ${DeityNames.Qirak}, their shifting
    shapes and shadowy limbs stretch out across rough hewn walls and blood-stained tiles. ${DeityNames.Qirak}
    had long-since abandoned the nightmares of Lytandel when they were first discovered by the demi-god
    heroes of old. What little information is known is passed down from generations on ancient, brittle
    tombs filled with the scrawled writings of insane monks.
  `
};

const floorOptions: FloorOptions[] = [
  {
    regionName: RegionNames.Lytandel,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Lytandel,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Lytandel,
    name: `
    
    `
  }
];

export { regionData, floorOptions };