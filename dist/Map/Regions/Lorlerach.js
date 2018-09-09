"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Regions_1 = require("./Regions");
const RRange_1 = require("../../Random/RRange");
const Tile_1 = require("../Tile");
const Color_1 = require("../../Canvas/Color");
const Enemy_data_1 = require("../../Entity/Actor/Enemy.data");
const Dice_1 = require("../../Random/Dice");
const MAX_DUNGEON_DEPTH = 100; // @TODO proper import
const regionData = {
    name: Regions_1.RegionNames.Lorlerach,
    description: `
    The crypts of Lorlerach quickly descend into lightless tunnels
    and labyrinthine passageways. The walls of this place are decorated
    with horrid depictions of skeletal uprisings and apocalyptic
    raptures where the likes of the living are overthrown by wave
    after wave of the undead.
  `
};
exports.regionData = regionData;
const floorOptions = [
    {
        regionName: Regions_1.RegionNames.Lorlerach,
        name: `
        {Halls|Corridors|Catacombs|Rooms}
        of
        {Hungry|Haunting|Unending|Sunless}
        {Woe|Yearning|Sorrow|Loss|Rust|Dust}
      `,
        maxCR: 4,
        floorCRRange: new RRange_1.RRange(1, 1),
        variantEnemiesRange: new RRange_1.RRange(0, 1),
        pickupsRange: new RRange_1.RRange(1, 2),
        roomWidthRange: new RRange_1.RRange(3, 7),
        roomHeightRange: new RRange_1.RRange(3, 7),
        corridorLengthRange: new RRange_1.RRange(4, 10),
        floorHeight: 80,
        floorWidth: 80,
        numRoomsRange: new RRange_1.RRange(4, 8),
        floorPersistance: {
            persistance: new RRange_1.RRange(1, 4)
        },
        depthRange: new RRange_1.RRange(0, 10)
    },
    {
        regionName: Regions_1.RegionNames.Lorlerach,
        name: `
        The
        {Skeleton|Skull|Bone|Femur|Torrid|Grim|Undying|Zombie}
        {Caves|Caverns|Grounds|Maze|Wastes|Passages|Blight}
      `,
        maxCR: 4,
        floorCRRange: new RRange_1.RRange(1, 1),
        variantEnemiesRange: new RRange_1.RRange(0, 1),
        pickupsRange: new RRange_1.RRange(1, 2),
        roomWidthRange: new RRange_1.RRange(3, 7),
        roomHeightRange: new RRange_1.RRange(3, 7),
        corridorLengthRange: new RRange_1.RRange(4, 10),
        floorHeight: 80,
        floorWidth: 80,
        numRoomsRange: new RRange_1.RRange(4, 8),
        floorPersistance: {
            persistance: new RRange_1.RRange(1, 4)
        },
        depthRange: new RRange_1.RRange(0, 10)
    },
    {
        regionName: Regions_1.RegionNames.Lorlerach,
        name: `
        The
        {Sanctum|Cloisters|Altars|Pillars}
        of
        {Bones|Skulls|Fractures|Dust|Fear|Undying|Gravefrost|Death Chill}
      `,
        maxCR: 4,
        floorCRRange: new RRange_1.RRange(1, 1),
        variantEnemiesRange: new RRange_1.RRange(0, 1),
        pickupsRange: new RRange_1.RRange(1, 2),
        roomWidthRange: new RRange_1.RRange(3, 7),
        roomHeightRange: new RRange_1.RRange(3, 7),
        corridorLengthRange: new RRange_1.RRange(4, 10),
        floorHeight: 80,
        floorWidth: 80,
        numRoomsRange: new RRange_1.RRange(4, 8),
        floorPersistance: {
            persistance: new RRange_1.RRange(1, 4)
        },
        depthRange: new RRange_1.RRange(0, 10)
    }
];
exports.floorOptions = floorOptions;
const tileData = [
    // Floor
    {
        isPassible: true,
        description: 'Rough hewn wall',
        char: '.',
        color: new Color_1.Color({ hex: '#555' }),
        type: Tile_1.TileTypes.FLOOR
    },
    {
        isPassible: true,
        description: 'Rough hewn wall',
        char: '.',
        color: new Color_1.Color({ hex: '#333' }),
        type: Tile_1.TileTypes.FLOOR
    },
    {
        isPassible: true,
        description: 'Rough hewn wall',
        char: '.',
        color: new Color_1.Color({ hex: '#444' }),
        type: Tile_1.TileTypes.FLOOR
    },
    // Walls
    {
        isPassible: false,
        description: 'Rough hewn wall',
        char: '░',
        color: new Color_1.Color({ hex: '#363636' }),
        type: Tile_1.TileTypes.WALL,
        blocksVisibility: true
    },
    {
        isPassible: false,
        description: 'Rough hewn wall',
        char: '░',
        color: new Color_1.Color({ hex: '#a3a3a3' }),
        type: Tile_1.TileTypes.WALL,
        blocksVisibility: true
    }
];
exports.tileData = tileData;
tileData.forEach((tile) => {
    tile.region = Regions_1.RegionNames.Lorlerach;
});
// Unique enemies
const husk = {
    name: 'Husk',
    cr: 1,
    xp: 1,
    creatureType: Enemy_data_1.CreatureTypes.UNDEAD,
    actorOptions: {
        char: 'h',
        hp: 4,
        ac: 4,
        damage: Dice_1.StandardDice.d2,
        color: new Color_1.Color({ html: 'beige' })
    }
};
const enemyOptions = [
    husk
];
exports.enemyOptions = enemyOptions;
//# sourceMappingURL=Lorlerach.js.map