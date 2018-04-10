(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var fontSize = 14;
var fontColor = '#ffffff';
var defaultFontAlignment = 'left';
var padding = 20;
var fontOptions = {
    fontSize: fontSize,
    fontColor: fontColor,
    defaultFontAlignment: defaultFontAlignment
};
exports.fontOptions = fontOptions;
var clearCanvas = function (ctx, canvasProps) {
    ctx.fillStyle = '#000000';
    ctx.rect(0, 0, canvasProps.width, canvasProps.height);
    ctx.fill();
};
exports.clearCanvas = clearCanvas;
var renderSpaceToContinue = function (ctx, canvasProps) {
    var message = 'Press [SPACE] to continue';
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(message, canvasProps.width / 2, canvasProps.height - padding);
    ctx.textAlign = fontOptions.defaultFontAlignment;
};
exports.renderSpaceToContinue = renderSpaceToContinue;
var setupCanvas = function (canvas, height, width) {
    canvas.style.height = height + "px";
    canvas.style.width = width + "px";
    // High DPI canvases
    var devicePixelRatio = window.devicePixelRatio;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    var ctx = canvas.getContext('2d');
    ctx.scale(devicePixelRatio, devicePixelRatio);
    // Set the global font style
    ctx.font = '16px Fira Mono';
    return ctx;
};
exports.setupCanvas = setupCanvas;

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Dice_1 = require("../../Random/Dice");
var Actor = /** @class */ (function () {
    function Actor(options) {
        this.canMove = true;
        this.canAttack = true;
        for (var key in options) {
            this[key] = options[key];
        }
    }
    Actor.prototype.move = function (destination) {
        if (this.canMove) {
            this.pos = destination;
        }
    };
    Actor.prototype.attemptAttack = function (target) {
        var dice = Dice_1.StandardDice.d20 + "+" + this.cth;
        return (Dice_1.rollDice(dice) >= target.ac);
    };
    Actor.prototype.attack = function (target) {
        var damage = Dice_1.rollDice(this.damage);
        target.hp -= damage;
        return damage;
    };
    Actor.prototype.isDead = function () {
        return this.hp <= 0;
    };
    return Actor;
}());
exports.Actor = Actor;

},{"../../Random/Dice":7}],3:[function(require,module,exports){
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
var Actor_1 = require("./Actor");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player;
}(Actor_1.Actor));
exports["default"] = Player;

},{"./Actor":2}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Input_1 = require("./Input");
var Game = /** @class */ (function () {
    function Game(gameMap, screens, canvasProps, ctx, player) {
        this.player = player;
        this.gameMap = gameMap;
        this.screens = screens;
        this.activeScreen = screens[0];
        this.canvasProps = canvasProps;
        this.keyMap = {};
        this.ctx = ctx;
        window.onkeydown = this.handleInput.bind(this);
        window.onkeyup = this.handleInput.bind(this);
    }
    Game.prototype.handleInput = function (e) {
        e.preventDefault();
        var keyCode = e.keyCode, type = e.type;
        this.keyMap[keyCode] = type === 'keydown';
        if (type === 'keydown') {
            var char = Input_1.mapKeyPressToActualCharacter(Boolean(this.keyMap[Input_1.keyCharToCode['Shift']]), keyCode);
            // Not an uppercase-able character returns and empty string
            char = char.trim();
            if (!char) {
                char = Input_1.keyCodeToChar[keyCode];
            }
            this.activeScreen.handleInput(char);
            this.activeScreen.render(this.ctx);
        }
    };
    Game.prototype.updatePlayerPos = function (player, nextPos) {
        var tiles = this.gameMap.tiles;
        var _a = player.pos, x = _a.x, y = _a.y;
        var nextX = nextPos.x, nextY = nextPos.y;
        var row = tiles[y];
        var item = row[x];
        item.occupier = null;
        item.isOccupied = false;
        row = tiles[nextY];
        item = row[nextX];
        item.occupier = player;
        item.isOccupied = true;
        player.pos = nextPos;
    };
    return Game;
}());
exports["default"] = Game;

},{"./Input":6}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var GameMap = /** @class */ (function () {
    function GameMap(options) {
        for (var key in options) {
            this[key] = options[key];
        }
        this.height = this.tiles.length;
        this.width = this.tiles[0].length;
    }
    GameMap.prototype.inBounds = function (width, height, v) {
        return v.x >= 0 &&
            v.y >= 0 &&
            v.x < width &&
            v.y < height;
    };
    return GameMap;
}());
exports.GameMap = GameMap;

},{}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var keyCodeToChar = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause/Break',
    20: 'Caps Lock',
    27: 'Esc',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    45: 'Insert',
    46: 'Delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    91: 'Windows',
    93: 'Right Click',
    96: 'Numpad 0',
    97: 'Numpad 1',
    98: 'Numpad 2',
    99: 'Numpad 3',
    100: 'Numpad 4',
    101: 'Numpad 5',
    102: 'Numpad 6',
    103: 'Numpad 7',
    104: 'Numpad 8',
    105: 'Numpad 9',
    106: 'Numpad *',
    107: 'Numpad +',
    109: 'Numpad -',
    110: 'Numpad .',
    111: 'Numpad /',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'Num Lock',
    145: 'Scroll Lock',
    182: 'My Computer',
    183: 'My Calculator',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '"'
};
exports.keyCodeToChar = keyCodeToChar;
var keyCharToCode = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    'Pause/Break': 19,
    'Caps Lock': 20,
    Esc: 27,
    Space: 32,
    'Page Up': 33,
    'Page Down': 34,
    End: 35,
    Home: 36,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Insert: 45,
    Delete: 46,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    Windows: 91,
    'Right Click': 93,
    'Numpad 0': 96,
    'Numpad 1': 97,
    'Numpad 2': 98,
    'Numpad 3': 99,
    'Numpad 4': 100,
    'Numpad 5': 101,
    'Numpad 6': 102,
    'Numpad 7': 103,
    'Numpad 8': 104,
    'Numpad 9': 105,
    'Numpad *': 106,
    'Numpad +': 107,
    'Numpad -': 109,
    'Numpad .': 110,
    'Numpad /': 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    'Num Lock': 144,
    'Scroll Lock': 145,
    'My Computer': 182,
    'My Calculator': 183,
    ';': 186,
    '=': 187,
    ',': 188,
    '-': 189,
    '.': 190,
    '/': 191,
    '`': 192,
    '[': 219,
    '\\': 220,
    ']': 221,
    '"': 222
};
exports.keyCharToCode = keyCharToCode;
var characterMapShift = [];
characterMapShift[8] = '';
characterMapShift[9] = '';
characterMapShift[13] = '\n';
characterMapShift[16] = '';
characterMapShift[17] = '';
characterMapShift[18] = '';
characterMapShift[19] = '';
characterMapShift[20] = '';
characterMapShift[27] = '';
characterMapShift[32] = ' ';
characterMapShift[33] = '';
characterMapShift[34] = '';
characterMapShift[35] = '';
characterMapShift[36] = '';
characterMapShift[37] = '';
characterMapShift[38] = '';
characterMapShift[39] = '';
characterMapShift[40] = '';
characterMapShift[45] = '';
characterMapShift[46] = '';
characterMapShift[48] = ')';
characterMapShift[49] = '!';
characterMapShift[50] = '@';
characterMapShift[51] = '#';
characterMapShift[52] = '$';
characterMapShift[53] = '%';
characterMapShift[54] = '^';
characterMapShift[55] = '&';
characterMapShift[56] = '*';
characterMapShift[57] = '(';
characterMapShift[59] = ':';
characterMapShift[61] = '+';
characterMapShift[65] = 'A';
characterMapShift[66] = 'B';
characterMapShift[67] = 'C';
characterMapShift[68] = 'D';
characterMapShift[69] = 'E';
characterMapShift[70] = 'F';
characterMapShift[71] = 'G';
characterMapShift[72] = 'H';
characterMapShift[73] = 'I';
characterMapShift[74] = 'J';
characterMapShift[75] = 'K';
characterMapShift[76] = 'L';
characterMapShift[77] = 'M';
characterMapShift[78] = 'N';
characterMapShift[79] = 'O';
characterMapShift[80] = 'P';
characterMapShift[81] = 'Q';
characterMapShift[82] = 'R';
characterMapShift[83] = 'S';
characterMapShift[84] = 'T';
characterMapShift[85] = 'U';
characterMapShift[86] = 'V';
characterMapShift[87] = 'W';
characterMapShift[88] = 'X';
characterMapShift[89] = 'Y';
characterMapShift[90] = 'Z';
characterMapShift[91] = '';
characterMapShift[92] = '';
characterMapShift[93] = '';
characterMapShift[96] = '0';
characterMapShift[97] = '1';
characterMapShift[98] = '2';
characterMapShift[99] = '3';
characterMapShift[100] = '4';
characterMapShift[101] = '5';
characterMapShift[102] = '6';
characterMapShift[103] = '7';
characterMapShift[104] = '8';
characterMapShift[105] = '9';
characterMapShift[106] = '*';
characterMapShift[107] = '+';
characterMapShift[109] = '_';
characterMapShift[107] = '+';
characterMapShift[111] = '/';
characterMapShift[112] = '';
characterMapShift[113] = '';
characterMapShift[114] = '';
characterMapShift[115] = '';
characterMapShift[116] = '';
characterMapShift[117] = '';
characterMapShift[118] = '';
characterMapShift[119] = '';
characterMapShift[120] = '';
characterMapShift[121] = '';
characterMapShift[122] = '';
characterMapShift[123] = '';
characterMapShift[144] = '';
characterMapShift[145] = '';
characterMapShift[186] = ':';
characterMapShift[187] = '+';
characterMapShift[188] = '<';
characterMapShift[189] = '_';
characterMapShift[190] = '>';
characterMapShift[191] = '?';
characterMapShift[192] = '~';
characterMapShift[219] = '{';
characterMapShift[220] = '|';
characterMapShift[221] = '}';
characterMapShift[222] = '\"';
var characterMap = [];
characterMap[8] = '';
characterMap[9] = '';
characterMap[13] = '\n';
characterMap[16] = '';
characterMap[17] = '';
characterMap[18] = '';
characterMap[19] = '';
characterMap[20] = '';
characterMap[27] = '';
characterMap[32] = ' ';
characterMap[33] = '';
characterMap[34] = '';
characterMap[35] = '';
characterMap[36] = '';
characterMap[37] = '';
characterMap[38] = '';
characterMap[39] = '';
characterMap[40] = '';
characterMap[45] = '';
characterMap[46] = '';
characterMap[48] = '0';
characterMap[49] = '1';
characterMap[50] = '2';
characterMap[51] = '3';
characterMap[52] = '4';
characterMap[53] = '5';
characterMap[54] = '6';
characterMap[55] = '7';
characterMap[56] = '8';
characterMap[57] = '9';
characterMap[59] = ';';
characterMap[61] = '=';
characterMap[65] = 'a';
characterMap[66] = 'b';
characterMap[67] = 'c';
characterMap[68] = 'd';
characterMap[69] = 'e';
characterMap[70] = 'f';
characterMap[71] = 'g';
characterMap[72] = 'h';
characterMap[73] = 'i';
characterMap[74] = 'j';
characterMap[75] = 'k';
characterMap[76] = 'l';
characterMap[77] = 'm';
characterMap[78] = 'n';
characterMap[79] = 'o';
characterMap[80] = 'p';
characterMap[81] = 'q';
characterMap[82] = 'r';
characterMap[83] = 's';
characterMap[84] = 't';
characterMap[85] = 'u';
characterMap[86] = 'v';
characterMap[87] = 'w';
characterMap[88] = 'x';
characterMap[89] = 'y';
characterMap[90] = 'z';
characterMap[91] = '';
characterMap[92] = '';
characterMap[93] = '';
characterMap[96] = '0';
characterMap[97] = '1';
characterMap[98] = '2';
characterMap[99] = '3';
characterMap[100] = '4';
characterMap[101] = '5';
characterMap[102] = '6';
characterMap[103] = '7';
characterMap[104] = '8';
characterMap[105] = '9';
characterMap[106] = '*';
characterMap[107] = '+';
characterMap[109] = '_';
characterMap[107] = '+';
characterMap[111] = '/';
characterMap[112] = '';
characterMap[113] = '';
characterMap[114] = '';
characterMap[115] = '';
characterMap[116] = '';
characterMap[117] = '';
characterMap[118] = '';
characterMap[119] = '';
characterMap[120] = '';
characterMap[121] = '';
characterMap[122] = '';
characterMap[123] = '';
characterMap[144] = '';
characterMap[145] = '';
characterMap[186] = ';';
characterMap[187] = '=';
characterMap[188] = ',';
characterMap[189] = '-';
characterMap[190] = '.';
characterMap[191] = '/';
characterMap[192] = '`';
characterMap[219] = '[';
characterMap[220] = '\\';
characterMap[221] = ']';
characterMap[222] = '\'';
// https://stackoverflow.com/questions/3337188/get-key-char-value-from-keycode-with-shift-modifier
var mapKeyPressToActualCharacter = function (isShiftKey, characterCode) {
    if (isShiftKey) {
        return characterMapShift[characterCode];
    }
    else {
        return characterMap[characterCode];
    }
};
exports.mapKeyPressToActualCharacter = mapKeyPressToActualCharacter;

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var StandardDice;
(function (StandardDice) {
    StandardDice["d2"] = "d2";
    StandardDice["d4"] = "d4";
    StandardDice["d6"] = "d6";
    StandardDice["d8"] = "d8";
    StandardDice["d10"] = "d10";
    StandardDice["d12"] = "d12";
    StandardDice["d20"] = "d20";
})(StandardDice || (StandardDice = {}));
exports.StandardDice = StandardDice;
var rollDice = function (dice) {
    return 1;
};
exports.rollDice = rollDice;

},{}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas/Canvas");
var InventoryScreen = /** @class */ (function () {
    function InventoryScreen() {
        var _this = this;
        this.name = 'inventoryScreen';
        this.inputs = {
            'A': {
                handler: function () {
                    console.log('Handled A');
                }
            },
            'Space': {
                handler: function () {
                    var mapScreen = _this.game.screens.filter(function (screen) { return screen.name === 'mapScreen'; })[0];
                    _this.game.activeScreen = mapScreen;
                }
            }
        };
    }
    InventoryScreen.prototype.setGame = function (game) {
        this.game = game;
    };
    InventoryScreen.prototype.handleInput = function (keyValue) {
        console.log(keyValue);
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler();
        }
    };
    ;
    InventoryScreen.prototype.render = function (ctx) {
        var canvasProps = this.game.canvasProps;
        Canvas_1.clearCanvas(ctx, canvasProps);
        ctx.textAlign = Canvas_1.fontOptions.defaultFontAlignment;
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        var text = 'This is the inventory screen.';
        ctx.fillText(text, 10, 30);
        Canvas_1.renderSpaceToContinue(ctx, canvasProps);
    };
    return InventoryScreen;
}());
exports["default"] = InventoryScreen;

},{"../Canvas/Canvas":1}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Canvas_1 = require("../Canvas/Canvas");
var Vector_1 = require("../Vector");
var MapScreen = /** @class */ (function () {
    function MapScreen() {
        var _this = this;
        this.textSpacing = new Vector_1["default"](.9, 1.5);
        this.name = 'mapScreen';
        this.inputs = {
            'I': {
                handler: function () {
                    var inventoryScreen = _this.game.screens[1];
                    _this.game.activeScreen = inventoryScreen;
                }
            },
            'w': { handler: this.attemptMovement.bind(this) },
            'a': { handler: this.attemptMovement.bind(this) },
            's': { handler: this.attemptMovement.bind(this) },
            'd': { handler: this.attemptMovement.bind(this) },
            'q': { handler: this.attemptMovement.bind(this) },
            'e': { handler: this.attemptMovement.bind(this) },
            'z': { handler: this.attemptMovement.bind(this) },
            'c': { handler: this.attemptMovement.bind(this) }
        };
    }
    MapScreen.prototype.setGame = function (game) {
        this.game = game;
    };
    MapScreen.prototype.handleInput = function (keyValue) {
        if (this.inputs[keyValue]) {
            this.inputs[keyValue].handler(keyValue);
        }
    };
    ;
    MapScreen.prototype.render = function (ctx) {
        var _a = this.game, gameMap = _a.gameMap, canvasProps = _a.canvasProps;
        var tiles = gameMap.tiles;
        Canvas_1.clearCanvas(ctx, canvasProps);
        ctx.fillStyle = Canvas_1.fontOptions.fontColor;
        ctx.textAlign = Canvas_1.fontOptions.defaultFontAlignment;
        var text = 'This is the main map screen.';
        ctx.fillText(text, 10, 30);
        this.renderTiles(tiles, ctx, canvasProps);
    };
    MapScreen.prototype.renderTiles = function (tiles, ctx, canvasProps) {
        var fontColor = Canvas_1.fontOptions.fontColor, fontSize = Canvas_1.fontOptions.fontSize;
        var width = canvasProps.width;
        var offset = this.calculateOffset(canvasProps, this.game.gameMap, fontSize);
        for (var row = 0; row < tiles.length; row++) {
            for (var col = 0; col < tiles[row].length; col++) {
                var tile = tiles[row][col];
                var _a = tile.isOccupied ?
                    tile.occupier : tile, char = _a.char, color = _a.color;
                ctx.fillStyle = color.hex || color.rgb;
                ctx.fillText(char, (col * fontSize * this.textSpacing.x) + offset.x, (row * fontSize * this.textSpacing.y) + offset.y);
            }
        }
    };
    MapScreen.prototype.calculateOffset = function (canvasProps, gameMap, fontSize) {
        return new Vector_1["default"]((canvasProps.width / 2) - (gameMap.width / 2 * fontSize), (canvasProps.height / 2) - (gameMap.height / 2 * fontSize));
    };
    MapScreen.prototype.attemptMovement = function (keyValue) {
        var _a = this.game, player = _a.player, gameMap = _a.gameMap;
        var pos = player.pos;
        var tiles = gameMap.tiles;
        var nextPos;
        switch (keyValue) {
            case 'w':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](0, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'a':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, 0));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 's':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](0, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'd':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, 0));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'q':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'e':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, -1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'z':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](-1, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
            case 'c':
                nextPos = Vector_1["default"].apply(pos, new Vector_1["default"](1, 1));
                if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
                    this.game.updatePlayerPos(player, nextPos);
                }
                break;
        }
    };
    return MapScreen;
}());
exports["default"] = MapScreen;

},{"../Canvas/Canvas":1,"../Vector":10}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
    };
    Vector2.apply = function (v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    };
    return Vector2;
}());
exports["default"] = Vector2;

},{}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Game_1 = require("./Game");
var GameMap_1 = require("./GameMap");
var Canvas_1 = require("./Canvas/Canvas");
var Player_1 = require("./Entity/Actor/Player");
var MapScreen_1 = require("./Screens/MapScreen");
var InventoryScreen_1 = require("./Screens/InventoryScreen");
var Vector_1 = require("./Vector");
var Canvas_2 = require("./Canvas/Canvas");
var height = 240;
var width = 600;
window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = Canvas_1.setupCanvas(canvas, height, width);
    var canvasProps = {
        height: height,
        width: width
    };
    var F = function () { return ({
        isPassable: true,
        isOccupied: false,
        description: 'Hard stone floor',
        posX: 0,
        posY: 0,
        char: '.',
        color: { hex: Canvas_2.fontOptions.fontColor }
    }); };
    var W = function () { return ({
        isPassable: false,
        isOccupied: false,
        description: 'A wall',
        posX: 0,
        posY: 0,
        char: '\u2592',
        color: { hex: '#CCB69B' }
    }); };
    var gameMap = new GameMap_1.GameMap({
        tiles: [
            [W(), W(), W(), W(), W(), W(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), F(), F(), F(), F(), F(), W()],
            [W(), W(), W(), W(), W(), W(), W()],
        ]
    });
    var screens = [
        new MapScreen_1["default"](),
        new InventoryScreen_1["default"]()
    ];
    // Adds a player
    var options = {
        pos: new Vector_1["default"](1, 1),
        char: '@',
        isActive: true,
        color: { hex: '#ff3354' },
        hp: 17,
        ac: 10,
        damage: '1d4',
        cth: 0
    };
    var player = new Player_1["default"](options);
    var g = new Game_1["default"](gameMap, screens, canvasProps, ctx, player);
    // Bind the current game to all screens
    g.screens.forEach(function (screen) { return screen.setGame(g); });
    g.updatePlayerPos(player, player.pos);
    g.activeScreen.render(g.ctx);
};

},{"./Canvas/Canvas":1,"./Entity/Actor/Player":3,"./Game":4,"./GameMap":5,"./Screens/InventoryScreen":8,"./Screens/MapScreen":9,"./Vector":10}]},{},[11]);
