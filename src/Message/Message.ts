import { Color, Colors } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';

const invalidInput = (keyValue: string): Message => ({
  text: `Unrecognized input '${keyValue}'.`,
});

interface Message {
  text: string,
  color?: Color
}

interface MessengerOptions {
  panel1: HTMLElement,
  panel2: HTMLElement,
  panel3: HTMLElement,
  bottom: HTMLElement
}

class Messenger {

  public panel1: HTMLElement;
  public panel2: HTMLElement;
  public panel3: HTMLElement;
  public bottom: HTMLElement;
  public messages: Message[];
  
  private htmlWrapper = 'p';
  public static colorSegmentWrapper = 'span';
  private maxMessages: number;

  private colorStartDelimiter = '<<';
  private colorSegmentStartDelimiter = '>';
  private colorSegmentEndDelimiter = '>>';
  private colorKeyValuePairDelimiter = ':';

  constructor (options: MessengerOptions) {
    this.panel1 = options.panel1;
    this.panel2 = options.panel2;
    this.panel3 = options.panel3;
    this.bottom = options.bottom;
    this.messages = [];
  }

  logMessages (newMessages: Message[]) {
    if (newMessages && newMessages.length) {
      /* I don't know if limiting max messages saved is a good idea
      if (newMessages.length + this.messages.length > this.maxMessages) {
        this.messages = this.messages.slice(newMessages.length).concat(newMessages);
      } else {
        this.messages = this.messages.concat(newMessages);
      } */
      //this.messages = this.messages.concat(newMessages);
      const html = [this.panel1.innerHTML].concat(newMessages.map((message) => (`
        <${this.htmlWrapper}>
          ${Messenger.colorize(message.text, Colors.DEFAULT)}
        </${this.htmlWrapper}>
      `)));
      this.panel1.innerHTML = html.join('');
    }
  }

  writeToPanel (panel: string, messages: Message[]) {
    console.log(this[panel]);
    if (messages && messages.length) {
      const html = [this[panel].innerHTML].concat(messages.map((message) => (`
        <${this.htmlWrapper}>
          ${Messenger.colorize(message.text, Colors.DEFAULT)}
        </${this.htmlWrapper}>
      `)));
      this[panel].innerHTML = html.join('');
    }
  }

  clearMessages () {
    this.panel1.innerHTML = '';
    // @TODO let's try this . . .
    this.messages = [];
  }

  clearBottomMessages () {
    this.bottom.innerHTML = '';
  }

  logBottomMessage (message: Message) {
    this.bottom.style.color = message.color.val();
    this.bottom.innerText = this.formatText(message.text);
  }

  static colorize (text: string, color: Color) {
    return `
      <${Messenger.colorSegmentWrapper} style='color: ${color.val()}'>
        ${text}
      </${Messenger.colorSegmentWrapper}>
    `;
  }

  formatText (text: string): string {
    const {
      colorSegmentStartDelimiter: cssd,
      colorStartDelimiter: csd,
      colorKeyValuePairDelimiter: ckvpd,
      colorSegmentEndDelimiter: csed
    } = this;
    const { colorSegmentWrapper: csr } = Messenger;
    if (text.indexOf(this.colorStartDelimiter) !== -1) {
      while (text.indexOf(csd) !== -1) {
        const [key, value] = text.slice(
          text.indexOf(csd) + csd.length,
          text.indexOf(cssd)
        ).split(ckvpd);
        const color: Color = new Color({ [key]: value });
        let segment = text.slice(
          text.indexOf(cssd) + cssd.length,
          text.indexOf(csed)
        );
        segment = `
          <${csr} style='color: ${color.val()}'>
            ${segment}
          </${csr}>
        `;
        let start = text.slice(0, text.indexOf(csd));
        let tail = text.slice(text.indexOf(csed) + csed.length);
        text = `${start}${segment}${tail}`;
      }
    }
    return text;
  }

  showAllCurrentMessage (): void {
    let html = [];
    if (!this.messages.length) {
      html.push(`
        <${this.htmlWrapper} style='color: ${fontOptions.fontColor}'>
        No messages to display.
        </${this.htmlWrapper}>
      `);
    } else {
      html = this.messages.map((message) => (`
        <${this.htmlWrapper} style='color: ${message.color.val()}'>
        ${this.formatText(message.text)}
        </${this.htmlWrapper}>
      `));
    }
    this.panel1.innerHTML = html.map(String.prototype.trim).join('');
  }

  renderReturnToMap (): void {
    this.clearBottomMessages();
    this.logBottomMessage({
      text: `Press [SPACE] or [ESC] to exit.`,
      color: Colors.DEFAULT
    });
  }
}

export { invalidInput, Messenger, Message, }