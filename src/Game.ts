import { Screen } from './Screen/Screen';
import { mapKeyPressToActualCharacter, keyCharToCode, keyCodeToChar } from './Input';
import { CanvasProps } from './Canvas/Canvas';
import { Player } from './Entity/Actor/Player';
import Vector2 from './Vector';
import { Messenger, Message } from './Message/Message';
import { Enemy } from './Entity/Actor/Enemy';
import { DungeonGenerator, DungeonOptions } from './Map/DungeonGenerator';
import { Legendary } from './Random/Legendary';
import { Floor } from './Map/Floor';
import { js as EasyStar, js } from '../custom_modules/easystarjs';
import { Promise } from 'bluebird';
import { EnemySpawner } from './Entity/Actor/EnemySpawner';
import { Effects } from './Effects';

class Game {

  private keyMap: any;

  public static instance: Game | null = null;

  public screens: Screen[];
  public activeScreen: Screen;

  public player: Player;

  public messenger: Messenger;

  public dungeonGenerator: DungeonGenerator;

  public legendary: Legendary;

  public currentFloor: Floor;

  public enemySpawner: EnemySpawner;

  public effects: Effects;

  public easystar: EasyStar;
  public easystarTiles: number[][];
  private easystarClosedTile: number = 0;
  private easystarOpenTile: number = 1;

  constructor (
      screens: Screen[],
      player: Player,
      el: HTMLElement,
      bottomEl: HTMLElement
    ) {

    if (Game.instance !== null) {
      throw 'Critical error! Two game instances';
    } else {
      Game.instance = this;
    }

    this.player = player;
    this.screens = screens;
    this.activeScreen = screens[0];
    this.keyMap = {};
    this.messenger = new Messenger(el, bottomEl);
    window.onkeydown = this.handleInput.bind(this);
    window.onkeyup = this.handleInput.bind(this);

    // Legendary has to load before the floor and dungeon generators
    this.legendary = new Legendary();

    this.enemySpawner = new EnemySpawner();

    this.dungeonGenerator = new DungeonGenerator(<DungeonOptions>{
      depth: 15
    });

    this.effects = new Effects(<HTMLDivElement>document.getElementById('transition-wrapper'));

    // Debug
    //this.dungeonGenerator.debugAndGenerateAllFloors();
    this.dungeonGenerator.generateNewFloor();
    this.currentFloor = this.dungeonGenerator.floors[0];
    this.initializeEasyStar();
    this.updatePlayerPos(this.player, this.dungeonGenerator.floors[0].floorStart);
    this.effects.transitionToNextFloor();
    // Debug
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

      /**
       * If the player has either moved or interacted with an interactable object,
       * then enemies all get a turn to attack the player. This flag isn't set for certain
       * actions that the play takes, such as inspecting a nearby tile, which essentially
       * a free action.
       */
      if (player.hasMoveInteracted && this.currentFloor.activeEnemies.length) {
        const enemyActions = this.currentFloor.activeEnemies.map(enemy => enemy.act()).reduce((actions, action) => actions.concat(action));
        const enemyUpdates = this.currentFloor.activeEnemies.map(enemy => enemy.update()).reduce((updates, update) => updates.concat(update));
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
      this.activeScreen.render();
    }
  }

  updatePlayerPos (player: Player, nextPos: Vector2): void {
    const { tiles } = this.currentFloor;
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
    this.currentFloor.tiles = tiles;
    player.move(nextPos);
  }

  update () {
    this.currentFloor.activeEnemies = this.currentFloor.activeEnemies.filter(this.corpsify.bind(this));
  }

  corpsify (enemy: Enemy): boolean {
    if (enemy.isDead()) {
      this.removeDeadOccupants(enemy.pos);
      // @TODO generate a bloody mess to inspect
    }
    return enemy.isActive;
  }

  initializeEasyStar (): void {
    this.easystar = new EasyStar();
    this.easystarTiles = this.generateEasystarTiles();
    this.easystar.setGrid(this.easystarTiles);
    this.easystar.setAcceptableTiles([this.easystarOpenTile]);
    this.easystar.enableDiagonals();
    this.easystar.enableSync();
  }

  removeDeadOccupants (pos: Vector2): void {
    const { x, y } = pos;
    let { occupiers } = this.currentFloor.tiles[y][x];
    // Bring out the dead
    occupiers = occupiers.filter(occupier => !occupier.isDead());
    this.currentFloor.tiles[y][x].occupiers = occupiers;
    this.currentFloor.tiles[y][x].isOccupied = Boolean(occupiers.length);
  }

  generateEasystarTiles (): number[][] {
    let easystarTiles = [];
    for (let y = 0; y < this.currentFloor.tiles.length; y++) {
      easystarTiles[y] = [];
      for (let x = 0; x < this.currentFloor.tiles[y].length; x++) {
        const currentTile = this.currentFloor.tiles[y][x];
        easystarTiles[y].push(
          currentTile.isPassible && !currentTile.isOccupied ?
          this.easystarOpenTile :
          this.easystarClosedTile
        );
      }
    }
    // Set the player's location to open so the AI can "move" there
    const { x, y } = this.player.pos;
    easystarTiles[y][x] = this.easystarOpenTile;
    return easystarTiles;
  }

  updateEasystarTiles (): void {
    this.easystarTiles = this.generateEasystarTiles();
    this.easystar.setGrid(this.easystarTiles);
  }

  setTileToOpen (pos: Vector2): void {
    this.easystar.setTileAt(pos.x, pos.y, this.easystarOpenTile);
  }

  setTileToClosed (pos: Vector2): void {
    this.easystar.setTileAt(pos.x, pos.y, this.easystarClosedTile);
  }

  getPath (pos1, pos2): Vector2[] {
    const { easystar } = this;
    let found = [];
    easystar.findPath(pos1.x, pos1.y, pos2.x, pos2.y, (path) => {
      if (!path) {
      } else {
        found = path;
      }
    });
    easystar.calculate();
    return found;
  }

  updateEnemyPosition (oldPos: Vector2, newPos: Vector2, enemy: Enemy): void {
    const { x, y } = oldPos;
    // Remove here
    this.currentFloor.tiles[y][x].occupiers = this.currentFloor.tiles[y][x].occupiers.filter(occupier => !occupier.isEnemy);
    this.currentFloor.tiles[y][x].isOccupied = false;
    // Add to the next position
    try {
    Array.isArray(this.currentFloor.tiles[newPos.y][newPos.x].occupiers) ? 
    this.currentFloor.tiles[newPos.y][newPos.x].occupiers.push(enemy) :
    this.currentFloor.tiles[newPos.y][newPos.x].occupiers = [enemy];
    this.currentFloor.tiles[newPos.y][newPos.x].isOccupied = true;
    } catch (e) {
      console.log(oldPos, newPos, this.currentFloor.tiles );
    }
  }

  playerDescend () {
    const { floors, currentDepth } = this.dungeonGenerator;
    if (floors[currentDepth + 1]) {
      this.currentFloor = floors[currentDepth + 1];
    } else {
      this.dungeonGenerator.generateNewFloor();
      // Dungeon generator updates the depth automatically
      this.currentFloor = floors[this.dungeonGenerator.currentDepth - 1];
      this.updatePlayerPos(this.player, this.dungeonGenerator.floors[this.dungeonGenerator.currentDepth - 1].floorStart);
      // @TODO Seems like the previous easystar tiles should be saved somehow
      this.initializeEasyStar();
    }
    this.effects.transitionToNextFloor();
  }
}

export default Game;