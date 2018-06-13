import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';

const regionData: RegionData = {
  name: RegionNames.Oughmoren,
  description: `
    The sewers of Oughmoren are a dangerous place indeed. Created by the Mad One ${DeityNames.Ktipara},
    they extend far and wide, their rooms and passageways lurking with poisonous plants and venomous
    creatures. They are a place of decay, descruction, and desecration, littered with sordid
    and defaced shrines of the Hallowed Ones. As one slogs through Oughmoren hope begins
    to grow thin.
  `
};

const floorOptions: FloorOptions[] = [
  {
    regionName: RegionNames.Oughmoren,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Oughmoren,
    name: `
    
    `
  },
  {
    regionName: RegionNames.Oughmoren,
    name: `
    
    `
  }
];

export { regionData, floorOptions };