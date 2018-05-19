import { startCase } from 'lodash';
import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, padding } from '../Canvas/Canvas';
import { Colors } from '../Canvas/Color';
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
    this.renderMovement();
    messenger.renderSpaceToContinue();
  }

  renderTitle(ctx: CanvasRenderingContext2D) {
    const title = `${this.name[0].toUpperCase()}${this.name.slice(1)}`;
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = 'center';
    ctx.fillText(title, this.game.canvasProps.width / 2, padding);
  }

  renderMovement (): void {
    const { messenger } = this.game;
    const text = `
      ${startCase(this.name)}<br/>
      ${MapScreenInputs.MOVE_UP_LEFT} ${MapScreenInputs.MOVE_UP} ${MapScreenInputs.MOVE_UP_RIGHT}<br/>
      &nbsp;\\|/<br/>
      ${MapScreenInputs.MOVE_LEFT}- -${MapScreenInputs.MOVE_RIGHT}<br/>
      &nbsp;/|\\<br/>
      ${MapScreenInputs.MOVE_DOWN_LEFT} ${MapScreenInputs.MOVE_DOWN} ${MapScreenInputs.MOVE_DOWN_RIGHT}<br/>
    `;
    messenger.logMessages([{
      color: Colors.DEFAULT,
      text,
    }]);
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