import { PickupProp, MaterialProp, Prop, AbstractPickupProp } from '../Prop';

class Food extends AbstractPickupProp {

  constructor (options: Prop & PickupProp) {
    super(options);
  }

}

export { Food };