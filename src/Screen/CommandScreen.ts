import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, padding } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';
import { MapScreenInputs } from './MapScreen';

class CommandScreen extends Screen {

  public name: ScreenNames = ScreenNames.COMMANDS;
  public game: Game;
  public inputs: InputMap;

  constructor() {
    super();
  }

  render(ctx: CanvasRenderingContext2D) {
    const { canvasProps, messenger } = this.game;
    clearCanvas(ctx, canvasProps);
    this.renderTitle(ctx);
    this.renderMovement(ctx);
    messenger.renderSpaceToContinue();
  }

  renderTitle(ctx: CanvasRenderingContext2D) {
    const title = `${this.name[0].toUpperCase()}${this.name.slice(1)}`;
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(title, this.game.canvasProps.width / 2, padding);
  }

  renderMovement (ctx: CanvasRenderingContext2D) {
    ctx.textAlign = 'center';
    let text = `${MapScreenInputs.MOVE_UP_LEFT} ${MapScreenInputs.MOVE_UP} ${MapScreenInputs.MOVE_UP_RIGHT}`;
    ctx.fillText(text, padding * 2.5, padding);
    text = `\\|/\n`;
    ctx.fillText(text, padding * 2.5, padding + fontOptions.fontSize * 1.5);
    text = `${MapScreenInputs.MOVE_LEFT}- -${MapScreenInputs.MOVE_RIGHT}`;
    ctx.fillText(text, padding * 2.5, padding + fontOptions.fontSize * 2.5);
    text = `/|\\`;
    ctx.fillText(text, padding * 2.5, padding + fontOptions.fontSize * 3.5);
    text = `${MapScreenInputs.MOVE_DOWN_LEFT} ${MapScreenInputs.MOVE_DOWN} ${MapScreenInputs.MOVE_DOWN_RIGHT}`;
    ctx.fillText(text, padding * 2.5, padding + fontOptions.fontSize * 4.5);
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
export default CommandScreen;