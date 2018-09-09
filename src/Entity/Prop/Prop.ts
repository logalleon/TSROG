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
  isPickup: boolean
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

export { Prop, BlockingProp, PickupProp, MaterialProp, DamagingProp, Pickup, HasParts, Part };