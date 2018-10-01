import { PickupProp, MaterialProp, AbstractMaterialPickupProp, Prop } from '../Prop';

class Amulet extends AbstractMaterialPickupProp {

  constructor (options: Prop & MaterialProp & PickupProp) {
    super(options);
  }

}

export { Amulet };