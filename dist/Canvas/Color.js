"use strict";
exports.__esModule = true;
var Color = /** @class */ (function () {
    function Color(options) {
        for (var key in options) {
            this[key] = options[key]; // idgaf
        }
    }
    Color.prototype.val = function () {
        console.log(this);
        return this.hex || this.rgb || this.html;
    };
    return Color;
}());
exports.Color = Color;
var Colors = {
    RED: new Color({ html: 'red' }),
    GREEN: new Color({ html: 'kellygreen' }),
    VIOLET: new Color({ html: 'violet' }),
    DEFAULT: new Color({ html: 'white' }) // fontOptions.fontColor??
};
exports.Colors = Colors;
