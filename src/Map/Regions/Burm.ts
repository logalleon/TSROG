import { RegionData, RegionNames } from './Regions';
import { DeityNames } from '../../Data/Deity';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Burm,
  description: `
    The Hell of Burm burns with the fury of ${DeityNames.Thothr}, the Mad One trapped in a world of
    flames and sorrow. None who have been banished to the Sunken Realm of Burm have ever seen the 
    mortal sun again.
  `
};

const floorOptions: FloorOptions[] = [
  {
    regionName: RegionNames.Burm,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Burm,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Burm,
    name: `
    
    `
  }
];

export { regionData, floorOptions };