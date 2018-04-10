import { Screen } from '../Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, CanvasProps } from '../Canvas';
import { Tile } from '../GameMap';
import Vector2 from '../Vector';

class MapScreen implements Screen {

  public name: string = 'mapScreen';
  public game: Game;
  public inputs: InputMap = {
    'I': {
      handler: () => {
        const inventoryScreen = this.game.screens[1];
        this.game.activeScreen = inventoryScreen;
      }
    },
    'w': { handler: this.attemptMovement.bind(this) },
    'a': { handler: this.attemptMovement.bind(this) },
    's': { handler: this.attemptMovement.bind(this) },
    'd': { handler: this.attemptMovement.bind(this) },
    'q': { handler: this.attemptMovement.bind(this) },
    'e': { handler: this.attemptMovement.bind(this) },
    'z': { handler: this.attemptMovement.bind(this) },
    'c': { handler: this.attemptMovement.bind(this) }
  }

  constructor() {
  }

  setGame(game: Game) {
    this.game = game;
  }

  handleInput (keyValue: string) {
    if (this.inputs[keyValue]) {
      this.inputs[keyValue].handler(keyValue);
    }
  };

  render(ctx: CanvasRenderingContext2D) {
    const { gameMap, canvasProps } = this.game;
    const { tiles } = gameMap;
    clearCanvas(ctx, canvasProps);
    ctx.fillStyle = fontOptions.fontColor;
    ctx.textAlign = fontOptions.defaultFontAlignment;
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

  attemptMovement(keyValue: string) {
    const { player, gameMap } = this.game;
    const { pos } = player;
    const { tiles } = gameMap;
    let nextPos;
    switch (keyValue) {
      case 'w':
        nextPos = Vector2.apply(pos, new Vector2(0, -1));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 'a':
        nextPos = Vector2.apply(pos, new Vector2(-1, 0));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 's':
        nextPos = Vector2.apply(pos, new Vector2(0, 1));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 'd':
        nextPos = Vector2.apply(pos, new Vector2(1, 0));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 'q':
        nextPos = Vector2.apply(pos, new Vector2(-1, -1));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 'e':
        nextPos = Vector2.apply(pos, new Vector2(1, -1));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 'z':
        nextPos = Vector2.apply(pos, new Vector2(-1, 1));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
      case 'c':
        nextPos = Vector2.apply(pos, new Vector2(1, 1));
        if (gameMap.inBounds(gameMap.width, gameMap.height, nextPos) && tiles[nextPos.y][nextPos.x].isPassable) {
          this.game.updatePlayerPos(player, nextPos);
        }
        break;
    }
  }

}
export default MapScreen;