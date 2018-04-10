import { Screen } from '../Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, renderSpaceToContinue, fontOptions } from '../Canvas/Canvas'

class InventoryScreen implements Screen {

  public name: string = 'inventoryScreen';
  public game: Game;
  public inputs: InputMap = {
    'A': {
      handler: () => {
      console.log('Handled A');
      }
    },
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
    ctx.textAlign = fontOptions.defaultFontAlignment;
    ctx.fillStyle = fontOptions.fontColor;
    const text = 'This is the inventory screen.';
    ctx.fillText(text, 10, 30);
    renderSpaceToContinue(ctx, canvasProps);
  }

}
export default InventoryScreen;