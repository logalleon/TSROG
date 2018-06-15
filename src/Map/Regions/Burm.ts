import { RegionData, RegionNames } from './Regions';
import { DeityNames } from '../../Data/Deity';
import { FloorOptions } from '../Floor';
import { TileOptions, TileTypes } from '../Tile';
import { Color } from '../../Canvas/Color';

const MAX_DUNGEON_DEPTH = 100; // @TODO proper import

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
const tileData: TileOptions[] = [
  // Floor
  {
    isPassible: false,
    description: 'Rough hewn wall',
    char: '0',
    color: new Color({ html: 'red' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  // Walls
  {
  isPassible: false,
    description: 'Rough hewn wall',
    char: '0',
    color: new Color({ html: 'red' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.WALL
  }
];
tileData.forEach((tile) => {
  tile.region = RegionNames.Burm;
});

export { regionData, floorOptions, tileData };