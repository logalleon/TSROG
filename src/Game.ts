import { GameMap } from './GameMap';
import { Screen } from './Screen';
import { mapKeyPressToActualCharacter, keyCharToCode } from './Input';
import { CanvasProps } from './Canvas';

class Game {

  private keyMap: any;

  public screens: Screen[];
  public activeScreen: Screen;

  public ctx: CanvasRenderingContext2D;
  public canvasProps: CanvasProps;

  constructor (map: GameMap, screens: Screen[], canvasProps: CanvasProps, ctx: CanvasRenderingContext2D) {
    this.screens = screens;
    this.activeScreen = screens[0];
    this.canvasProps = canvasProps;
    this.keyMap = {};
    this.ctx = ctx;
    window.onkeydown = this.handleInput.bind(this);
    window.onkeyup = this.handleInput.bind(this);
  }

  handleInput(e: KeyboardEvent): void {
    const { keyCode, type } = e;
    this.keyMap[keyCode] = type === 'keydown';
    if (type === 'keydown') {
      const char = mapKeyPressToActualCharacter(Boolean(this.keyMap[keyCharToCode['Shift']]), keyCode);
      this.activeScreen.handleInput(char);
    }
  }
}

export default Game;