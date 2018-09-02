import { Color, Colors } from '../Canvas/Color';
import { fontOptions } from '../Canvas/Canvas';
import { Message, MessengerOptions } from './interfaces';
import Formatter from './Formatter';

const invalidInput = (keyValue: string): Message => ({
  text: `Unrecognized input '${keyValue}'.`,
});

enum Panel {
  PANEL_1 = 'panel1',
  PANEL_2 = 'panel2',
  PANEL_3 = 'panel3',
  BOTTOM = 'bottom'
}

class Messenger {

  // It's important that these accessors match up with the Panel enum values above
  public panel1: HTMLElement;
  public panel2: HTMLElement;
  public panel3: HTMLElement;
  public bottom: HTMLElement;
  
  private htmlWrapper = 'p';
  private formatter: Formatter;

  constructor (options: MessengerOptions) {
    this.panel1 = options.panel1;
    this.panel2 = options.panel2;
    this.panel3 = options.panel3;
    this.bottom = options.bottom;

    this.formatter = new Formatter();
  }

  static colorize (text: string, color: Color) {
    return `
      <${Formatter.colorSegmentWrapper} style='color: ${color.val()}'>
        ${text}
      </${Formatter.colorSegmentWrapper}>
    `;
  }

  writeToPanel (panel: Panel, messages: Message[], setAsActive?: boolean) {
    if (messages && messages.length) {
      const html = [this[panel].innerHTML].concat(messages.map((message) => {
        const classList = message.classList || '';
        return (`
          <${this.htmlWrapper} class="${classList}">
            ${Messenger.colorize(message.text, Colors.DEFAULT)}
          </${this.htmlWrapper}>
        `)}));
      if (setAsActive) {
        for (let key in Panel) {
          const value = Panel[key];
          <HTMLElement>(this[value]).classList.remove('active');
        }
        this[panel].classList.add('active');
      }
      this[panel].innerHTML = html.join('');
    }
    //  else {
    //   throw new Error(`Received {${messages}} in Messenger::writeToPanel()`);
    // }
  }

  setPanelAsActive (panel: Panel) {
    for (let key in Panel) {
      const value = Panel[key];
      <HTMLElement>(this[value]).classList.remove('active');
    }
    this[panel].classList.add('active');
  }

  clearPanel (panel: Panel) { 
    this[panel].innerHTML = '';
  }

  renderReturnToMap (): void {
    this.clearPanel(Panel.BOTTOM);
    this.writeToPanel(Panel.BOTTOM, [{
      text: `Press [SPACE] or [ESC] to exit.`,
      color: Colors.DEFAULT
    }]);
  }

}

export { invalidInput, Messenger, Message, Panel }