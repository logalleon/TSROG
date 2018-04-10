import { Prop, PropOptions, Quality } from './Prop';

interface ArmorOptions {
  modifier: number,
  material: string,
  quality: Quality,
  propOptions: PropOptions
}

class Armor extends Prop {

  public modifier: number;

  constructor (options: ArmorOptions) {
    super(options.propOptions);
    for (let key in options) {
      if (key !== 'propOptions') {
        this[key] = options[key];
      }
    }
  }

}

export { Armor, ArmorOptions };