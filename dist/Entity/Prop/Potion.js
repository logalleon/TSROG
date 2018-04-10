"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Prop_1 = require("./Prop");
var Potion = /** @class */ (function (_super) {
    __extends(Potion, _super);
    function Potion(options) {
        return _super.call(this, options) || this;
    }
    return Potion;
}(Prop_1.Prop));
exports.Potion = Potion;
