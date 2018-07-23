import { InputMap } from '../Input';
import Game from '../Game';
import { invalidInput, Message } from '../Message/Message';
import { Prop } from '../Entity/Prop/Prop';
import { EquipmentSlots } from '../Entity/Actor/Player';

interface ItemReference {
  item: Prop|null,
  slot: EquipmentSlots
}

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
  render(): void,
  returnToMapScreen(): void
}

class Screen implements IScreen {

  public name: ScreenNames;
  public game: Game;
  public inputs: InputMap;

  public returnToMap: any = {
    'Space': this.returnToMapScreen,
    'Esc': this.returnToMapScreen
  }

  constructor () {
    this.inputs = (<any>Object).assign({}, this.inputs, this.returnToMap);
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

export { Screen, ScreenNames, ItemReference };