import { Color, Colors } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';

enum Status {
  SUCCESS,
  FAILURE
}

interface ActionResponse {
  status: Status,
  message?: string
}

const invalidInput = (keyValue: string): Message => ({
  text: `Unrecognized input '${keyValue}'.`,
  color: Colors.RED
});

interface Message {
  text: string,
  color: Color
}

class Messenger {

  public el: HTMLElement;
  public bottomEl: HTMLElement;
  public messages: Message[];
  
  private htmlWrapper = 'p';
  private colorSegmentWrapper = 'span';
  private maxMessages: number;

  private colorStartDelimiter = '<<';
  private colorSegmentStartDelimiter = '>';
  private colorSegmentEndDelimiter = '>>';
  private colorKeyValuePairDelimiter = ':';

  constructor (el: HTMLElement, bottomEl: HTMLElement) {
    this.el = el;
    this.bottomEl = bottomEl;
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
      this.messages = this.messages.concat(newMessages);
      const html = [this.el.innerHTML].concat(newMessages.map((message) => (`
        <${this.htmlWrapper} style='color: ${message.color.val()}'>
          ${this.formatText(message.text)}
        </${this.htmlWrapper}>
      `)));
      this.el.innerHTML = html.join('');
    }
  }

  clearMessages () {
    this.el.innerHTML = '';
  }

  clearBottomMessages () {
    this.bottomEl.innerHTML = '';
  }

  logBottomMessage (message: Message) {
    this.bottomEl.style.color = message.color.val();
    this.bottomEl.innerText = this.formatText(message.text);
  }

  formatText (text: string): string {
    if (text.indexOf(this.colorStartDelimiter) !== -1) {
      while (text.indexOf(this.colorStartDelimiter) !== -1) {
        const [key, value] = text.slice(
          text.indexOf(this.colorStartDelimiter) + this.colorStartDelimiter.length,
          text.indexOf(this.colorSegmentStartDelimiter)
        ).split(this.colorKeyValuePairDelimiter);
        const color: Color = new Color({ [key]: value });
        let segment = text.slice(
          text.indexOf(this.colorSegmentStartDelimiter) + this.colorSegmentStartDelimiter.length,
          text.indexOf(this.colorSegmentEndDelimiter)
        );
        segment = `
          <${this.colorSegmentWrapper} style='color: ${color.val()}'>
            ${segment}
          </${this.colorSegmentWrapper}>
        `;
        let start = text.slice(0, text.indexOf(this.colorStartDelimiter));
        let tail = text.slice(text.indexOf(this.colorSegmentEndDelimiter) + this.colorSegmentEndDelimiter.length);
        text = `${start}${segment}${tail}`;
      }
    }
    return text;
  }

  showAllCurrentMessage () {
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
    this.el.innerHTML = html.join('');
  }

  renderSpaceToContinue (): void {
    this.clearBottomMessages();
    this.logBottomMessage({
      text: `Press [SPACE] to exit.`,
      color: Colors.DEFAULT
    });
  }
}

export { Status, ActionResponse, invalidInput, Messenger, Message }