"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../Canvas/Color");
class Formatter {
    constructor() {
        this.colorStartDelimiter = '<<';
        this.colorSegmentStartDelimiter = '>';
        this.colorSegmentEndDelimiter = '>>';
        this.colorKeyValuePairDelimiter = ':';
    }
    formatText(text) {
        const { colorSegmentStartDelimiter: cssd, colorStartDelimiter: csd, colorKeyValuePairDelimiter: ckvpd, colorSegmentEndDelimiter: csed } = this;
        const { colorSegmentWrapper: csr } = Formatter;
        if (text.indexOf(this.colorStartDelimiter) !== -1) {
            while (text.indexOf(csd) !== -1) {
                const [key, value] = text.slice(text.indexOf(csd) + csd.length, text.indexOf(cssd)).split(ckvpd);
                const color = new Color_1.Color({ [key]: value });
                let segment = text.slice(text.indexOf(cssd) + cssd.length, text.indexOf(csed));
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
}
Formatter.colorSegmentWrapper = 'span';
exports.default = Formatter;
//# sourceMappingURL=Formatter.js.map