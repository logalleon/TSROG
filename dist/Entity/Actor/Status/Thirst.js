"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
var ThirstLevels;
(function (ThirstLevels) {
    ThirstLevels["BURSTING"] = "bursting";
    ThirstLevels["VERY_HYDRATED"] = "very hydrated";
    ThirstLevels["NOT_THIRSTY"] = "not thirsty";
    ThirstLevels["THIRSTY"] = "thirsty";
    ThirstLevels["VERY_THIRSTY"] = "very thirsty";
    ThirstLevels["PARCHED"] = "parched";
})(ThirstLevels || (ThirstLevels = {}));
exports.ThirstLevels = ThirstLevels;
class Thirst {
    constructor() {
        this.scale = [500, 400, 300, 200, 100];
        this.thirst = config_1.STARTING_THIRST;
        this.update();
    }
    update() {
        this.thirst--;
        if (this.thirst >= this.scale[0]) {
            this.level = ThirstLevels.BURSTING;
        }
        else if (this.thirst > this.scale[1]) {
            this.level = ThirstLevels.VERY_HYDRATED;
        }
        else if (this.thirst > this.scale[2]) {
            this.level = ThirstLevels.NOT_THIRSTY;
        }
        else if (this.thirst > this.scale[3]) {
            this.level = ThirstLevels.THIRSTY;
        }
        else if (this.thirst > this.scale[4]) {
            this.level = ThirstLevels.VERY_THIRSTY;
        }
        else {
            this.level = ThirstLevels.PARCHED;
        }
    }
    eat(amount) {
        this.thirst += amount;
    }
}
exports.Thirst = Thirst;
//# sourceMappingURL=Thirst.js.map