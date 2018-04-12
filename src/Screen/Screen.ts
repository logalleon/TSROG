import { InputMap } from '../Input';
import Game from '../Game';
import { ActionResponse, Status, invalidInput } from '../Message';

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
  handleInput(keyValue: string): ActionResponse,
  render(ctx: CanvasRenderingContext2D): void,
  returnToMapScreen(): ActionResponse
}

class Screen implements IScreen {

  public name: ScreenNames;
  public game: Game;
  public inputs: InputMap;

  public spaceReturnToMap: any = {
    'Space': this.returnToMapScreen
  }

  constructor () {
    this.inputs = Object.assign({}, this.inputs, this.spaceReturnToMap);
  }

  setGame (game: Game): void {
    this.game = game;
  }

  handleInput (keyValue: string): ActionResponse {
    if (this.inputs[keyValue]) {
      this.inputs[keyValue].call(this, keyValue);
      return { status: Status.SUCCESS };
    } else {
      return { status: Status.FAILURE, message: invalidInput(keyValue) };
    }
  }

  returnToMapScreen (): ActionResponse {
    const { game } = this;
    const [mapScreen] = game.screens.filter(screen => screen.name === ScreenNames.MAP);
    game.activeScreen = mapScreen;
    return { status: Status.SUCCESS };
  }

  render (ctx: CanvasRenderingContext2D): void {
    return null;
  }

}

export { Screen, ScreenNames };