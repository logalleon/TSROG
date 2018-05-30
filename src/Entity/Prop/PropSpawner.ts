import Game from '../../Game';
import { WeaponOptions, Weapon } from './Weapon';
import { DamageType, Quality, Material, MaterialType, MaterialSubtype, Damage } from './Prop.data';
import { Range, randomIntR, pluck } from '../../Random/Dice';
import { PropOptions } from './Prop';
import { Colors } from '../../Canvas/Color';
import { Legendary } from '../../Random/Legendary';

interface WeaponParams {
  baseDamage: DamageRange,
  additionalDamageRange?: DamageRange[],
  qualityRange: Quality[],
  material: Material[] | MaterialType,
}

interface DamageRange {
  bonusRange: Range,
  damageRange: Range,
  type: DamageType
}

class PropSpawner {
 
  constructor () {
  }

  spawnWeapon (params: WeaponParams): Weapon {
    const { parse } = Game.instance.legendary;
    const bonus = randomIntR(params.baseDamage.bonusRange);
    const damage = `d${randomIntR(params.baseDamage.damageRange)}`;
    const { type } = params.baseDamage;
    const quality = pluck(params.qualityRange);
    const name = parse(`[weapons.melee${type}]`);

    let material: Material;
    if (Array.isArray(params.material)) {
      material = pluck(params.material)
    } else {
      const subtype: MaterialSubtype = <MaterialSubtype>parse(`[${params.material}]`);
      material = {
        type: params.material,
        subtype
      };
    }
    const propOptions: PropOptions = {
      color: Colors.RED,
      char: 'S',
      name,
    }
    const weapon = new Weapon({
      baseDamage: <Damage>{
        damage,
        bonus,
        type
      },
      propOptions,
      material,
      quality
    });
    if (!weapon.description) {
      weapon.generateDescription();
    }
    return weapon;
  }

  debugSpawnWeapon (params: WeaponParams): Weapon {
    const L = new Legendary();
    let { parse } = L;
    parse = parse.bind(L);

    const bonus = randomIntR(params.baseDamage.bonusRange);
    const damage = `d${randomIntR(params.baseDamage.damageRange)}`;
    const { type } = params.baseDamage;
    const quality = pluck(params.qualityRange);
    const name = parse(`[weapons.melee.${type}]`);

    let material: Material;
    if (Array.isArray(params.material)) {
      material = pluck(params.material)
    } else {
      const subtype: MaterialSubtype = <MaterialSubtype>parse(`[materials.${params.material}]`);
      material = {
        type: params.material,
        subtype
      };
    }
    const propOptions: PropOptions = {
      color: Colors.RED,
      char: 'S',
      name,
    }
    const weapon = new Weapon({
      baseDamage: <Damage>{
        damage,
        bonus,
        type
      },
      propOptions,
      material,
      quality
    });
    if (!weapon.description) {
      weapon.generateDescription();
    }
    return weapon;
  }

}
export { PropSpawner, WeaponParams };