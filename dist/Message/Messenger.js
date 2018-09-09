"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../Canvas/Color");
const Formatter_1 = require("./Formatter");
const invalidInput = (keyValue) => ({
    text: `Unrecognized input '${keyValue}'.`,
});
exports.invalidInput = invalidInput;
var Panel;
(function (Panel) {
    Panel["PANEL_1"] = "panel1";
    Panel["PANEL_2"] = "panel2";
    Panel["PANEL_3"] = "panel3";
    Panel["BOTTOM"] = "bottom";
})(Panel || (Panel = {}));
exports.Panel = Panel;
class Messenger {
    constructor(options) {
        this.htmlWrapper = 'p';
        this.panel1 = options.panel1;
        this.panel2 = options.panel2;
        this.panel3 = options.panel3;
        this.bottom = options.bottom;
        this.formatter = new Formatter_1.default();
    }
    static colorize(text, color) {
        return `
      <${Formatter_1.default.colorSegmentWrapper} style='color: ${color.val()}'>
        ${text}
      </${Formatter_1.default.colorSegmentWrapper}>
    `;
    }
    writeToPanel(panel, messages, setAsActive) {
        if (messages && messages.length) {
            const html = [this[panel].innerHTML].concat(messages.map((message) => {
                const classList = message.classList || '';
                return (`
          <${this.htmlWrapper} class="${classList}">
            ${Messenger.colorize(message.text, Color_1.Colors.DEFAULT)}
          </${this.htmlWrapper}>
        `);
            }));
            if (setAsActive) {
                for (let key in Panel) {
                    const value = Panel[key];
                    (this[value]).classList.remove('active');
                }
                this[panel].classList.add('active');
            }
            this[panel].innerHTML = html.join('');
        }
        //  else {
        //   throw new Error(`Received {${messages}} in Messenger::writeToPanel()`);
        // }
    }
    setPanelAsActive(panel) {
        for (let key in Panel) {
            const value = Panel[key];
            (this[value]).classList.remove('active');
        }
        this[panel].classList.add('active');
    }
    clearPanel(panel) {
        this[panel].innerHTML = '';
    }
    renderReturnToMap() {
        this.clearPanel(Panel.BOTTOM);
        this.writeToPanel(Panel.BOTTOM, [{
                text: `Press [SPACE] or [ESC] to exit.`,
                color: Color_1.Colors.DEFAULT
            }]);
    }
}
exports.Messenger = Messenger;
//# sourceMappingURL=Messenger.js.map