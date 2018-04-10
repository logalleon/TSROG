import { Screen } from '../Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, renderSpaceToContinue, fontOptions } from '../Canvas/Canvas'
import { Player, InventoryItems } from '../Entity/Actor/Player';
import { Prop } from '../Entity/Prop/Prop';

class InventoryScreen implements Screen {

  public name: string = 'inventoryScreen';
  public game: Game;
  public inputs: InputMap = {
    'Space': {
      handler: () => {
        const [mapScreen] = this.game.screens.filter(screen => screen.name === 'mapScreen');
        this.game.activeScreen = mapScreen;
      }
    }
  }

  constructor() {

  }

  setGame(game: Game) {
    this.game = game;
  }

  handleInput (keyValue: string) {
    console.log(keyValue);
    if (this.inputs[keyValue]) {
      this.inputs[keyValue].handler();
    }
  };

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