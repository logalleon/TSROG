import { fontOptions } from '../Canvas/Canvas';

interface IColor {
  hex?: string,
  rgb?: string,
  html?: string
  val(): string
}

class Color implements IColor {

  public hex: string;
  public rgb: string;
  public html: string;

  constructor (options) {
    for (let key in options) {
      this[key] = options[key]; // idgaf
    }
  }

  val (): string {
    return this.hex || this.rgb || this.html;
  }

}

const Colors = {
  RED: new Color({ html: 'red' }),
  GREEN: new Color({ html: 'green' }),
  VIOLET: new Color({ html: 'violet' }),
  WHITE: new Color({ html: 'white' }),
  DEFAULT: new Color({ html: 'white' }),
  ORANGE: new Color({ html: 'orange' }),
  SLATEBLUE: new Color({ html: 'slateblue' }),
  DAMAGE_DEFAULT: new Color({ html: 'tomato' }),
  DAMAGE_MASSIVE: new Color({ html: 'fuchsia' }),
  TARGET_DEFAULT: new Color({ html: 'khaki' }),
  DEATH_DEFAULT: new Color({ html: 'indianred'}),
  MISS_DEFAULT: new Color({ html: 'darkviolet' })
};

export { IColor, Color, Colors };