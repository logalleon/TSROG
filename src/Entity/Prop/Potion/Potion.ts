import { PickupProp, MaterialProp, Prop, AbstractPickupProp } from '../Prop';

class Potion extends AbstractPickupProp {

  constructor (options: Prop & PickupProp) {
    super(options);
  }

}

export { Potion };