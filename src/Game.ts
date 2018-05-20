import { GameMap } from './GameMap';
import { Screen } from './Screen/Screen';
import { mapKeyPressToActualCharacter, keyCharToCode, keyCodeToChar } from './Input';
import { CanvasProps } from './Canvas/Canvas';
import { Player } from './Entity/Actor/Player';
import Vector2 from './Vector';
import { Messenger, Message } from './Message/Message';
import { Enemy } from './Entity/Actor/Enemy';

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

  constructor (
      gameMap: GameMap,
      screens: Screen[],
      canvasProps: CanvasProps,
      ctx: CanvasRenderingContext2D,
      player: Player,
      el: HTMLElement,
      bottomEl: HTMLElement
    ) {
    this.player = player;
    this.gameMap = gameMap;
    this.screens = screens;
    this.activeScreen = screens[0];
    this.canvasProps = canvasProps;
    this.keyMap = {};
    this.ctx = ctx;
    this.messenger = new Messenger(el, bottomEl);
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
    const { player } = this;
    this.keyMap[keyCode] = type === 'keydown';
    // Ignore the Shift key, which is just a key modifier
    if (type === 'keydown' && keyCodeToChar[keyCode] !== 'Shift') {
      // Get the char value of the current key
      let char = mapKeyPressToActualCharacter(Boolean(this.keyMap[keyCharToCode['Shift']]), keyCode);
      // Not an uppercase-able character returns and empty string
      char = char.trim();
      if (!char) {
        char = keyCodeToChar[keyCode];
      }
      // Handle the player input first. The player gets priority for everything
      const inputMessages = this.activeScreen.handleInput(char);
      let messages: Message[] = Array.isArray(inputMessages) ? inputMessages : [];
      console.log('input Message', inputMessages, messages);
      console.log(player.hasMoveInteracted, this.activeEnemies.length);

      /**
       * If the player has either moved or interacted with an interactable object,
       * then enemies all get a turn to attack the player. This flag isn't set for certain
       * actions that the play takes, such as inspecting a nearby tile, which essentially
       * a free action.
       */
      if (player.hasMoveInteracted && this.activeEnemies.length) {
        const enemyActions = this.activeEnemies.map(enemy => enemy.act()).reduce((actions, action) => actions.concat(action));
        const enemyUpdates = this.activeEnemies.map(enemy => enemy.update()).reduce((updates, update) => updates.concat(update));
        messages = messages.concat(
          Array.isArray(enemyActions) ? enemyActions : [],
          Array.isArray(enemyUpdates) ? enemyUpdates : []
        );
      }

      // See player.update description
      const playerMessages = player.update();
      // Clear the current message window
      this.messenger.clearMessages();
      this.messenger.logMessages(messages.concat(Array.isArray(playerMessages) ? playerMessages : []));

      // Update internals of the game
      this.update();

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

  update () {
    this.activeEnemies = this.activeEnemies.filter(this.corpsify.bind(this));
  }

  corpsify (enemy: Enemy): boolean {
    if (enemy.isDead()) {
      this.gameMap.removeDeadOccupants(enemy.pos);
      // @TODO generate a bloody mess to inspect
    }
    return enemy.isActive;
  }
}

export default Game;