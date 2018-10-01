import { InputMap } from '../Input';
import Game from '../Game';
import { invalidInput, Message, Panel } from '../Message/Messenger';
import { Prop } from '../Entity/Prop/Prop';
import { EquipmentSlots } from '../Entity/Actor/Player';
import { IScreen, ScreenNames } from './ScreenInterfaces';

interface ItemReference {
  item: Prop|null,
  slot: EquipmentSlots
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

  handleInput (keyValue: string): Message[] {
    console.log(keyValue, 'kv');
    console.log(this.inputs);
    if (this.inputs[keyValue]) {
      return this.inputs[keyValue].call(this, keyValue);
    } else {
      return [invalidInput(keyValue)];
    }
  }

  // Automatically break out of all screens
  returnToMapScreen (): void {
    // Set modified panel widths
    const mapScreen = Game.instance.screenManager.screens[ScreenNames.MAP] as Screen;
    Game.instance.screenManager.activeScreen = mapScreen;
  }

  render (messages?: Message[]): void {
    this.game.messenger.clearPanel(this.identifier);
    if (messages) {
      this.game.messenger.writeToPanel(this.identifier, messages);
    }
  }

}

export { Screen, ScreenNames, ItemReference };