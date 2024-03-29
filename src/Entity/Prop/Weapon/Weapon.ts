import { Material, Quality, Damage, MaterialType, MaterialSubtype } from '../Prop.data';
import { InventoryItems } from '../../Actor/Player';
import Vector2 from '../../../Vector';
import { Color } from '../../../Canvas/Color';
import { Description } from '../../Entity';
import { Parts, WeaponLookupTable } from './Weapon.data';
import { Part, AbstractPickupProp, AbstractDamagingProp, Prop, PickupProp, AbstractDamagingPickupMaterialProp, MaterialProp, DamagingProp, HasParts, DamagingPickupMaterialProp } from '../Prop';
import Game from '../../../Game';
import { DetailFn, PhraseFn } from '../Detail.data';
import { Random } from 'ossuary';
import { shuffle } from '../../../Util';


class Weapon extends AbstractDamagingPickupMaterialProp implements HasParts {

  public parts: Part[];

  constructor (options: DamagingPickupMaterialProp) {
    super(options);
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

  generateDescription (): Description {
    let partsToDescribe = Game.instance.dungeonGenerator.propSpawner.detailGenerator.getNumberOfDetails(this.quality);
    const parts: Part[] = shuffle([].concat(this.parts));
    if (partsToDescribe > parts.length) {
      partsToDescribe = parts.length;
    }
    let description = `The ${this.getFormattedName()} is of ${this.quality} quality.`;
    let descriptionLong = '';
    // @TODO shuffle the array of parts
    for (let i = 0; i < partsToDescribe; i++) {
      const part: Part = parts[i];
      const { name, details } = part;
      description += ` The ${name} `;
      const phrase: PhraseFn = Random.pluck(details);
      description += `${Game.instance.legendary.recursiveslyParse(phrase(this.quality, Game.instance))}`
        .replace(/\n/g, '')
        .replace(/\t/g, '');
    }
    return { description, descriptionLong };
  }

}

export { Weapon };