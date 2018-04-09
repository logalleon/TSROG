import { Screen } from '../Screen';
import Game from '../Game';
import { InputMap } from '../Input';

class InventoryScreen implements Screen {

  public game: Game;
  public inputs: InputMap = {
    'A': {
      handler: () => {
      console.log('Handled A');
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
    
  }

}
export default InventoryScreen;