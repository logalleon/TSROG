import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, CanvasProps } from '../Canvas/Canvas';
import { Tile, GameMap } from '../GameMap';
import Vector2 from '../Vector';

class MapScreen extends Screen {

  private textSpacing: Vector2 = new Vector2(.9, 1.5);

  public name: ScreenNames = ScreenNames.MAP;
  public game: Game;
  public inputs: InputMap = {
    'I': this.showInventoryScreen,
    't': this.showAmuletScreen,
    'u': this.showArmorScreen,
    'o': this.showFoodScreen,
    'y': this.showKeyItems,
    'p': this.showPotionScreen,
    'n': this.showRingScreen,
    'l': this.showScrollScreen,
    'k': this.showWeaponScreen,
    '?': this.showCommandScreen,
    'U': this.showUnequipScreen,
    'M': this.showMessageScreen,
    '/': this.showHelpScreen,
    'w': this.attemptMovement.bind(this),
    'a': this.attemptMovement.bind(this),
    's': this.attemptMovement.bind(this),
    'd': this.attemptMovement.bind(this),
    'q': this.attemptMovement.bind(this),
    'e': this.attemptMovement.bind(this),
    'z': this.attemptMovement.bind(this),
    'c': this.attemptMovement.bind(this)
  }

  constructor() {
    super();
  }

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

  showHelpScreen (): void {
    const [helpScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.HELP);
    this.game.activeScreen = helpScreen;
  }

  showUnequipScreen (): void {
    const [unequipScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.UNEQUIP);
    this.game.activeScreen = unequipScreen;
  }

  showMessageScreen (): void {
    const [messageScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.MESSAGES);
    this.game.activeScreen = messageScreen;
  }

  showCommandScreen (): void {
    const [commandScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.COMMANDS);
    this.game.activeScreen = commandScreen;
  }

  showInventoryScreen (): void {
    const [inventoryScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.INVENTORY);
    this.game.activeScreen = inventoryScreen;
  }

  showAmuletScreen (): void {
    const [amuletScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.AMULET);
    this.game.activeScreen = amuletScreen;
  }

  showArmorScreen (): void {
    const [armorScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.ARMOR);
    this.game.activeScreen = armorScreen;
  }

  showFoodScreen (): void {
    const [foodScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.FOOD);
    this.game.activeScreen = foodScreen;
  }

  showKeyItems (): void {
    const [keyItemScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.KEYS);
    this.game.activeScreen = keyItemScreen;
  }

  showPotionScreen (): void {
    const [potionScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.POTIONS);
    this.game.activeScreen = potionScreen;
  }

  showRingScreen (): void {
    const [ringScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.RING);
    this.game.activeScreen = ringScreen;
  }

  showScrollScreen (): void {
    const [scrollScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.SCROLL);
    this.game.activeScreen = scrollScreen;
  }

  showWeaponScreen (): void {
    const [weaponScreen] = this.game.screens.filter(screen => screen.name === ScreenNames.WEAPON);
    this.game.activeScreen = weaponScreen;
  }

}
export default MapScreen;