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
  GREEN: new Color({ html: 'kellygreen' }),
  VIOLET: new Color({ html: 'violet' }),
  WHITE: new Color({ html: 'white' }),
  DEFAULT: new Color({ html: 'white' }), // fontOptions.fontColor??
  ORANGE: new Color({ html: 'orange' }),
  SLATEBLUE: new Color({ html: 'slate blue' })
};

export { IColor, Color, Colors };