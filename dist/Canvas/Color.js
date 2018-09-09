"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(options) {
        for (let key in options) {
            this[key] = options[key]; // idgaf
        }
    }
    val() {
        return this.hex || this.rgb || this.html;
    }
}
exports.Color = Color;
const Colors = {
    RED: new Color({ html: 'red' }),
    GREEN: new Color({ html: 'green' }),
    VIOLET: new Color({ html: 'violet' }),
    WHITE: new Color({ html: 'white' }),
    DEFAULT: new Color({ html: 'white' }),
    ORANGE: new Color({ html: 'orange' }),
    INDIGO: new Color({ html: 'indigo' }),
    DAMAGE_DEFAULT: new Color({ html: 'tomato' }),
    DAMAGE_MASSIVE: new Color({ html: 'fuchsia' }),
    TARGET_DEFAULT: new Color({ html: 'khaki' }),
    DEATH_DEFAULT: new Color({ html: 'indianred' }),
    MISS_DEFAULT: new Color({ html: 'darkviolet' }),
    HAS_VISITED_TILE: new Color({ hex: '#111' }),
    BACKGROUD_COLOR: new Color({ html: 'black' }),
    STANDARD_CORPSE: new Color({ hex: '#202020' })
};
exports.Colors = Colors;
const StatusColors = {
    HUNGER: new Color({ html: 'lightgreen' }),
    THIRST: new Color({ html: 'lightblue' })
};
exports.StatusColors = StatusColors;
//# sourceMappingURL=Color.js.map