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

const floorData = <FloorOptions[]>[
  <FloorOptions>{
    maxCR: 10,
    variantEnemiesRange: { low: 0, high: 1 },
    pickupsRange: { low: 0, high: 1 },
    floorHeight: 40,
    floorWidth: 40,
    roomHeightRange: { low: 5, high: 8 },
    roomWidthRange: { low: 5, high: 8 },
    numRoomsRange: { low: 5, high: 10 },
    corridorLengthRange: { low: 3, high: 12 },
    depthRange: { low: 0, high: 4 },
    floorPersistance: <FloorPersistance>{
      persistance: <Range>{ low: 3, high: 6}
    },
    name: `{dank|meme} dungeon`,
    regionName: RegionNames.Burm
  },
  <FloorOptions>{
      maxCR: 10,
      variantEnemiesRange: { low: 0, high: 1 },
      pickupsRange: { low: 0, high: 1 },
      floorHeight: 30,
      floorWidth: 30,
      roomHeightRange: { low: 5, high: 8 },
      roomWidthRange: { low: 5, high: 8 },
      numRoomsRange: { low: 5, high: 10 },
      corridorLengthRange: { low: 3, high: 12 },
      depthRange: { low: 1, high: MAX_DUNGEON_DEPTH },
      name: `{Another|Onge} mire`,
      regionName: RegionNames.Jirdenth
  }
];


export { RegionNames, floorData }