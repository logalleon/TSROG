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
  public messages: Message[];
  
  private htmlWrapper = 'span';
  private maxMessages: number;

  constructor (el: HTMLElement) {
    this.el = el;
    this.messages = [];
  }

  logMessages (newMessages: Message[]) {
    if (newMessages.length) {
      if (newMessages.length + this.messages.length > this.maxMessages) {
        this.messages = this.messages.slice(newMessages.length).concat(newMessages);
      } else {
        this.messages = this.messages.concat(newMessages);
      }
      console.log(this.messages);
      const html = [this.el.innerHTML].concat(this.messages.map((message) => (`
        <${this.htmlWrapper} style='color: ${message.color.val()}'>
        ${message.text}
        </${this.htmlWrapper}>
      `)));
      console.log(html);
      console.log(html.join().trim())
      this.el.innerHTML = html.join('');
    }
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



}

export { Status, ActionResponse, invalidInput, Messenger, Message }