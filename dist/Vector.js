"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    static apply(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
}
const ZERO = new Vector2(0, 0);
Vector2.ZERO = ZERO;
exports.default = Vector2;
//# sourceMappingURL=Vector.js.map