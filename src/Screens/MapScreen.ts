import { Screen } from '../Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas } from '../Canvas';

class MapScreen implements Screen {

  public game: Game;
  public inputs: InputMap = {
    'I': {
      handler: () => {
        
      }
    }
  }

  constructor() {

  }

  setGame(game: Game) {
    this.game = game;
  }

  handleInput (keyValue: string) {
    if (this.inputs[keyValue]) {
      this.inputs[keyValue].handler();
    }
  };

  render(ctx: CanvasRenderingContext2D) {
    clearCanvas(ctx, this.game.canvasProps);
    ctx.fillStyle = '#ffffff';
    const text = 'This is the main map screen.';
    ctx.fillText(text, 10, 10);
  }

}
export default MapScreen;