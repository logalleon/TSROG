import { Prop, PropOptions } from './Prop';
import { Quality } from './Prop.data';

interface WeaponOptions {
  bonus?: number,
  material: string,
  damage: string
  quality: Quality,
  weaponType: WeaponType,
  propOptions: PropOptions
}

interface WeaponType {
  category: string,
  modifier: string | null // @TODO this should probably be an interface, too, with magical damage
  // Maybe even an array of magical damage types?
}

class Weapon extends Prop {

  public bonus: number = 0;
  public material: string;
  public damage: string;
  public quality: Quality;

  public weaponType: WeaponType;

  constructor (options: WeaponOptions) {
    super(options.propOptions);
    for (let key in options) {
      if (key !== 'propOptions') {
        this[key] = options[key];
      }
    }
  }

  getDamage (): string {
    return `${this.damage}+${this.bonus}`;
  }

  getFormattedName (): string {
    const { name, material } = this;
    const { modifier } = this.weaponType;
    return `${modifier} ${material} ${name.toLowerCase()}`;
  }

}

export { Weapon, WeaponOptions, WeaponType };