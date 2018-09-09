"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prop_1 = require("./Prop");
class Armor extends Prop_1.Prop {
    constructor(options) {
        super(options.propOptions);
        for (let key in options) {
            if (key !== 'propOptions') {
                this[key] = options[key];
            }
        }
    }
}
exports.Armor = Armor;
//# sourceMappingURL=Armor.js.map