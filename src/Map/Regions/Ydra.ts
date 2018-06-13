import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Ydra,
  description: `
    The mire of Ydra stretches out for leagues, its walls etched with the marks of lost demons. What
    spawned this great waste of chaos? What terrible being once called this world its home? One can
    only hope that the Mad One that created Ydra has perished lest its hand might sculpt another
    diabolical realm.
  `
};

const floorOptions: FloorOptions[] = [
  {
    regionName: RegionNames.Ydra,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Ydra,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Ydra,
    name: `
    
    `
  }
];

export { regionData, floorOptions };