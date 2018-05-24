import { Tile } from '../GameMap';
import { Room } from './Room';
import { Corridor, Direction } from './Corridor';
import { randomInt, Range } from '../Random/Dice';
import { Color } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';

const F = () => ({
  isPassable: true,
  isOccupied: false,
  description: 'Hard stone floor',
  posX: 0,
  posY: 0,
  char: 'm',
  color: new Color({ html: 'purple' })
});
const W = () => ({
  isPassable: false,
  isOccupied: false,
  description: 'A wall',
  posX: 0,
  posY: 0,
  char: 'o',
  color: new Color({ hex: '#CCB69B' })
});

class FloorGenerator {

  public tiles: Tile[][];
  public rooms: Room[] = [];
  public corridors: Corridor[] = [];

  public roomWidthRange: Range = {
    low: 5,
    high: 20
  };

  public roomHeightRange: Range = {
    low: 5,
    high: 20
  };

  public corridorLength: Range = {
    low: 6,
    high: 15
  }

  public columns: number = 100;
  public rows: number = 100;

  constructor () {
  }

  buildFloor (minRooms, maxRooms) {

    this.rooms = [];
    this.corridors = [];

    const numRooms = randomInt(minRooms, maxRooms);
    const numCorridors = numRooms - 1;

    this.rooms.push(new Room());
    this.corridors.push(new Corridor());

    this.rooms[0].initialRoom(
      this.roomWidthRange,
      this.roomHeightRange,
      this.columns,
      this.rows
    );
    this.corridors[0].setup(
      this.rooms[0],
      this.corridorLength,
      this.roomWidthRange,
      this.roomHeightRange,
      this.columns,
      this.rows,
      true
    );

    for (let i = 1; i < numRooms; i++) {
      this.rooms.push(new Room());
      this.rooms[i].subsequentRoom(
        this.roomWidthRange,
        this.roomHeightRange,
        this.columns,
        this.rows,
        this.corridors[i - 1]
      );
      if (i < numCorridors) {
        this.corridors.push(new Corridor());
        this.corridors[i].setup(this.rooms[i], this.corridorLength, this.roomWidthRange, this.roomHeightRange, this.columns, this.rows, false);
      }
    }
    this.setWalls();
    this.setRoomTiles();
    this.setCorridorTiles();
  }

  setWalls (): void {
    this.tiles = [];
    for (let y = 0; y < this.rows; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < this.columns; x++) {
        this.tiles[y][x] = W();
      }
    }
  }

  setRoomTiles (): void {
    this.rooms.forEach((room) => {
      for (let row = 0; row < room.roomHeight; row++) {
        const y = room.pos.y + row;
        const p_row = this.tiles[y]
        for (let col = 0; col < room.roomWidth; col++) {
          const x = room.pos.x + col;
          this.tiles[y][x] = F();
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
        this.tiles[y][x] = F();
      }
    });
  }
  
  debugOutput (): void {
    const p = document.getElementById('tiles');
    let html = ''
    for (let row = 0; row < this.tiles.length; row++) {
      for (let col = 0; col < this.tiles[row].length; col++) {
        const tile = this.tiles[row][col];
        const { char, color } = tile;
        html += `<span class='tile' style="color: ${color.val()}">${char}</span>`;
      }
      html += '<br/>'
    }
    p.innerHTML = html;
    p.onclick = () => {
      this.buildFloor(5, 20);
      this.debugOutput();
    };
  }

}
export { FloorGenerator };