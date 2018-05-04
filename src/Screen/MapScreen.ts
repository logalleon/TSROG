import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, CanvasProps } from '../Canvas/Canvas';
import { Tile, GameMap } from '../GameMap';
import Vector2 from '../Vector';
import { Message } from '../Message/Message';
import { Colors } from '../Canvas/Color';

enum MapScreenInputs {
  INVENTORY = 'I',
  AMULET = 't',
  ARMOR = 'u',
  FOOD = 'o',
  KEYS = 'y',
  POTIONS = 'p',
  RING = 'n',
  SCROLL = 'l',
  WEAPONS = 'k',
  COMMANDS = '?',
  UNEQUIP = 'U',
  MESSAGES = 'M',
  HELP = '/',
  MOVE_UP = 'w',
  MOVE_LEFT = 'a',
  MOVE_DOWN = 's',
  MOVE_RIGHT = 'd',
  MOVE_UP_LEFT = 'q',
  MOVE_UP_RIGHT = 'e',
  MOVE_DOWN_LEFT = 'z',
  MOVE_DOWN_RIGHT = 'c'
}

class MapScreen extends Screen {

  private textSpacing: Vector2 = new Vector2(.9, 1.5);

  public name: ScreenNames = ScreenNames.MAP;
  public game: Game;
  public inputs: InputMap = {
    [MapScreenInputs.INVENTORY]: this.showInventoryScreen,
    [MapScreenInputs.AMULET]: this.showAmuletScreen,
    [MapScreenInputs.ARMOR]: this.showArmorScreen,
    [MapScreenInputs.FOOD]: this.showFoodScreen,
    [MapScreenInputs.KEYS]: this.showKeyItems,
    [MapScreenInputs.POTIONS]: this.showPotionScreen,
    [MapScreenInputs.RING]: this.showRingScreen,
    [MapScreenInputs.SCROLL]: this.showScrollScreen,
    [MapScreenInputs.WEAPONS]: this.showWeaponScreen,
    [MapScreenInputs.COMMANDS]: this.showCommandScreen,
    [MapScreenInputs.UNEQUIP]: this.showUnequipScreen,
    [MapScreenInputs.MESSAGES]: this.showMessageScreen,
    [MapScreenInputs.HELP]: this.showHelpScreen,
    [MapScreenInputs.MOVE_UP]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_LEFT]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_DOWN]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_RIGHT]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_UP_LEFT]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_UP_RIGHT]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_DOWN_LEFT]: this.attemptMovement.bind(this),
    [MapScreenInputs.MOVE_DOWN_RIGHT]: this.attemptMovement.bind(this)
  }

  constructor() {
    super();
  }

  render(ctx: CanvasRenderingContext2D) {
    const { gameMap, canvasProps } = this.game;
    const { tiles } = gameMap;
    clearCanvas(ctx, canvasProps);
    this.game.messenger.logMessages([{ text: 'This is the map screen', color: Colors.DEFAULT }]);
    this.renderTiles(tiles, ctx, canvasProps);
  }

  renderTiles (tiles: Tile[][], ctx: CanvasRenderingContext2D, canvasProps: CanvasProps) {
    const { fontColor, fontSize } = fontOptions;
    const { width } = canvasProps;
    const offset = this.calculateOffset(canvasProps, this.game.gameMap, fontSize);
    for (let row = 0; row < tiles.length; row++) {
      for (let col = 0; col < tiles[row].length; col++) {
        const tile = tiles[row][col];
        const { char, color } = tile.isOccupied ?
          tile.occupier : tile;
        ctx.fillStyle = color.hex || color.rgb;
        ctx.fillText(
          char,
          (col * fontSize * this.textSpacing.x) + offset.x,
          (row * fontSize * this.textSpacing.y) + offset.y
        );
      }
    }
  }

  calculateOffset(canvasProps: CanvasProps, gameMap: GameMap, fontSize: number): Vector2 {
    // This centers the map on the canvas
    return new Vector2(
      (canvasProps.width / 2) - (gameMap.width / 2 * fontSize),
      (canvasProps.height / 2) - (gameMap.height / 2 * fontSize)
    );
  }

  attemptMovement(keyValue: string): void | Message[] {
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
    return null;
  }

  showHelpScreen (): void | Message[] {
    const [helpScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.HELP);
    this.game.activeScreen = helpScreen;
  }

  showUnequipScreen (): void | Message[] {
    const [unequipScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.UNEQUIP);
    this.game.activeScreen = unequipScreen;
  }

  showMessageScreen (): void | Message[] {
    const [messageScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.MESSAGES);
    this.game.activeScreen = messageScreen;
  }

  showCommandScreen (): void | Message[] {
    const [commandScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.COMMANDS);
    this.game.activeScreen = commandScreen;
  }

  showInventoryScreen (): void | Message[] {
    const [inventoryScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.INVENTORY);
    this.game.activeScreen = inventoryScreen;
  }

  showAmuletScreen (): void | Message[] {
    const [amuletScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.AMULET);
    this.game.activeScreen = amuletScreen;
  }

  showArmorScreen (): void | Message[] {
    const [armorScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.ARMOR);
    this.game.activeScreen = armorScreen;
  }

  showFoodScreen (): void | Message[] {
    const [foodScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.FOOD);
    this.game.activeScreen = foodScreen;
  }

  showKeyItems (): void | Message[] {
    const [keyItemScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.KEYS);
    this.game.activeScreen = keyItemScreen;
  }

  showPotionScreen (): void | Message[] {
    const [potionScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.POTIONS);
    this.game.activeScreen = potionScreen;
  }

  showRingScreen (): void | Message[] {
    const [ringScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.RING);
    this.game.activeScreen = ringScreen;
  }

  showScrollScreen (): void | Message[] {
    const [scrollScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.SCROLL);
    this.game.activeScreen = scrollScreen;
  }

  showWeaponScreen (): void | Message[] {
    const [weaponScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.WEAPON);
    this.game.activeScreen = weaponScreen;
  }

}
export default MapScreen;

export { MapScreenInputs }