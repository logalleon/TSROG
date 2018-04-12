import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, renderSpaceToContinue, fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';

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
    const { canvasProps } = this.game;
    clearCanvas(ctx, canvasProps);
    this.renderTitle(ctx);
    this.renderInventoryItems(ctx);
    renderSpaceToContinue(ctx, canvasProps);
  }

  renderTitle(ctx: CanvasRenderingContext2D) {
    const title = `${this.item[0].toUpperCase()}${this.item.slice(1)}`;
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(title, this.game.canvasProps.width / 2, padding);
  }

  renderInventoryItems (ctx: CanvasRenderingContext2D) {
    const { player } = this.game;
    const padding = fontOptions.fontSize * 2;
    let keyCode = 65;
    let i = 0;
    ctx.textAlign = fontOptions.defaultFontAlignment;
    ctx.fillStyle = fontOptions.fontColor;
    console.log(player);
    console.log(this.item);
    player[this.item].forEach((item: Prop) => {
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
export default InventoryItemScreen;