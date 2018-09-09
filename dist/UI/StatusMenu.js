"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const lodash_1 = require("lodash");
const Messenger_1 = require("../Message/Messenger");
const Color_1 = require("../Canvas/Color");
class StatusMenu {
    constructor(el) {
        this.el = el;
    }
    render() {
        const { player } = Game_1.default.instance;
        const level = `<span class="status" id="player-level">Level ${player.level}</span>`;
        const hp = `<span class="status" id="player-hp">HP ${Math.round(player.hp)}/${player.maxHp}</span>`;
        const hunger = `<span class="status" id="player-hunger">Hunger ${Messenger_1.Messenger.colorize(lodash_1.startCase(player.hunger.level), Color_1.StatusColors.HUNGER)}</span>`;
        const thirst = `<span class="status" id="player-thirst">Thirst ${Messenger_1.Messenger.colorize(lodash_1.startCase(player.thirst.level), Color_1.StatusColors.THIRST)}</span>`;
        const regen = `<span class="status" id="player-regen">Regen ${player.hpRegen}</span>`;
        const otherStatuses = this.buildOtherStatusEffects();
        this.el.innerHTML = `${level}${hp}${regen}${hunger}${thirst}`;
    }
    buildOtherStatusEffects() {
        return '';
    }
}
exports.StatusMenu = StatusMenu;
//# sourceMappingURL=StatusMenu.js.map