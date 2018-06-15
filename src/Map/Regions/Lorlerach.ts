import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';
import { RRange } from '../../Random/RRange';
import { TileOptions, TileTypes } from '../Tile';
import { Color } from '../../Canvas/Color';

const MAX_DUNGEON_DEPTH = 100; // @TODO proper import

const regionData: RegionData = {
  name: RegionNames.Lorlerach,
  description: `
    The crypts of Lorlerach quickly descend into lightless tunnels
    and labyrinthine passageways. The walls of this place are decorated
    with horrid depictions of skeletal uprisings and apocalyptic
    raptures where the likes of the living are overthrown by wave
    after wave of the undead.
  `
}

const floorOptions: FloorOptions[] = [
    {
      regionName: RegionNames.Lorlerach,
      name: `
        {Halls|Corridors|Catacombs|Rooms}
        of
        {Hungry|Haunting|Unending|Sunless}
        {Woe|Yearning|Sorrow|Loss|Rust|Dust}
      `,
      maxCR: 4,
      floorCRRange: new RRange(1, 1),
      variantEnemiesRange: new RRange(0, 1),
      pickupsRange: new RRange(1, 2),
      roomWidthRange: new RRange(3, 7),
      roomHeightRange: new RRange(3, 7),
      corridorLengthRange: new RRange(4, 10),
      floorHeight: 80,
      floorWidth: 80,
      numRoomsRange: new RRange(4, 8),
      floorPersistance: {
        persistance: new RRange(1, 4)
      },
      depthRange: new RRange(0, 10)
    },
    {
      regionName: RegionNames.Lorlerach,
      name: `
        The
        {Skeleton|Skull|Bone|Femur|Torrid|Grim|Undying|Zombie}
        {Caves|Caverns|Grounds|Maze|Wastes|Passages|Blight}
      `,
      maxCR: 4,
      floorCRRange: new RRange(1, 1),
      variantEnemiesRange: new RRange(0, 1),
      pickupsRange: new RRange(1, 2),
      roomWidthRange: new RRange(3, 7),
      roomHeightRange: new RRange(3, 7),
      corridorLengthRange: new RRange(4, 10),
      floorHeight: 80,
      floorWidth: 80,
      numRoomsRange: new RRange(4, 8),
      floorPersistance: {
        persistance: new RRange(1, 4)
      },
      depthRange: new RRange(0, 10)
    },
    {
      regionName: RegionNames.Lorlerach,
      name: `
        The
        {Sanctum|Cloisters|Altars|Pillars}
        of
        {Bones|Skulls|Fractures|Dust|Fear|Undying|Gravefrost|Death Chill}
      `,
      maxCR: 4,
      floorCRRange: new RRange(1, 1),
      variantEnemiesRange: new RRange(0, 1),
      pickupsRange: new RRange(1, 2),
      roomWidthRange: new RRange(3, 7),
      roomHeightRange: new RRange(3, 7),
      corridorLengthRange: new RRange(4, 10),
      floorHeight: 80,
      floorWidth: 80,
      numRoomsRange: new RRange(4, 8),
      floorPersistance: {
        persistance: new RRange(1, 4)
      },
      depthRange: new RRange(0, 10)
    }
];

const tileData: TileOptions[] = [
  // Floor
  {
    isPassible: true,
    description: 'Rough hewn wall',
    char: '.',
    color: new Color({ hex: '#555' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  {
    isPassible: true,
    description: 'Rough hewn wall',
    char: '.',
    color: new Color({ hex: '#333' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  {
    isPassible: true,
    description: 'Rough hewn wall',
    char: '.',
    color: new Color({ hex: '#444' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  // Walls
  {
  isPassible: false,
    description: 'Rough hewn wall',
    char: '░',
    color: new Color({ hex: '#363636' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.WALL
  },
  {
    isPassible: false,
      description: 'Rough hewn wall',
      char: '░',
      color: new Color({ hex: '#363535' }),
      depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
      type: TileTypes.WALL
    }
];
tileData.forEach((tile) => {
  tile.region = RegionNames.Lorlerach;
});

export { regionData, floorOptions, tileData };