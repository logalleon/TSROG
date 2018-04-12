const keyCodeToChar = {
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
const keyCharToCode = {
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

const characterMapShift = [];
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

const characterMap = [];
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
const mapKeyPressToActualCharacter = (isShiftKey: boolean, characterCode: number) => {
  if (isShiftKey) {
    return characterMapShift[characterCode];
  } else {
    return characterMap[characterCode];
  }
}

interface InputMap {
  [keyValue: string]: Handler
}

interface Handler {
  (stringValue?: string): void;
}

export { mapKeyPressToActualCharacter, InputMap, keyCharToCode, keyCodeToChar };
