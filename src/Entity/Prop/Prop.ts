import Entity from '../Entity';
import Vector2 from '../../Vector';
import { Color } from '../../Canvas/Color';

interface PropOptions {
  name: string,
  color: Color,
  char: string,
  pos?: Vector2,
  isActive?: boolean,
  canBePickedUp?: boolean,
  weight?: number,
  description?: string,
  descriptionLong?: string
}

class Prop implements Entity {

  public pos: Vector2;
  public isActive: boolean;

  public color: Color;
  public char: string;

  public canBePickedUp: boolean;
  public weight: number;

  public name: string;
  public description: string;
  public descriptionLong: string;

  constructor (options: PropOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

}

export { Prop, PropOptions };