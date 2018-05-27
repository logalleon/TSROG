import { Tile, TileTypes } from '../Map/Tile';
import { Room } from './Room';
import { Corridor, Direction } from './Corridor';
import { randomInt, Range, randomIntR, clamp } from '../Random/Dice';
import { Color } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';
import { Enemy } from '../Entity/Actor/Enemy';
import Game from '../Game';
import Vector2 from '../Vector';
import { RegionNames } from './Floor.data';
import { CreatureTypes, defaultVariations, Variations } from '../Entity/Actor/Enemy.data';

interface FloorPersistance {
  // A reference to the starting index to see how long the persistance should keep up
  startIndex?: number,
  persistance?: Range
}

// @TODO there are probably many more options that will go into this
interface FloorOptions {
  maxCR: number,
  variantEnemiesRange: Range,
  pickupsRange: Range,
  roomWidthRange: Range,
  roomHeightRange: Range,
  corridorLengthRange: Range,
  floorWidth: number,
  floorHeight: number,
  numRoomsRange: Range,
  depth: number,
  // Floors with a persistance value will persist for RANGE number of floors
  floorPersistance?: FloorPersistance,
  // Range at which first generation can occur
  depthRange: Range,
  name: string,
  regionName: RegionNames
}

class Floor {

  public tiles: Tile[][];
  public rooms: Room[] = [];
  public corridors: Corridor[] = [];
  public enemies: Enemy[] = [];
  public activeEnemies: Enemy[] = [];
  public variantEnemiesRange: Range;
  public maxCR: number;

  public pickupsRange: Range;

  public roomWidthRange: Range;
  public roomHeightRange: Range;
  public corridorLengthRange: Range;
  public numRoomsRange: Range;

  public depth: number;

  public floorWidth: number;
  public floorHeight: number;

  public floorPersistance: FloorPersistance;
  public willPersistFor: number;

  public name: string;
  public regionName: RegionNames;
  public nameInSequence: number;

  public floorStart: Vector2;

  constructor (options: FloorOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

  buildFloor () {

    this.generateName();

    this.rooms = [];
    this.corridors = [];

    const numRooms = randomIntR(this.numRoomsRange);
    const numCorridors = numRooms - 1;

    this.rooms.push(new Room());
    this.corridors.push(new Corridor());

    this.rooms[0].initialRoom(
      this.roomWidthRange,
      this.roomHeightRange,
      this.floorWidth,
      this.floorHeight
    );
    this.corridors[0].setup(
      this.rooms[0],
      this.corridorLengthRange,
      this.roomWidthRange,
      this.roomHeightRange,
      this.floorWidth,
      this.floorHeight,
      true
    );

    for (let i = 1; i < numRooms; i++) {
      this.rooms.push(new Room());
      this.rooms[i].subsequentRoom(
        this.roomWidthRange,
        this.roomHeightRange,
        this.floorWidth,
        this.floorHeight,
        this.corridors[i - 1]
      );
      if (i < numCorridors) {
        this.corridors.push(new Corridor());
        this.corridors[i].setup(
          this.rooms[i],
          this.corridorLengthRange,
          this.roomWidthRange,
          this.roomHeightRange,
          this.floorWidth,
          this.floorHeight,
          false
        );
      }
    }
    this.setWalls();
    this.setRoomTiles();
    this.setCorridorTiles();
    this.setDoorTiles();
    this.setStaircaseTiles();
    this.spawnEnemies();
    if (this.floorPersistance && this.floorPersistance.persistance) {
      this.willPersistFor = randomIntR(this.floorPersistance.persistance);
      this.floorPersistance.startIndex = this.depth;
    }
  }

  setWalls (): void {
    this.tiles = [];
    for (let y = 0; y < this.floorHeight; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < this.floorWidth; x++) {
        // Get impassible tiles for walls
        // @TODO make these of the type wall
        this.tiles[y][x] = Game.instance.dungeonGenerator.tileSpawner.getTile({
          depth: this.depth,
          isPassible: false
        });
      }
    }
  }

  setRoomTiles (): void {
    this.rooms.forEach((room) => {
      for (let row = 0; row < room.roomHeight; row++) {
        const y = room.pos.y + row;
        const p_row = this.tiles[y];
        for (let col = 0; col < room.roomWidth; col++) {
          const x = room.pos.x + col;
          p_row[x] = Game.instance.dungeonGenerator.tileSpawner.getTile({
            depth: this.depth,
            isPassible: true,
            type: TileTypes.FLOOR
          });
        }
      }
    });
  }

  setCorridorTiles (): void {
    this.corridors.forEach((corridor) => {
      for (let i = 0; i < corridor.length; i++) {
        let { x, y } = corridor.startingPosition;
        switch (corridor.direction) {
          case Direction.North:
            y += i;
            break;
          case Direction.East:
            x += i;
            break;
          case Direction.South:
            y -= i;
            break;
          case Direction.West:
            x -= i;
            break;
        }
        // @TODO something isn't right here . . . the start of a corridor should always be
        // in bounds, right?
        if (this.inBounds(this.floorWidth, this.floorHeight, new Vector2(x, y))) {
          this.tiles[y][x] = Game.instance.dungeonGenerator.tileSpawner.getTile({
            depth: this.depth,
            isPassible: true,
            type: TileTypes.FLOOR
          });
        }
      }
    });
  }

  setDoorTiles (): void {
    this.corridors.forEach((corridor) => {
      let { x, y } = corridor.startingPosition;
      if (this.inBounds(this.floorWidth, this.floorHeight, corridor.startingPosition)) {
        // @TODO 'walk back' if there are tiles prevent the door from being any use
        this.tiles[y][x] = Game.instance.dungeonGenerator.tileSpawner.getTile({
          depth: this.depth,
          type: TileTypes.DOOR
        });
      }
    });
  }

  setStaircaseTiles (): void {
    const startingRoom = this.rooms[0];
    let startingPosition = this.getRandomPointInRoom(startingRoom);
    // Don't set staircases near the edge of rooms.
    clamp(startingPosition.x, startingRoom.pos.x + 1, startingRoom.pos.x + startingRoom.roomWidth - 2);
    clamp(startingPosition.y, startingRoom.pos.y + 1, startingRoom.pos.y + startingRoom.roomHeight - 2);
    this.tiles[startingPosition.y][startingPosition.x] = Game.instance.dungeonGenerator.tileSpawner.getTile({
      type: TileTypes.FLOOR_UP
    });
    this.floorStart = startingPosition;
    if (this.depth !== Game.instance.dungeonGenerator.maxDepth - 1) {
      // @TODO hard-coded? maybe the location of ending staircase should depend on floor options
      const endingRoom = this.rooms[randomInt(this.rooms.length - 3, this.rooms.length - 1)];
      let endingPosition = this.getRandomPointInRoom(endingRoom);
      // Don't set staircases near the edge of rooms.
      clamp(endingPosition.x, endingRoom.pos.x + 1, endingRoom.pos.x + endingRoom.roomWidth - 2);
      clamp(endingPosition.y, endingRoom.pos.y + 1, endingRoom.pos.y + endingRoom.roomHeight - 2);
      this.tiles[endingPosition.y][endingPosition.x] = Game.instance.dungeonGenerator.tileSpawner.getTile({
        type: TileTypes.FLOOR_DOWN
      });
    }
  }

  getRandomPointInRoom (room: Room): Vector2 {
    const x = randomInt(room.pos.x, room.roomWidth + room.pos.x);
    const y = randomInt(room.pos.y, room.roomHeight + room.pos.y);
    // Just fucking clamp to the bounds of the map
    return new Vector2(
      clamp(x, 0, this.floorWidth - 1),
      clamp(y, 0, this.floorHeight - 1)
    );
  }

  inBounds (width: number, height: number, v: Vector2): boolean {
    return v.x >= 0 &&
      v.y >= 0 &&
      v.x < width &&
      v.y < height;
  }

  generateName (): void {
    this.name = Game.instance.legendary.parse(this.name);
    // Starting floor in a sequence
    if (this.floorPersistance) {
      if (this.floorPersistance.persistance) {
        this.nameInSequence = 1;
      } else {
        this.nameInSequence = (this.depth - this.floorPersistance.startIndex) + 1;
      }
    }
  }

  spawnEnemies (): void {
    const { enemySpawner } = Game.instance;
    // DEBUG
    const e = enemySpawner.createEnemyByCreatureType(CreatureTypes.UNDEAD, defaultVariations[Variations.FEROCIOUS]);
    e.pos = this.getRandomPointInRoom(this.rooms[2]);
    e.isActive = true;
    this.activeEnemies.push(e);
    this.tiles[e.pos.y][e.pos.x].isOccupied = true;
    this.tiles[e.pos.y][e.pos.x].occupiers.push(e);;
    //
  }

}
export { Floor, FloorOptions, FloorPersistance }