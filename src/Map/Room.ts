import Vector2 from '../Vector';
import { Corridor, Direction } from './Corridor';
import { Random } from 'ossuary';

class Room {

  public roomWidth: number;
  public roomHeight: number;

  public pos: Vector2;

  public enteringCorridor: Direction;

  public isActive: boolean = false;

  constructor () {
  }

  initialRoom (
      widthRange: Random.IntegerRange,
      heightRange: Random.IntegerRange,
      columns: number,
      rows: number) {
    this.roomWidth = Random.randomInt(widthRange.low, widthRange.high);
    this.roomHeight = Random.randomInt(heightRange.low, heightRange.high);
    this.pos = new Vector2(
      Math.round(columns / 2 - this.roomWidth / 2),
      Math.round(columns / 2 - this.roomHeight / 2)
    );

  }

  subsequentRoom (
    widthRange: Random.IntegerRange,
    heightRange: Random.IntegerRange,
    columns: number,
    rows: number,
    corridor: Corridor
  ) {
    this.enteringCorridor = corridor.direction;
    this.roomWidth = Random.randomInt(widthRange.low, widthRange.high);
    this.roomHeight = Random.randomInt(heightRange.low, heightRange.high);
    switch (corridor.direction) {
      case Direction.North:
        this.roomHeight = Random.clamp(this.roomHeight, 1, rows - corridor.endPosition.y);
        this.pos = new Vector2(
          Random.randomInt(corridor.endPosition.x - this.roomWidth + 1, corridor.endPosition.x),
          corridor.endPosition.y
        );
        this.pos.x = Random.clamp(this.pos.x, 0, columns - this.roomWidth);
        break;
      case Direction.East:
        this.roomWidth = Random.clamp(this.roomWidth, 1, columns - corridor.endPosition.x);
        this.pos = new Vector2(
          corridor.endPosition.x,
          Random.randomInt(corridor.endPosition.y - this.roomHeight + 1, corridor.endPosition.y)
        );
        this.pos.y = Random.clamp(this.pos.y, 0, rows - this.roomHeight);
        break;
      case Direction.South:
        this.roomHeight = Random.clamp(this.roomHeight, 1, corridor.endPosition.y);
        this.pos = new Vector2(
          Random.randomInt(corridor.endPosition.x - this.roomWidth + 1, corridor.endPosition.x),
          corridor.endPosition.y - this.roomHeight + 1
        );
        this.pos.x = Random.clamp(this.pos.x, 0, columns - this.roomWidth);
        break;
      case Direction.West:
        this.roomWidth = Random.clamp(this.roomWidth, 1, corridor.endPosition.x);
        this.pos = new Vector2(
          corridor.endPosition.x - this.roomWidth + 1,
          Random.randomInt(corridor.endPosition.y - this.roomHeight + 1, corridor.endPosition.y)
        );
        this.pos.y = Random.clamp(this.pos.y, 0, rows - this.roomHeight);
        break;
    }
  }

}
export { Room };