"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("../Vector");
const ossuary_1 = require("ossuary");
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["East"] = 1] = "East";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
exports.Direction = Direction;
class Corridor {
    constructor() {
    }
    setup(room, corridorLength, widthRange, heightRange, columns, rows, isInitialCorridor) {
        this.direction = ossuary_1.Random.randomInt(0, 3);
        // See unity video, but this makes sure the map doesn't double back on itself constantly
        const oppositeDirection = ((room.enteringCorridor + 2) % 4);
        // If the room is doubling back, "turn" the map
        if (!isInitialCorridor && this.direction === oppositeDirection) {
            let correctedDirection = this.direction;
            correctedDirection++;
            correctedDirection = correctedDirection % 4;
            this.direction = correctedDirection;
        }
        this.length = ossuary_1.Random.randomInt(corridorLength.low, corridorLength.high);
        let maxLength = corridorLength.high;
        switch (this.direction) {
            case Direction.North:
                this.startingPosition = new Vector_1.default(ossuary_1.Random.randomInt(room.pos.x, room.pos.x + room.roomWidth - 1), room.pos.y + room.roomHeight);
                // The maximum length is the height of the board from the top of the room it's coming from
                maxLength = rows - this.startingPosition.y - heightRange.low;
                break;
            case Direction.East:
                this.startingPosition = new Vector_1.default(room.pos.x + room.roomWidth, ossuary_1.Random.randomInt(room.pos.y, room.pos.y + room.roomHeight - 1));
                maxLength = columns - this.startingPosition.x - widthRange.low;
                break;
            case Direction.South:
                this.startingPosition = new Vector_1.default(ossuary_1.Random.randomInt(room.pos.x, room.pos.x + room.roomWidth), room.pos.y);
                maxLength = this.startingPosition.y - heightRange.low;
                break;
            case Direction.West:
                this.startingPosition = new Vector_1.default(room.pos.x, ossuary_1.Random.randomInt(room.pos.y, room.pos.y + room.roomHeight));
                maxLength = this.startingPosition.x - widthRange.low;
                break;
        }
        this.length = ossuary_1.Random.clamp(this.length, 1, maxLength);
        this.setEndPosition();
    }
    setEndPosition() {
        this.endPosition = new Vector_1.default(((this.direction === Direction.North || this.direction === Direction.South) ?
            this.startingPosition.x :
            (this.direction === Direction.East) ?
                this.startingPosition.x + this.length - 1 :
                this.startingPosition.x - this.length + 1), ((this.direction === Direction.East || this.direction === Direction.West) ?
            this.startingPosition.y :
            (this.direction === Direction.North) ?
                this.startingPosition.y + this.length - 1 :
                this.startingPosition.y - this.length + 1));
    }
}
exports.Corridor = Corridor;
//# sourceMappingURL=Corridor.js.map