import { Room } from './Room';
import Vector2 from '../Vector';
import { Random } from 'ossuary';
import { IntegerRange } from 'ossuary/dist/lib/Random';


enum Direction {
  North,
  East,
  South,
  West
}

class Corridor {

  public startingPosition: Vector2;
  public length: number;

  public endPosition: Vector2;

  public direction: Direction;

  constructor () {

  }

  setup (
    room: Room,
    corridorLength: IntegerRange,
    widthRange: IntegerRange,
    heightRange: IntegerRange,
    columns: number,
    rows: number,
    isInitialCorridor: boolean
  ) {
    this.direction = <Direction>Random.randomInt(0, 3);
    // See unity video, but this makes sure the map doesn't double back on itself constantly
    const oppositeDirection = <Direction>(<number>(room.enteringCorridor + 2) % 4);
    // If the room is doubling back, "turn" the map
    if (!isInitialCorridor && this.direction === oppositeDirection) {
      let correctedDirection = this.direction;
      correctedDirection++;
      correctedDirection = correctedDirection % 4;
      this.direction = correctedDirection;
    }
    this.length = Random.randomInt(corridorLength.low, corridorLength.high);
    let maxLength = corridorLength.high;
    switch (this.direction) {
      case Direction.North:
        this.startingPosition = new Vector2(
          Random.randomInt(room.pos.x, room.pos.x + room.roomWidth - 1),
          room.pos.y + room.roomHeight
        );
        // The maximum length is the height of the board from the top of the room it's coming from
        maxLength = rows - this.startingPosition.y - heightRange.low;
        break;
      case Direction.East:
        this.startingPosition = new Vector2(
          room.pos.x + room.roomWidth,
          Random.randomInt(room.pos.y, room.pos.y + room.roomHeight - 1)
        );
        maxLength = columns - this.startingPosition.x - widthRange.low;
        break;
      case Direction.South:
        this.startingPosition = new Vector2(
          Random.randomInt(room.pos.x, room.pos.x + room.roomWidth),
          room.pos.y
        );
        maxLength = this.startingPosition.y - heightRange.low;
        break;
      case Direction.West:
        this.startingPosition = new Vector2(
          room.pos.x,
          Random.randomInt(room.pos.y, room.pos.y + room.roomHeight)
        );
        maxLength = this.startingPosition.x - widthRange.low;
        break;
    }
    this.length = Random.clamp(this.length, 1, maxLength);
    this.setEndPosition();
  }

  setEndPosition () {
    this.endPosition = new Vector2((
      (this.direction === Direction.North || this.direction === Direction.South) ?
        this.startingPosition.x :
      (this.direction === Direction.East) ?
        this.startingPosition.x + this.length - 1 :
      this.startingPosition.x - this.length + 1),(
      (this.direction === Direction.East || this.direction === Direction.West) ?
        this.startingPosition.y :
      (this.direction === Direction.North) ?
        this.startingPosition.y + this.length - 1 :
      this.startingPosition.y - this.length + 1)
    );
  }

}
export { Corridor, Direction };