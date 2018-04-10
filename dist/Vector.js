"use strict";
exports.__esModule = true;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
    };
    Vector2.apply = function (v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    };
    return Vector2;
}());
exports["default"] = Vector2;
