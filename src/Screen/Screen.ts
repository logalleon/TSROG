import { InputMap } from '../Input';
import Game from '../Game';
import { ActionResponse, Status, invalidInput, Message } from '../Message/Message';

enum ScreenNames {
  MAP = 'map',
  INVENTORY = 'inventory',
  MESSAGES = 'messages',
  HELP = 'help',
  COMMANDS = 'commands',
  ARMOR = 'armor',
  AMULET = 'amulet',
  POTIONS = 'potions',
  FOOD = 'food',
  KEYS = 'keyItems',
  RING = 'ring',
  SCROLL = 'scroll',
  WEAPON = 'weapon',
  UNEQUIP = 'unequip'
}

interface IScreen {
  name: ScreenNames,
  game: Game,
  inputs: InputMap,
  setGame(game: Game): void,
  handleInput(keyValue: string): Message[],
  render(ctx: CanvasRenderingContext2D): void,
  returnToMapScreen(): void
}

class Screen implements IScreen {

  public name: ScreenNames;
  public game: Game;
  public inputs: InputMap;

  public spaceReturnToMap: any = {
    'Space': this.returnToMapScreen
  }

  constructor () {
    this.inputs = (<any>Object).assign({}, this.inputs, this.spaceReturnToMap);
  }

  setGame (game: Game): void {
    this.game = game;
  }

  handleInput (keyValue: string): Message[] {
    if (this.inputs[keyValue]) {
      return this.inputs[keyValue].call(this, keyValue);
    } else {
      return [invalidInput(keyValue)];
    }
  }

  returnToMapScreen (): void {
    const { game } = this;
    const [mapScreen] = game.screens.filter(screen => screen.name === ScreenNames.MAP);
    game.activeScreen = mapScreen;
  }

  render (): void {
    return null;
  }

}

export { Screen, ScreenNames };