import { PickupProp, MaterialProp, DamagingProp } from "../Prop";
import { DamageType, Quality, MaterialType, Material } from "../Prop.data";
import { RRange } from "../../../Random/RRange";
import Vector2 from "../../../Vector";
import { InventoryItems } from "../../Actor/Player";

type IWeapon = PickupProp & MaterialProp & DamagingProp;

interface DamageParams {
  bonusRange: RRange,
  damageRange: RRange,
  type: DamageType | DamageType[]
}

interface WeaponSpawnParams {
  baseDamage: DamageParams,
  additionalDamage?: DamageParams[],
  quality: Quality[],
  material: Material[] | MaterialType,
}

interface WeaponChar {
  char: string,
  name: string
}

interface WeaponDefaultProps {
  pos: Vector2,
  isPickup: boolean,
  type: InventoryItems,
  isActive: boolean
}

export { IWeapon, WeaponSpawnParams, DamageParams, WeaponChar, WeaponDefaultProps }