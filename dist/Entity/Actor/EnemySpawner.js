"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enemy_1 = require("../Actor/Enemy");
const Enemy_data_1 = require("./Enemy.data");
const Random_1 = require("../../Random/Random");
const Lorlerach_1 = require("../../Map/Regions/Lorlerach");
class EnemySpawner {
    constructor() {
        // this.baseEnemies = this.loadEnemies();
        this.baseEnemies = [].concat(Enemy_data_1.baseEnemies, Lorlerach_1.enemyOptions);
        this.generateEnemyHashMaps();
    }
    generateEnemyHashMaps() {
        this.enemiesByCR = {};
        this.enemiesByCreatureType = {};
        this.baseEnemies.forEach((enemy) => {
            const { cr, creatureType } = enemy;
            this.enemiesByCR[cr] ?
                this.enemiesByCR[cr].push(enemy) :
                this.enemiesByCR[cr] = [enemy];
            const ct = Array.isArray(creatureType) ? creatureType[0] : creatureType;
            this.enemiesByCreatureType[ct] ?
                this.enemiesByCreatureType[ct].push(enemy) :
                this.enemiesByCreatureType[ct] = [enemy];
        });
    }
    generateVariantEnemy(base) {
        return base;
    }
    createEnemyByCr(cr, variant, region) {
        if (this.enemiesByCR[cr]) {
            let options;
            if (region) {
                options = Random_1.pluck(this.enemiesByCR[cr].filter((enemyOptions) => {
                    const regions = enemyOptions.regions;
                    return (typeof regions === 'undefined' || regions.indexOf(region) !== -1);
                }));
            }
            else {
                options = Random_1.pluck(this.enemiesByCR[cr]);
            }
            return new Enemy_1.Enemy(options, variant);
        }
        else {
            console.log('No enemies by that cr');
        }
    }
    createEnemyByCreatureType(creatureType, variant, region) {
        if (this.enemiesByCreatureType[creatureType]) {
            const options = Random_1.pluck(this.enemiesByCreatureType[creatureType]);
            return new Enemy_1.Enemy(options, variant);
        }
        else {
            console.log('No enemies by that creature type');
        }
    }
}
exports.EnemySpawner = EnemySpawner;
//# sourceMappingURL=EnemySpawner.js.map