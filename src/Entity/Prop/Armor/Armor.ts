import { Quality } from "../Prop.data";
import { PickupProp, AbstractMaterialPickupProp, Prop, MaterialProp } from "../Prop";

interface ArmorOptions {
  modifier: number,
  material: string,
  quality: Quality,
}

class Armor extends AbstractMaterialPickupProp {

  public modifier: number;

  constructor (options: Prop & PickupProp & MaterialProp) {
    super(options);
  }

}

export { Armor, ArmorOptions };