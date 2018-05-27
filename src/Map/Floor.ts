import { Tile, TileTypes } from '../Map/Tile';
import { Room } from './Room';
import { Corridor, Direction } from './Corridor';
import { randomInt, Range, randomIntR } from '../Random/Dice';
import { Color } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';
import { Enemy } from '../Entity/Actor/Enemy';
import Game from '../Game';
import Vector2 from '../Vector';


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
  depth: number
}

class Floor {

  public tiles: Tile[][];
  public rooms: Room[] = [];
  public corridors: Corridor[] = [];
  public enemies: Enemy[];
  public activeEnemies: Enemy[];

  public roomWidthRange: Range;
  public roomHeightRange: Range;
  public corridorLengthRange: Range;
  public numRoomsRange: Range;

  public depth: number;

  public floorWidth: number;
  public floorHeight: number;

  constructor (options: FloorOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

  buildFloor () {

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

  inBounds (width: number, height: number, v: Vector2): boolean {
    return v.x >= 0 &&
      v.y >= 0 &&
      v.x < width &&
      v.y < height;
  }

}
export { Floor, FloorOptions }