"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FloorGenerator_1 = require("./FloorGenerator");
const TileSpawner_1 = require("./TileSpawner");
const PropSpawner_1 = require("../Entity/Prop/PropSpawner");
const EnemySpawner_1 = require("../Entity/Actor/EnemySpawner");
const ossuary_1 = require("ossuary");
const MAX_DUNGEON_DEPTH = 100;
exports.MAX_DUNGEON_DEPTH = MAX_DUNGEON_DEPTH;
class DungeonGenerator {
    constructor(options) {
        this.initialDepth = 0;
        this.currentDepth = 0;
        this.floors = [];
        for (let key in options) {
            this[key] = options[key];
        }
        this.maxDepth = ossuary_1.Random.clamp(options.depth, 1, DungeonGenerator.MAX_DUNGEON_DEPTH);
        this.floorGenerator = new FloorGenerator_1.FloorGenerator({});
        this.enemySpawner = new EnemySpawner_1.EnemySpawner();
        this.tileSpawner = new TileSpawner_1.TileSpawner();
        this.propSpawner = new PropSpawner_1.PropSpawner();
    }
    generateNewFloor() {
        if (this.currentDepth <= this.maxDepth) {
            // Generate a similar floor if the previous floor had persistance
            if (this.nextFloorShouldPersist()) {
                this.floors.push(this.floorGenerator.generateSimilarFloor(this.currentDepth, this.floors[this.currentDepth - 1].floorPersistance.startIndex));
            }
            else {
                this.floors.push(this.floorGenerator.generateFloor({
                    depth: this.currentDepth
                }));
            }
            // Make sure to set the depth here
            this.floors[this.currentDepth].depth = this.currentDepth;
            this.floors[this.currentDepth].buildFloor();
            this.currentDepth += 1;
        }
        else {
            console.log('Player shouldnt be here.');
        }
    }
    nextFloorShouldPersist() {
        if (this.currentDepth === 0 || !this.floors[this.currentDepth - 1].floorPersistance) {
            return false;
        }
        const { startIndex } = this.floors[this.currentDepth - 1].floorPersistance;
        const startingFloor = this.floors[startIndex];
        const { willPersistFor } = startingFloor;
        // The floor should only persist if the persistance value hasn't stopped
        return (this.currentDepth - startingFloor.depth <= willPersistFor);
    }
    debugAllFloors() {
        const wrapper = document.getElementById('tiles');
        this.floors.forEach((floor) => {
            const p = document.createElement('p');
            let html = `<h2>${floor.getFormattedName()}</h2>`;
            for (let y = 0; y < floor.floorHeight; y++) {
                for (let x = 0; x < floor.floorWidth; x++) {
                    const tile = floor.tiles[y][x];
                    const { char, color } = tile;
                    html += `<span class='tile' style="color: ${color.val()}">${char}</span>`;
                }
                html += '<br/>';
            }
            p.innerHTML = html;
            wrapper.appendChild(p);
        });
    }
    debugAndGenerateAllFloors() {
        for (let i = 0; i < this.maxDepth; i++) {
            this.generateNewFloor();
        }
        const wrapper = document.getElementById('tiles');
        this.floors.forEach((floor) => {
            const p = document.createElement('p');
            let html = `<h2>${floor.getFormattedName()}</h2>`;
            for (let y = 0; y < floor.floorHeight; y++) {
                for (let x = 0; x < floor.floorWidth; x++) {
                    const tile = floor.tiles[y][x];
                    const { char, color } = tile;
                    html += `<span class='tile' style="color: ${color.val()}">${char}</span>`;
                }
                html += '<br/>';
            }
            p.innerHTML = html;
            wrapper.appendChild(p);
        });
    }
}
DungeonGenerator.MAX_DUNGEON_DEPTH = MAX_DUNGEON_DEPTH;
exports.DungeonGenerator = DungeonGenerator;
//# sourceMappingURL=DungeonGenerator.js.map