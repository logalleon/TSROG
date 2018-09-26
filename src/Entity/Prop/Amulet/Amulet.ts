import { PickupProp, MaterialProp, AbstractMaterialPickupProp, Prop } from '../Prop';

class KeyItem extends AbstractMaterialPickupProp {

  constructor (options: Prop & MaterialProp & PickupProp) {
    super(options);
  }

}

export { KeyItem };