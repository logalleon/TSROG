import { GameMap } from './GameMap';
import { Screen } from './Screen';
import { mapKeyPressToActualCharacter, keyCharToCode, keyCodeToChar } from './Input';
import { CanvasProps } from './Canvas';
import { Player } from './Player';

class Game {

  private keyMap: any;

  public gameMap: GameMap;

  public screens: Screen[];
  public activeScreen: Screen;

  public ctx: CanvasRenderingContext2D;
  public canvasProps: CanvasProps;

  constructor (gameMap: GameMap, screens: Screen[], canvasProps: CanvasProps, ctx: CanvasRenderingContext2D) {
    console.log(gameMap, 'here');
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

  updatePlayerPos (player: Player): void {
    const { tiles } = this.gameMap;
    const { posX, posY } = player;
    const row = tiles[posY];
    const item = row[posX];
    item.o = player;
    item.isOccupied = true;
    this.gameMap.tiles = tiles;
  }
}

export default Game;