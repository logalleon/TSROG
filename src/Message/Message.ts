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
  private maxMessages: number;

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
        ${message.text}
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
    console.log(message);
    this.bottomEl.style.color = message.color.val();
    this.bottomEl.innerText = message.text;
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
        ${message.text}
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