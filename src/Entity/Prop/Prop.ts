import Entity from '../Entity';
import Vector2 from '../../Vector';
import Color from '../../Canvas/Color';

interface PropOptions {
  pos: Vector2,
  isActive: boolean,
  color: Color,
  char: string,
  canBePickedUp: boolean,
  weight?: number,
}

class Prop implements Entity {

  public pos: Vector2;
  public isActive: boolean;

  public color: Color;
  public char: string;

  public canBePickedUp: boolean;
  public weight: number;

  constructor (options: PropOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

}