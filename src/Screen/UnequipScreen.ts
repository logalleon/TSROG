import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions } from '../Canvas/Canvas'
import { Player, InventoryItems, EquippedItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Message } from '../Message/Message';
import { Colors } from '../Canvas/Color';

class UnequipScreen extends Screen {

  public name: ScreenNames = ScreenNames.UNEQUIP;
  public game: Game;
  public inputs: InputMap;

  constructor() {
    super();
  }

  render() {
    const { messenger } = this.game;
    this.renderEquippedItems();
    messenger.renderReturnToMap();
  }

  renderEquippedItems () {
    const { player } = this.game;
    const { equipped } = player;
    let keyCode = 65;
    let i = 0;
    this.game.messenger.clearMessages();
    const title = [{ text: 'Unequip Items' }];
    this.game.messenger.logMessages(title);
    for (let slot in equipped) {
      const itemOrEmptySlot: Prop|null = equipped[slot];
      const message: Message = {
        text: `${String.fromCharCode(keyCode)}) ${
          itemOrEmptySlot ? itemOrEmptySlot.name
          : 'nothing equipped'
          }`,
        color: Colors.WHITE
      };
      i++;
      keyCode++;
      this.game.messenger.logMessages([message]);
    }
  }

}
export default UnequipScreen;