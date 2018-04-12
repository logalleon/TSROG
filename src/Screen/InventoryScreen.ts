import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, renderSpaceToContinue, fontOptions } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';

class InventoryScreen extends Screen {

  public name: ScreenNames = ScreenNames.INVENTORY;
  public game: Game;
  public inputs: InputMap;

  constructor() {
    super();
  }

  render(ctx: CanvasRenderingContext2D) {
    const { canvasProps } = this.game;
    clearCanvas(ctx, canvasProps);
    this.renderPlayerInventory(ctx);
    renderSpaceToContinue(ctx, canvasProps);
  }

  renderPlayerInventory (ctx: CanvasRenderingContext2D) {
    const { player } = this.game;
    const padding = fontOptions.fontSize * 2;
    let keyCode = 65;
    let i = 0;
    ctx.textAlign = fontOptions.defaultFontAlignment;
    ctx.fillStyle = fontOptions.fontColor;
    for (let key in InventoryItems) {
      player[InventoryItems[key]].forEach((item: Prop) => {
        ctx.fillText(
          `${String.fromCharCode(keyCode)}) ${item.name}`,
          padding,
          fontOptions.fontSize * i + padding
        );
        i++;
        keyCode++;
      });
    }
  }

}
export default InventoryScreen;