import { GameMap } from './GameMap';
import { Screen } from './Screen/Screen';
import { mapKeyPressToActualCharacter, keyCharToCode, keyCodeToChar } from './Input';
import { CanvasProps } from './Canvas/Canvas';
import { Player } from './Entity/Actor/Player';
import Vector2 from './Vector';
import { Messenger, Message } from './Message/Message';

class Game {

  private keyMap: any;

  public gameMap: GameMap;

  public screens: Screen[];
  public activeScreen: Screen;

  public ctx: CanvasRenderingContext2D;
  public canvasProps: CanvasProps;

  public player: Player;

  public messenger: Messenger;

  public activeEnemies = []; // @TODO

  constructor (gameMap: GameMap, screens: Screen[], canvasProps: CanvasProps, ctx: CanvasRenderingContext2D, player: Player, el: HTMLElement) {
    this.player = player;
    this.gameMap = gameMap;
    this.screens = screens;
    this.activeScreen = screens[0];
    this.canvasProps = canvasProps;
    this.keyMap = {};
    this.ctx = ctx;
    this.messenger = new Messenger(el);
    window.onkeydown = this.handleInput.bind(this);
    window.onkeyup = this.handleInput.bind(this);
  }

  /**
   * Effectively, this is the game loop. Since everything is turn-based,
   * the browser window waits for input and then responds accordingly.
   * Sometimes the screen is changed, sometimes enemies move: it all 
   * depends on what the key input is from the user.
   * @param e - event
   */
  handleInput(e: KeyboardEvent): void {
    e.preventDefault();
    const { keyCode, type } = e;
    this.keyMap[keyCode] = type === 'keydown';
    // Ignore the Shift key, which is just a key modifier
    if (type === 'keydown' && keyCodeToChar[keyCode] !== 'Shift') {
      // Clear the current message window
      this.messenger.clearMessages();
      // Get the char value of the current key
      let char = mapKeyPressToActualCharacter(Boolean(this.keyMap[keyCharToCode['Shift']]), keyCode);
      // Not an uppercase-able character returns and empty string
      char = char.trim();
      if (!char) {
        char = keyCodeToChar[keyCode];
      }
      // Handle the player input first. The player gets priority for everything
      let messages: Message[] = this.activeScreen.handleInput(char);

      /**
       * If the player has either moved or interacted with an interactable object,
       * then enemies all get a turn to attack the player. This flag isn't set for certain
       * actions that the play takes, such as inspecting a nearby tile, which essentially
       * a free action.
       */
      if (this.player.hasMoveInteracted && this.activeEnemies.length) {
        //this.messenger.logMessages(this.activeEnemies.forEach(enemy => enemy.act());
        //messages = messages.concat[this.activeEnemies.forEach(enemy => enemy.update());
      }

      // See player.update description
      this.messenger.logMessages(messages.concat(this.player.update()));

      // Finally, render what's changed
      this.activeScreen.render(this.ctx);
    }
  }

  updatePlayerPos (player: Player, nextPos: Vector2): void {
    const { tiles } = this.gameMap;
    const { x, y } = player.pos;
    const { x: nextX, y: nextY } = nextPos;
    // This is a reference to the row and the items themselves - don't forget they're essentially pointers
    let p_row = tiles[y];
    let p_item = p_row[x];
    // @TODO This isn't right. Clearing out the occupiers will mess up what's in that tile
    // especially when Tile becomes a class
    p_item.occupiers = [];
    p_item.isOccupied = false;
    // Select the next row and tiles
    p_row = tiles[nextY];
    p_item = p_row[nextX];
    p_item.occupiers = [player];
    p_item.isOccupied = true;
    // @TODO revisit above
    this.gameMap.tiles = tiles;
    player.move(nextPos);
  }
}

export default Game;