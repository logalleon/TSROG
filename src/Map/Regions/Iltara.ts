import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Iltara,
  description: `
    In the fading realm of Iltara, beyond the reaches of sanity, in the farthest corners of the
    Sunken Realms, there was said to be a object of great power - the Eye of Rogg. It was said that
    one who possessed the Eye could alter the fabric of time itself, and so it was hidden away in a
    dark and impossible world that it might be forgotten, forever.
  `
};

const floorOptions: FloorOptions[] = [
  {
    regionName: RegionNames.Iltara,
    name: `
    
    `
  }
];

export { regionData, floorOptions };