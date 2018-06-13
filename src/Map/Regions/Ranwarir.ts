import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Ranwarir,
  description: `
    The petrified crypts of Ranwarir are a place few mortal has travelled. Entombed in ice and
    stone, Renwarir is a relic of an age before humans that had fallen so long that few have
    memory of its old era of glory. The elegant halls are now littered with ancient dragons
    who await the return of time-lost masters who dare not be disturbed.
  `
};

const floorOptions: FloorOptions[] = [
  {
    regionName: RegionNames.Ranwarir,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Ranwarir,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Ranwarir,
    name: `
    
    `
  }
];

export { regionData, floorOptions };