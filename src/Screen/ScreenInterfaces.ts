import Game from "../Game";
import { InputMap } from "../Input";
import { Message } from "../Message/Messenger";
import { Screen } from "./Screen";

enum ScreenNames {
  MAP = 'MAP',
  INVENTORY = 'INVENTORY',
  MESSAGES = 'MESSAGES',
  HELP = 'HELP',
  COMMANDS = 'COMMANDS',
  ARMOR = 'ARMOR',
  AMULET = 'AMULET',
  POTIONS = 'POTIONS',
  FOOD = 'FOOD',
  KEYS = 'KEYS',
  RING = 'RING',
  SCROLL = 'SCROLL',
  WEAPON = 'WEAPON',
  EQUIPMENT = 'EQUIPMENT',
  INSPECT = 'INSPECT',
  SKILLS = 'SKILLS'
}

interface IScreen {
  name: ScreenNames,
  inputs: InputMap,
  handleInput(keyValue: string): Message[],
  render(messages: Message[]): void,
  returnToMapScreen(): void
}

type S = keyof typeof ScreenNames;
type ScreenNameMap = {
  [Key in S]: Screen
}

interface Swappable {
  storeAndSwapInputMap(nextInputs: InputMap): void
}

export { IScreen, ScreenNameMap, ScreenNames, Swappable }