import { InputMap } from './Input';
import Game from './Game';

interface Screen {
  name: string,
  game: Game,
  inputs: InputMap,
  setGame(game: Game): void,
  handleInput(keyValue: string): void,
  render(ctx: CanvasRenderingContext2D): void
}

export { Screen };