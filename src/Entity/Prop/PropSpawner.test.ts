import { PropSpawner, WeaponParams } from './PropSpawner';
import { DamageType, Quality, MaterialType } from './Prop.data';
import { Range } from '../../Random/Dice';
import { Legendary } from '../../Random/Legendary';

const spawner: PropSpawner = new PropSpawner();

const piercingWeapon = spawner.debugSpawnWeapon({
  baseDamage: {
    type: DamageType.PIERCE,
    damageRange: <Range>{ low: 5, high: 6 },
    bonusRange: <Range>{ low: 1, high: 2 }
  },
  qualityRange: [Quality.COMMON, Quality.GOOD],
  material: MaterialType.METAL
});
console.log(piercingWeapon);
const slashingWeapon = spawner.debugSpawnWeapon(<WeaponParams>{
  baseDamage: {
    type: DamageType.PIERCE,
    damageRange: <Range>{ low: 5, high: 6 },
    bonusRange: <Range>{ low: 1, high: 2 }
  },
  qualityRange: [Quality.COMMON, Quality.GOOD],
  material: MaterialType.METAL
});
console.log(slashingWeapon);