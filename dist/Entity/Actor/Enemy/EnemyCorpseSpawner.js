"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../../../Game");
const Color_1 = require("../../../Canvas/Color");
class EnemyCorpseSpawner {
    generateCorpse(enemy) {
        const { pos } = enemy;
        const { x, y } = pos;
        Game_1.default.instance.currentFloor.tiles[y][x].char = Game_1.default.instance.currentFloor.tiles[y][x].occupiers[0].char; // @TODO this needs to get the actual index of the enemy and use it
        Game_1.default.instance.currentFloor.tiles[y][x].color = Color_1.Colors.STANDARD_CORPSE;
    }
}
exports.EnemyCorpseSpawner = EnemyCorpseSpawner;
//# sourceMappingURL=EnemyCorpseSpawner.js.map