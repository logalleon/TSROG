import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap, keyCodeToChar } from '../Input';
import { fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Colors } from '../Canvas/Color';
import { Message } from '../Message/Message';
import { startCase } from 'lodash';

class InventoryItemScreen extends Screen {

  public name: ScreenNames;
  public item: InventoryItems;
  public game: Game;
  public inputs: InputMap;

  constructor(name: ScreenNames, item: InventoryItems) {
    super();
    this.name = name;
    this.item = item;
  }

  render() {
    const { messenger } = this.game;
    this.renderInventoryItems();
    messenger.renderReturnToMap();
  }

  renderTitle (): Message[] {
    const message: Message = {
      text: `${startCase(this.item)}`
    };
    return [message];
  }

  renderInventoryItems () {
    const { player } = this.game;
    // Start with A
    let keyCode = 65;
    let i = 0;
    this.game.messenger.clearMessages();
    this.game.messenger.logMessages(this.renderTitle());
    this.game.messenger.logMessages(
      player[this.item].map((item: Prop): Message => {
        const message: Message = {
          text: `${String.fromCharCode(keyCode)}) ${item.name}`,
        };
        i++;
        keyCode++;
        return message;
      })
    );
  }

}
export default InventoryItemScreen;