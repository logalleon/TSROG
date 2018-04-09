import { Screen } from '../Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, CanvasProps } from '../Canvas';
import { Tile } from '../GameMap';

class MapScreen implements Screen {

  public name: string = 'mapScreen';
  public game: Game;
  public inputs: InputMap = {
    'I': {
      handler: () => {
        const inventoryScreen = this.game.screens[1];
        console.log(inventoryScreen);
        console.log(this.game);
        this.game.activeScreen = inventoryScreen;
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
    const { gameMap, canvasProps } = this.game;
    const { tiles } = gameMap;
    clearCanvas(ctx, canvasProps);
    ctx.fillStyle = fontOptions.fontColor;
    const text = 'This is the main map screen.';
    ctx.fillText(text, 10, 30);
    this.renderTiles(tiles, ctx, canvasProps);
  }

  renderTiles (tiles: Tile[][], ctx: CanvasRenderingContext2D, canvasProps: CanvasProps) {
    const { fontColor, fontSize } = fontOptions;
    const { width } = canvasProps;
    const padding = fontSize * 3;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    for (let row = 0; row < tiles.length; row++) {
      let chars = [];
      for (let col = 0; col < tiles[row].length; col++) {
        const { char } = tiles[row][col].isOccupied ?
          tiles[row][col].o : tiles[row][col];
        chars.push(char);
      }
      ctx.fillText(chars.join(''), width / 2, (row * fontSize) + padding);
    }
  }

}
export default MapScreen;