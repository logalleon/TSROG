import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap, keyCodeToChar } from '../Input';
import { fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { Colors } from '../Canvas/Color';
import { Message } from '../Message/Message';

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

  render(ctx: CanvasRenderingContext2D) {
    const { canvasProps, messenger } = this.game;
    this.renderTitle(ctx);
    this.renderInventoryItems();
    messenger.renderSpaceToContinue();
  }

  renderTitle(ctx: CanvasRenderingContext2D) {
    const title = `${this.item[0].toUpperCase()}${this.item.slice(1)}`;
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(title, this.game.canvasProps.width / 2, padding);
  }

  renderInventoryItems () {
    const { player } = this.game;
    let keyCode = 65;
    let i = 0;
    this.game.messenger.clearMessages();
    this.game.messenger.logMessages(
      player[this.item].map((item: Prop): Message => {
        i++;
        keyCode++;
        return {
          text: `${String.fromCharCode(keyCode)}) ${item.name}`,
          color: Colors.DEFAULT
        };
      })
    );
  }

}
export default InventoryItemScreen;