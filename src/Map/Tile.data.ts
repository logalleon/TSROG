import { TileOptions, TileTypes, Tile } from './Tile';
import { Color } from '../Canvas/Color';
import { Range } from '../Random/Dice';
// @TODO something isn't right here import { MAX_DUNGEON_DEPTH } from './DungeonGenerator';

const MAX_DUNGEON_DEPTH = 100;

/**
 * It's apparently really important to pass "isPassible" to these . . . need to refactor
 */
const generalTiles: TileOptions[] = [
  <TileOptions>{
    isPassible: true,
    description: 'Hard stone floor',
    char: '.',
    color: new Color({ hex: '#333' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  <TileOptions>{
    isPassible: true,
    description: 'Hard chert floor',
    char: '.',
    color: new Color({ hex: '#777' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  <TileOptions>{
    isPassible: true,
    description: 'Rough hewn floor',
    char: '.',
    color: new Color({ html: 'green' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  <TileOptions>{
    isPassible: true,
    description: 'Rough magma floor',
    char: '.',
    color: new Color({ html: 'orange' }),
    depthRange: { low: 10, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR
  },
  <TileOptions>{
    isPassible: false,
    description: 'Rough hewn wall',
    char: '0',
    color: new Color({ html: 'red' }),
    depthRange: { low: 5, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.WALL
  },
  <TileOptions>{
    isPassible: false,
    description: 'Rough magma wall',
    char: '|',
    color: new Color({ html: 'orange' }),
    depthRange: { low: 10, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.WALL
  },
  <TileOptions>{
    isPassible: false,
    description: 'A wall',
    char: '|',
    color: new Color({ html: 'white' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.WALL
  },
  <TileOptions>{
    isPassible: true,
    description: 'A door',
    char: 'D',
    color: new Color({ html: 'red' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.DOOR
  }
];

const floorUpDown: TileOptions[] = [
  <TileOptions>{
    isPassible: true,
    description: 'Staircase up',
    char: '<',
    color: new Color({ html: 'teal' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR_UP
  },
  <TileOptions>{
    isPassible: true,
    description: 'Staircase down',
    char: '>',
    color: new Color({ html: 'teal' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.FLOOR_DOWN
  }
];

const voidTiles: TileOptions[] = [
  <TileOptions>{
    isPassible: false,
    description: 'void',
    char: 'x',
    color: new Color({ html: 'black' }),
    depthRange: { low: 0, high: MAX_DUNGEON_DEPTH },
    type: TileTypes.VOID
  }
]

const tileData: TileOptions[] = [].concat(
  generalTiles,
  floorUpDown,
  voidTiles
);

export { tileData };