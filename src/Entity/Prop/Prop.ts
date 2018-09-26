import Entity, { Description } from '../Entity';
import Vector2 from '../../Vector';
import { Color } from '../../Canvas/Color';
import { InventoryItems } from '../Actor/Player';
import { Quality, Material, Damage, DamageType, MaterialType } from './Prop.data';
import { DetailFn, PhraseFn } from './Detail.data';

interface Options {
  name: string,
  description?: string,
  descriptionLong?: string
}

interface Blocking {
  blocksMovement: boolean
}

interface Pickup {
  weight: number,
  type: InventoryItems,
  canBePickedUp: boolean
}

interface OfMaterial {
  material: Material
  quality: Quality
}

interface Damaging {
  baseDamage: Damage,
  additionalDamage?: Damage[],
}

interface Part {
  name: string,
  details: PhraseFn[]
}

interface HasParts {
  parts: Part[]
}

type Prop = Options & Entity & Description;
type BlockingProp = Prop & Blocking;
type PickupProp = Prop & Pickup
type MaterialProp = OfMaterial & Prop;
type DamagingProp = Damaging & Prop;

abstract class AbstractProp implements Prop {

  public name: string;
  public description: string;
  public descriptionLong: string;

  public pos: Vector2;
  public char: string;
  public color: Color;

  public isActive: boolean;

  constructor (options: Prop) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

}

abstract class AbstractBlockingProp extends AbstractProp implements BlockingProp {

  public blocksMovement: boolean = true;

  constructor (options: BlockingProp) {
    super(options);
  }

}

abstract class AbstractPickupProp extends AbstractProp implements PickupProp {

  public weight: number;
  public type: InventoryItems;
  public canBePickedUp: boolean = true;

  constructor (options: PickupProp) {
    super (options);
  }

}

abstract class AbstractMaterialProp extends AbstractProp implements MaterialProp {

  public material: Material;
  public quality: Quality;

  constructor (options: MaterialProp) {
    super(options)
  }

}

abstract class AbstractDamagingProp extends AbstractProp implements DamagingProp {

  public baseDamage: Damage;

  constructor (options: DamagingProp) {
    super(options)
  }

}

type PickupDamagingProp = DamagingProp & PickupProp;
abstract class AbstractDamagingPickupProp extends AbstractPickupProp implements DamagingProp {

  public baseDamage: Damage;

  constructor (options: PickupDamagingProp) {
    super(options);
  }

}

type MaterialPickupProp = MaterialProp & PickupProp;
abstract class AbstractMaterialPickupProp extends AbstractPickupProp implements MaterialProp {

  public material: Material;
  public quality: Quality;

  constructor (options: MaterialPickupProp) {
    super(options)
  }

}

// I WANNA DIE
type DamagingPickupMaterialProp = MaterialPickupProp & DamagingProp;
abstract class AbstractDamagingPickupMaterialProp extends AbstractDamagingPickupProp implements MaterialProp {

  public material: Material;
  public quality: Quality;

  constructor (options: DamagingPickupMaterialProp) {
    super(options)
  }

}

export { Prop, BlockingProp, PickupProp, MaterialProp, DamagingProp, Pickup, HasParts, Part,
  AbstractProp, AbstractPickupProp, AbstractMaterialProp, AbstractBlockingProp, AbstractDamagingProp,
  AbstractDamagingPickupProp,
  AbstractMaterialPickupProp,
  AbstractDamagingPickupMaterialProp,
  DamagingPickupMaterialProp,
  PickupDamagingProp,
  MaterialPickupProp };