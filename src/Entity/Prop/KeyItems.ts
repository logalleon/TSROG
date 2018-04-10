import { Prop, PropOptions, Quality } from './Prop';

interface KeyItemsOptions {
  propOptions: PropOptions
}

class KeyItems extends Prop {

  public modifier: number;

  constructor (options: KeyItemsOptions) {
    super(options.propOptions);
    for (let key in options) {
      if (key !== 'propOptions') {
        this[key] = options[key];
      }
    }
  }

}

export { KeyItems, KeyItemsOptions };