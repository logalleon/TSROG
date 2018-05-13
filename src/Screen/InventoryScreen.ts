import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Message } from '../Message/Message';
import { Colors } from '../Canvas/Color';

class InventoryScreen extends Screen {

  public name: ScreenNames = ScreenNames.INVENTORY;
  public game: Game;
  public inputs: InputMap;

  constructor() {
    super();
  }

  render(ctx: CanvasRenderingContext2D) {
    const { canvasProps, messenger } = this.game;
    clearCanvas(ctx, canvasProps);
    this.renderPlayerInventory();
    messenger.renderSpaceToContinue();
  }

  renderPlayerInventory () {
    const { player } = this.game;
    let keyCode = 65;
    let i = 0;
    this.game.messenger.clearMessages();
    for (let key in InventoryItems) {
      this.game.messenger.logMessages(
        player[InventoryItems[key]].map((item: Prop): Message => {
          i++;
          keyCode++;
          return {
            text: `${String.fromCharCode(keyCode)}) ${item.name}`,
            color: Colors.WHITE
          };
        })
      );
    }
  }

}
export default InventoryScreen;