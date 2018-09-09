"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropSpawner_1 = require("./PropSpawner");
const Prop_data_1 = require("./Prop.data");
const spawner = new PropSpawner_1.PropSpawner();
const piercingWeapon = spawner.debugSpawnWeapon({
    baseDamage: {
        type: Prop_data_1.DamageType.PIERCE,
        damageRange: { low: 5, high: 6 },
        bonusRange: { low: 1, high: 2 }
    },
    qualityRange: [Prop_data_1.Quality.COMMON, Prop_data_1.Quality.GOOD],
    material: Prop_data_1.MaterialType.METAL
});
console.log(piercingWeapon);
const slashingWeapon = spawner.debugSpawnWeapon({
    baseDamage: {
        type: Prop_data_1.DamageType.PIERCE,
        damageRange: { low: 5, high: 6 },
        bonusRange: { low: 1, high: 2 }
    },
    qualityRange: [Prop_data_1.Quality.COMMON, Prop_data_1.Quality.GOOD],
    material: Prop_data_1.MaterialType.METAL
});
console.log(slashingWeapon);
//# sourceMappingURL=PropSpawner.test.js.map