import { Prop, PropOptions } from './Prop';
import { Quality, Material, Damage } from './Prop.data';
import { Legendary } from '../../Random/Legendary';

interface WeaponOptions {
  material: Material,
  baseDamage: Damage,
  additionalDamage?: Damage[],
  quality: Quality,
  propOptions: PropOptions
}

class Weapon extends Prop {

  public material: Material;
  
  public quality: Quality;

  public baseDamage: Damage;
  public additionalDamage: Damage[];

  constructor (options: WeaponOptions) {
    super(options.propOptions);
    for (let key in options) {
      if (key !== 'propOptions') {
        this[key] = options[key];
      }
    }
  }

  getDamage (): string {
    const { damage, bonus } = this.baseDamage;
    return `${damage}+${bonus || 0}`;
  }

  getAdditionalDamage (): string[] {
    return [];
  }

  getFormattedName (): string {
    const { name, material } = this;
    return `${material.subtype} ${name.toLowerCase()}`;
  }

  generateDescription (): string {
    return '';
  }

  debugGenerateDescription (): string {
    const L = new Legendary();
    const { parse } = L;
    return '';
  }

}

export { Weapon, WeaponOptions };