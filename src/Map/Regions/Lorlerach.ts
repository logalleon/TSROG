import { RegionData, RegionNames } from './Regions';
import { FloorOptions } from '../Floor';
import { TileOptions, TileTypes } from '../Tile';
import { Color } from '../../Canvas/Color';
import { EnemyOptions } from '../../Entity/Actor/Enemy';
import { ActorOptions } from '../../Entity/Actor/Actor';
import { CreatureTypes } from '../../Entity/Actor/Enemy.data';
import { Random, Dice } from 'ossuary';

const { IntegerRange } = Random;

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
      floorCRRange: new IntegerRange(1, 1),
      variantEnemiesRange: new IntegerRange(0, 1),
      pickupsRange: new IntegerRange(1, 2),
      roomWidthRange: new IntegerRange(3, 7),
      roomHeightRange: new IntegerRange(3, 7),
      corridorLengthRange: new IntegerRange(4, 10),
      floorHeight: 80,
      floorWidth: 80,
      numRoomsRange: new IntegerRange(4, 8),
      floorPersistance: {
        persistance: new IntegerRange(1, 4)
      },
      depthRange: new IntegerRange(0, 10)
    },
    {
      regionName: RegionNames.Lorlerach,
      name: `
        The
        {Skeleton|Skull|Bone|Femur|Torrid|Grim|Undying|Zombie}
        {Caves|Caverns|Grounds|Maze|Wastes|Passages|Blight}
      `,
      maxCR: 4,
      floorCRRange: new IntegerRange(1, 1),
      variantEnemiesRange: new IntegerRange(0, 1),
      pickupsRange: new IntegerRange(1, 2),
      roomWidthRange: new IntegerRange(3, 7),
      roomHeightRange: new IntegerRange(3, 7),
      corridorLengthRange: new IntegerRange(4, 10),
      floorHeight: 80,
      floorWidth: 80,
      numRoomsRange: new IntegerRange(4, 8),
      floorPersistance: {
        persistance: new IntegerRange(1, 4)
      },
      depthRange: new IntegerRange(0, 10)
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
      floorCRRange: new IntegerRange(1, 1),
      variantEnemiesRange: new IntegerRange(0, 1),
      pickupsRange: new IntegerRange(1, 2),
      roomWidthRange: new IntegerRange(3, 7),
      roomHeightRange: new IntegerRange(3, 7),
      corridorLengthRange: new IntegerRange(4, 10),
      floorHeight: 80,
      floorWidth: 80,
      numRoomsRange: new IntegerRange(4, 8),
      floorPersistance: {
        persistance: new IntegerRange(1, 4)
      },
      depthRange: new IntegerRange(0, 10)
    }
];

const tileData: TileOptions[] = [
  // Floor
  {
    isPassible: true,
    description: 'Rough hewn wall',
    char: '.',
    color: new Color({ hex: '#555' }),
    type: TileTypes.FLOOR
  },
  {
    isPassible: true,
    description: 'Rough hewn wall',
    char: '.',
    color: new Color({ hex: '#333' }),
    type: TileTypes.FLOOR
  },
  {
    isPassible: true,
    description: 'Rough hewn wall',
    char: '.',
    color: new Color({ hex: '#444' }),
    type: TileTypes.FLOOR
  },
  // Walls
  {
    isPassible: false,
    description: 'Rough hewn wall',
    char: '░',
    color: new Color({ hex: '#363636' }),
    type: TileTypes.WALL,
    blocksVisibility: true
  },
  {
      isPassible: false,
      description: 'Rough hewn wall',
      char: '░',
      color: new Color({ hex: '#a3a3a3' }),
      type: TileTypes.WALL,
      blocksVisibility: true
    }
];
tileData.forEach((tile) => {
  tile.region = RegionNames.Lorlerach;
});

// Unique enemies
const husk: EnemyOptions = {
  name: 'Husk',
  cr: 1,
  xp: 1,
  creatureType: CreatureTypes.UNDEAD,
  actorOptions: {
    char: 'h',
    hp: 4,
    ac: 4,
    damage: Dice.StandardDice.d2,
    color: new Color({ html: 'beige' })
  }
};

const enemyOptions: EnemyOptions[] = [
  husk
];

export { regionData, floorOptions, tileData, enemyOptions };