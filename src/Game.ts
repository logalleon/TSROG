import { GameMap } from './GameMap';
import { Screen } from './Screen';
import { mapKeyPressToActualCharacter, keyCharToCode, keyCodeToChar } from './Input';
import { CanvasProps } from './Canvas/Canvas';
import { Player } from './Entity/Actor/Player';
import Vector2 from './Vector';

class Game {

  private keyMap: any;

  public gameMap: GameMap;

  public screens: Screen[];
  public activeScreen: Screen;

  public ctx: CanvasRenderingContext2D;
  public canvasProps: CanvasProps;

  public player: Player;

  constructor (gameMap: GameMap, screens: Screen[], canvasProps: CanvasProps, ctx: CanvasRenderingContext2D, player: Player) {
    this.player = player;
    this.gameMap = gameMap;
    this.screens = screens;
    this.activeScreen = screens[0];
    this.canvasProps = canvasProps;
    this.keyMap = {};
    this.ctx = ctx;
    window.onkeydown = this.handleInput.bind(this);
    window.onkeyup = this.handleInput.bind(this);
  }

  handleInput(e: KeyboardEvent): void {
    e.preventDefault();
    const { keyCode, type } = e;
    this.keyMap[keyCode] = type === 'keydown';
    if (type === 'keydown') {
      let char = mapKeyPressToActualCharacter(Boolean(this.keyMap[keyCharToCode['Shift']]), keyCode);
      // Not an uppercase-able character returns and empty string
      char = char.trim();
      if (!char) {
        char = keyCodeToChar[keyCode];
      }
      this.activeScreen.handleInput(char);
      this.activeScreen.render(this.ctx);
    }
  }

  updatePlayerPos (player: Player, nextPos: Vector2): void {
    const { tiles } = this.gameMap;
    const { x, y } = player.pos;
    const { x: nextX, y: nextY } = nextPos;
    let row = tiles[y];
    let item = row[x];
    item.occupier = null;
    item.isOccupied = false;
    row = tiles[nextY];
    item = row[nextX];
    item.occupier = player;
    item.isOccupied = true;
    player.pos = nextPos;
  }
}

export default Game;