import { PickupProp, MaterialProp, DamagingProp, HasParts, AbstractMaterialProp, AbstractDamagingProp } from "../Prop";
import { DamageType, Quality, MaterialType, Material } from "../Prop.data";
import Vector2 from "../../../Vector";
import { InventoryItems } from "../../Actor/Player";
import { Random } from "ossuary";

interface DamageParams {
  bonusRange: Random.IntegerRange,
  damageRange: Random.IntegerRange,
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
  canBePickedUp: boolean,
  type: InventoryItems,
  isActive: boolean
}

export { WeaponSpawnParams, DamageParams, WeaponChar, WeaponDefaultProps }