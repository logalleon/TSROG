import { Color } from '../Canvas/Color';

interface Message {
  text: string,
  color?: Color,
  classList?: string
}

interface MessengerOptions {
  panel1: HTMLElement,
  panel2: HTMLElement,
  panel3: HTMLElement,
  bottom: HTMLElement
}

export { Message, MessengerOptions };