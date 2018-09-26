import Game from '../../Game';
import { DamageType, Quality, Material, MaterialType, MaterialSubtype, Damage } from './Prop.data';
import { Colors } from '../../Canvas/Color';
import { InventoryItems } from '../Actor/Player';
import { WeaponSpawnParams, DamageParams } from './Weapon/WeaponInterfaces';
import Vector2 from '../../Vector';
import { WeaponLookupTable, MeleeWeapons, weaponDefaultProperties } from './Weapon/Weapon.data';
import { Weapon } from './Weapon/Weapon';
import { DetailGenerator } from './DetailGenerator';
import { Random } from 'ossuary';
import { MaterialProp, PickupProp, DamagingProp, Prop } from './Prop';

class PropSpawner {
 
  public detailGenerator: DetailGenerator;

  constructor () {
    this.detailGenerator = new DetailGenerator();
  }

  spawnWeapon (params: WeaponSpawnParams): Weapon {
    console.log(params);
    const { legendary } = Game.instance;
    const bonus = Random.randomIntRange(params.baseDamage.bonusRange);
    const damage = `d${Random.randomIntRange(params.baseDamage.damageRange)}`;
    let type: DamageType = Array.isArray(params.baseDamage.type) ? Random.pluck(<DamageType[]>params.baseDamage.type) : params.baseDamage.type; // @TODO this isn't right
    const quality = Random.pluck(params.quality);
    const index = legendary.parse(`[weapons.melee.${type}]`);

    let material: Material;
    if (Array.isArray(params.material)) {
      material = Random.pluck(params.material)
    } else {
      const subtype: MaterialSubtype = <MaterialSubtype>legendary.parse(`[materials.${params.material}]`);
      console.log(subtype, 'sub');
      material = {
        type: params.material,
        subtype
      };
    }
    const baseDamage: Damage = {
      damage,
      type
    }

    const weaponOfTypeDefaults = WeaponLookupTable[1]; // @TODO wat
    const weaponDefaults = weaponDefaultProperties;

    const options: Prop & MaterialProp & PickupProp & DamagingProp = (<any>Object).assign({}, {
      color: Colors.RED,
      weight: 0,
      material,
      quality,
      baseDamage // @TODO handle additional damage
    }, weaponOfTypeDefaults, weaponDefaults); // @TODO it isn't explicit that Object.assign
    // is properly merging the attributes of weapon of type and weapon defaults
    // this should be made explicit as to pickup any changes to interfaces down the road
    const weapon = new Weapon(options);
    if (!weapon.description) { // @TODO this is for the future, if a weapon has a specified description (special items)
      const { description, descriptionLong } = weapon.generateDescription();
      weapon.description = description;
      weapon.descriptionLong = descriptionLong;
    }
    console.log(weapon);
    return weapon;
  }

}
export { PropSpawner, WeaponSpawnParams };