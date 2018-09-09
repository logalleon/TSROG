"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
var HungerLevels;
(function (HungerLevels) {
    HungerLevels["OVER_FULL"] = "over full";
    HungerLevels["FULL"] = "full";
    HungerLevels["CONTENT"] = "content";
    HungerLevels["HUNGRY"] = "hungry";
    HungerLevels["VERY_HUNGRY"] = "very hungry";
    HungerLevels["STARVING"] = "starving";
})(HungerLevels || (HungerLevels = {}));
exports.HungerLevels = HungerLevels;
class Hunger {
    constructor() {
        this.scale = [500, 400, 300, 200, 100];
        this.hunger = config_1.STARTING_HUNGER;
        this.update();
    }
    update() {
        this.hunger--;
        if (this.hunger >= this.scale[0]) {
            this.level = HungerLevels.OVER_FULL;
        }
        else if (this.hunger > this.scale[1]) {
            this.level = HungerLevels.FULL;
        }
        else if (this.hunger > this.scale[2]) {
            this.level = HungerLevels.CONTENT;
        }
        else if (this.hunger > this.scale[3]) {
            this.level = HungerLevels.HUNGRY;
        }
        else if (this.hunger > this.scale[4]) {
            this.level = HungerLevels.VERY_HUNGRY;
        }
        else {
            this.level = HungerLevels.STARVING;
        }
    }
    eat(amount) {
        this.hunger += amount;
    }
}
exports.Hunger = Hunger;
//# sourceMappingURL=Hunger.js.map