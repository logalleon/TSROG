import { randomInt, clamp } from '../Random/Random';
import Vector2 from '../Vector';
import { Corridor, Direction } from './Corridor';
import { RRange } from '../Random/RRange';

class Room {

  public roomWidth: number;
  public roomHeight: number;

  public pos: Vector2;

  public enteringCorridor: Direction;

  constructor () {
  }

  initialRoom (
      widthRange: RRange,
      heightRange: RRange,
      columns: number,
      rows: number) {
    this.roomWidth = randomInt(widthRange.low, widthRange.high);
    this.roomHeight = randomInt(heightRange.low, heightRange.high);
    this.pos = new Vector2(
      Math.round(columns / 2 - this.roomWidth / 2),
      Math.round(columns / 2 - this.roomHeight / 2)
    );

  }

  subsequentRoom (
    widthRange: RRange,
    heightRange: RRange,
    columns: number,
    rows: number,
    corridor: Corridor
  ) {
    this.enteringCorridor = corridor.direction;
    this.roomWidth = randomInt(widthRange.low, widthRange.high);
    this.roomHeight = randomInt(heightRange.low, heightRange.high);
    switch (corridor.direction) {
      case Direction.North:
        this.roomHeight = clamp(this.roomHeight, 1, rows - corridor.endPosition.y);
        this.pos = new Vector2(
          randomInt(corridor.endPosition.x - this.roomWidth + 1, corridor.endPosition.x),
          corridor.endPosition.y
        );
        this.pos.x = clamp(this.pos.x, 0, columns - this.roomWidth);
        break;
      case Direction.East:
        this.roomWidth = clamp(this.roomWidth, 1, columns - corridor.endPosition.x);
        this.pos = new Vector2(
          corridor.endPosition.x,
          randomInt(corridor.endPosition.y - this.roomHeight + 1, corridor.endPosition.y)
        );
        this.pos.y = clamp(this.pos.y, 0, rows - this.roomHeight);
        break;
      case Direction.South:
        this.roomHeight = clamp(this.roomHeight, 1, corridor.endPosition.y);
        this.pos = new Vector2(
          randomInt(corridor.endPosition.x - this.roomWidth + 1, corridor.endPosition.x),
          corridor.endPosition.y - this.roomHeight + 1
        );
        this.pos.x = clamp(this.pos.x, 0, columns - this.roomWidth);
        break;
      case Direction.West:
        this.roomWidth = clamp(this.roomWidth, 1, corridor.endPosition.x);
        this.pos = new Vector2(
          corridor.endPosition.x - this.roomWidth + 1,
          randomInt(corridor.endPosition.y - this.roomHeight + 1, corridor.endPosition.y)
        );
        this.pos.y = clamp(this.pos.y, 0, rows - this.roomHeight);
        break;
    }
  }

}
export { Room };