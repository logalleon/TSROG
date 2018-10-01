"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const EnemyCorpseSpawner_1 = require("./Actor/Enemy/EnemyCorpseSpawner");
class EntityManager {
    constructor() {
        this.enemeyCorpseSpawner = new EnemyCorpseSpawner_1.EnemyCorpseSpawner();
    }
    updatePlayerPos(player, nextPos) {
        const { tiles } = Game_1.default.instance.currentFloor;
        const { x, y } = player.pos;
        const { x: nextX, y: nextY } = nextPos;
        // This is a reference to the row and the items themselves - don't forget they're essentially pointers
        let p_row = tiles[y];
        let p_item = p_row[x];
        // @TODO This isn't right. Clearing out the occupiers will mess up what's in that tile
        // especially when Tile becomes a class
        p_item.occupiers = [];
        p_item.isOccupied = false;
        // Select the next row and tiles
        p_row = tiles[nextY];
        p_item = p_row[nextX];
        p_item.occupiers = [player];
        p_item.isOccupied = true;
        // @TODO revisit above
        Game_1.default.instance.currentFloor.tiles = tiles;
        // Update the player's position internally
        player.move(nextPos);
    }
    updateEnemyPosition(oldPos, newPos, enemy) {
        const { x, y } = oldPos;
        const { currentFloor } = Game_1.default.instance;
        // Remove here
        currentFloor.tiles[y][x].occupiers = currentFloor.tiles[y][x].occupiers.filter(occupier => !occupier.isEnemy);
        currentFloor.tiles[y][x].isOccupied = false;
        // Add to the next position
        try {
            Array.isArray(currentFloor.tiles[newPos.y][newPos.x].occupiers) ?
                currentFloor.tiles[newPos.y][newPos.x].occupiers.push(enemy) :
                currentFloor.tiles[newPos.y][newPos.x].occupiers = [enemy];
            currentFloor.tiles[newPos.y][newPos.x].isOccupied = true;
        }
        catch (e) {
            console.log(oldPos, newPos, currentFloor.tiles);
        }
    }
    corpsify(enemy) {
        if (enemy.isDead()) {
            this.removeDeadOccupants(enemy.pos);
            // @TODO generate a bloody mess to inspect
            this.enemeyCorpseSpawner.generateCorpse(enemy);
        }
        return enemy.isActive;
    }
    removeDeadOccupants(pos) {
        const { currentFloor } = Game_1.default.instance;
        const { x, y } = pos;
        let { occupiers } = currentFloor.tiles[y][x];
        // Bring out the dead
        occupiers = occupiers.filter((occupier) => !occupier.isDead()); // @TODO remove at the actual index
        currentFloor.tiles[y][x].occupiers = occupiers;
        currentFloor.tiles[y][x].isOccupied = Boolean(occupiers.length);
    }
}
exports.EntityManager = EntityManager;
//# sourceMappingURL=EntityManager.js.map