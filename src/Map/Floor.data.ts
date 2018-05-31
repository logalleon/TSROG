import { FloorOptions, FloorPersistance } from './Floor';
import { Range } from '../Random/Dice';
import Game from '../Game';
import { MAX_DUNGEON_DEPTH } from './DungeonGenerator';

enum RegionNames {
  Lorlerach = 'Lorlerach',
  Jirdenth = 'Jirdenth',
  Emdynusk = 'Emdynusk',
  Peruskkal = 'Peruskkal',
  Oughmoren = 'Oughmoren',
  Ranwarir = 'Ranwarir',
  Lytandel = 'Lytandel',
  Ydra = 'Ydra',
  Burm = 'Burm'
}

const floorData: FloorOptions[] = [
  {
    maxCR: 10,
    floorCRRange: { low: 1, high: 1 },
    variantEnemiesRange: { low: 0, high: 1 },
    pickupsRange: { low: 0, high: 1 },
    floorHeight: 80,
    floorWidth: 80,
    roomHeightRange: { low: 5, high: 8 },
    roomWidthRange: { low: 5, high: 8 },
    numRoomsRange: { low: 5, high: 10 },
    corridorLengthRange: { low: 3, high: 12 },
    depthRange: { low: 0, high: 4 },
    floorPersistance: <FloorPersistance>{
      persistance: <Range>{ low: 0, high: 2}
    },
    name: `{Dank|Meme|Heroic} Dungeon`,
    regionName: RegionNames.Burm
  },
  {
      maxCR: 10,
      floorCRRange: { low: 1, high: 2 },
      variantEnemiesRange: { low: 0, high: 1 },
      pickupsRange: { low: 0, high: 1 },
      floorHeight: 60,
      floorWidth: 60,
      roomHeightRange: { low: 5, high: 8 },
      roomWidthRange: { low: 5, high: 8 },
      numRoomsRange: { low: 5, high: 10 },
      corridorLengthRange: { low: 3, high: 12 },
      depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
      name: `{Terrible|Awful} Mire`,
      regionName: RegionNames.Jirdenth
  }
];


export { RegionNames, floorData }