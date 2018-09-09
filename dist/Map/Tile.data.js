"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tile_1 = require("./Tile");
const Color_1 = require("../Canvas/Color");
// @TODO something isn't right here import { MAX_DUNGEON_DEPTH } from './DungeonGenerator';
const Lorlerach_1 = require("../Map/Regions/Lorlerach");
const RRange_1 = require("../Random/RRange");
const MAX_DUNGEON_DEPTH = 100;
/**
 * It's apparently really important to pass "isPassible" to these . . . need to refactor
 */
const generalTiles = [
    {
        isPassible: true,
        description: 'Hard stone floor',
        char: '.',
        color: new Color_1.Color({ hex: '#333' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.FLOOR
    },
    {
        isPassible: true,
        description: 'Hard chert floor',
        char: '.',
        color: new Color_1.Color({ hex: '#777' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.FLOOR
    },
    {
        isPassible: true,
        description: 'Rough hewn floor',
        char: '.',
        color: new Color_1.Color({ html: 'green' }),
        depthRange: new RRange_1.RRange(5, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.FLOOR
    },
    {
        isPassible: true,
        description: 'Rough magma floor',
        char: '.',
        color: new Color_1.Color({ html: 'orange' }),
        depthRange: new RRange_1.RRange(10, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.FLOOR
    },
    {
        isPassible: false,
        description: 'Rough hewn wall',
        char: '0',
        color: new Color_1.Color({ html: 'red' }),
        depthRange: new RRange_1.RRange(5, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.WALL,
        blocksVisibility: true
    },
    {
        isPassible: false,
        description: 'Rough magma wall',
        char: '|',
        color: new Color_1.Color({ html: 'orange' }),
        depthRange: new RRange_1.RRange(10, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.WALL,
        blocksVisibility: true
    },
    {
        isPassible: false,
        description: 'A wall',
        char: '|',
        color: new Color_1.Color({ html: 'white' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.WALL,
        blocksVisibility: true
    },
    {
        isPassible: true,
        description: 'A door',
        char: 'D',
        color: new Color_1.Color({ html: 'red' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.DOOR
    }
];
const floorUpDown = [
    {
        isPassible: true,
        description: 'Staircase up',
        char: '<',
        color: new Color_1.Color({ html: 'teal' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.FLOOR_UP
    },
    {
        isPassible: true,
        description: 'Staircase down',
        char: '>',
        color: new Color_1.Color({ html: 'teal' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.FLOOR_DOWN
    }
];
const voidTiles = [
    {
        isPassible: false,
        description: 'void',
        char: 'x',
        color: new Color_1.Color({ html: 'black' }),
        depthRange: new RRange_1.RRange(0, MAX_DUNGEON_DEPTH),
        type: Tile_1.TileTypes.VOID,
        blocksVisibility: true
    }
];
const tileData = [].concat(generalTiles, floorUpDown, voidTiles, 
// Region tiles
Lorlerach_1.tileData);
exports.tileData = tileData;
//# sourceMappingURL=Tile.data.js.map