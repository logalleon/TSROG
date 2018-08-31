import { InputMap } from '../Input';
import Game from '../Game';
import { invalidInput, Message, Panel } from '../Message/Messenger';
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
  UNEQUIP = 'unequip',
  INSPECT = 'inspect'
}

interface IScreen {
  name: ScreenNames,
  game: Game,
  inputs: InputMap,
  setGame(game: Game): void,
  handleInput(keyValue: string): Message[],
  render(messages: Message[]): void,
  returnToMapScreen(): void
}

class Screen implements IScreen {

  public identifier: Panel;
  public name: ScreenNames;
  public game: Game;
  public inputs: InputMap;

  public returnToMap: any = {
    'Space': this.returnToMapScreen,
    'Esc': this.returnToMapScreen
  }

  constructor (inputs: InputMap) {
    this.inputs = (<any>Object).assign({}, inputs, this.inputs, this.returnToMap);
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

  // Automatically break out of all screens
  returnToMapScreen (): void {
    const { game } = this;
    const [mapScreen] = game.screens.filter(screen => screen.name === ScreenNames.MAP);
    game.activeScreen = mapScreen;
  }

  render (messages: Message[]): void {
    this.game.messenger.clearPanel(this.identifier);
    this.game.messenger.writeToPanel(this.identifier, messages);
  }

}

export { Screen, ScreenNames, ItemReference };