"use strict";
exports.__esModule = true;
var GameMap = /** @class */ (function () {
    function GameMap(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.height = this.tiles.length;
        this.width = this.tiles[0].length;
    }
    GameMap.prototype.inBounds = function (width, height, v) {
        return v.x >= 0 &&
            v.y >= 0 &&
            v.x < width &&
            v.y < height;
    };
    return GameMap;
}());
exports.GameMap = GameMap;
