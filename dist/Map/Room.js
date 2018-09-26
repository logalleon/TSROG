"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("../Vector");
const Corridor_1 = require("./Corridor");
const ossuary_1 = require("ossuary");
class Room {
    constructor() {
        this.isActive = false;
    }
    initialRoom(widthRange, heightRange, columns, rows) {
        this.roomWidth = ossuary_1.Random.randomInt(widthRange.low, widthRange.high);
        this.roomHeight = ossuary_1.Random.randomInt(heightRange.low, heightRange.high);
        this.pos = new Vector_1.default(Math.round(columns / 2 - this.roomWidth / 2), Math.round(columns / 2 - this.roomHeight / 2));
    }
    subsequentRoom(widthRange, heightRange, columns, rows, corridor) {
        this.enteringCorridor = corridor.direction;
        this.roomWidth = ossuary_1.Random.randomInt(widthRange.low, widthRange.high);
        this.roomHeight = ossuary_1.Random.randomInt(heightRange.low, heightRange.high);
        switch (corridor.direction) {
            case Corridor_1.Direction.North:
                this.roomHeight = ossuary_1.Random.clamp(this.roomHeight, 1, rows - corridor.endPosition.y);
                this.pos = new Vector_1.default(ossuary_1.Random.randomInt(corridor.endPosition.x - this.roomWidth + 1, corridor.endPosition.x), corridor.endPosition.y);
                this.pos.x = ossuary_1.Random.clamp(this.pos.x, 0, columns - this.roomWidth);
                break;
            case Corridor_1.Direction.East:
                this.roomWidth = ossuary_1.Random.clamp(this.roomWidth, 1, columns - corridor.endPosition.x);
                this.pos = new Vector_1.default(corridor.endPosition.x, ossuary_1.Random.randomInt(corridor.endPosition.y - this.roomHeight + 1, corridor.endPosition.y));
                this.pos.y = ossuary_1.Random.clamp(this.pos.y, 0, rows - this.roomHeight);
                break;
            case Corridor_1.Direction.South:
                this.roomHeight = ossuary_1.Random.clamp(this.roomHeight, 1, corridor.endPosition.y);
                this.pos = new Vector_1.default(ossuary_1.Random.randomInt(corridor.endPosition.x - this.roomWidth + 1, corridor.endPosition.x), corridor.endPosition.y - this.roomHeight + 1);
                this.pos.x = ossuary_1.Random.clamp(this.pos.x, 0, columns - this.roomWidth);
                break;
            case Corridor_1.Direction.West:
                this.roomWidth = ossuary_1.Random.clamp(this.roomWidth, 1, corridor.endPosition.x);
                this.pos = new Vector_1.default(corridor.endPosition.x - this.roomWidth + 1, ossuary_1.Random.randomInt(corridor.endPosition.y - this.roomHeight + 1, corridor.endPosition.y));
                this.pos.y = ossuary_1.Random.clamp(this.pos.y, 0, rows - this.roomHeight);
                break;
        }
    }
}
exports.Room = Room;
//# sourceMappingURL=Room.js.map