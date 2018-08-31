import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, CanvasProps } from '../Canvas/Canvas';
import Vector2 from '../Vector';
import { Message, Panel } from '../Message/Messenger';
import { Colors } from '../Canvas/Color';
import { Floor } from '../Map/Floor';
import { Tile, TileTypes } from '../Map/Tile';
import { convert } from 'roman-numeral';

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
  MOVE_DOWN_RIGHT = 'c',
  DESCEND = '>',
  ASCEND = '<',
  WAIT = 'x',
  INSPECT = 'i'
}

class MapScreen extends Screen {

  private textSpacing: Vector2 = new Vector2(.9, 1.5);

  public name: ScreenNames = ScreenNames.MAP;
  public game: Game;
  public inputs: InputMap = {
    [MapScreenInputs.INVENTORY]: this.showInventoryScreen,
    [MapScreenInputs.AMULET]: this.showInventoryItemScreen.bind(this, ScreenNames.AMULET),
    [MapScreenInputs.ARMOR]: this.showInventoryItemScreen.bind(this, ScreenNames.ARMOR),
    [MapScreenInputs.FOOD]: this.showInventoryItemScreen.bind(this, ScreenNames.FOOD),
    [MapScreenInputs.KEYS]: this.showInventoryItemScreen.bind(this, ScreenNames.KEYS),
    [MapScreenInputs.POTIONS]: this.showInventoryItemScreen.bind(this, ScreenNames.POTIONS),
    [MapScreenInputs.RING]: this.showInventoryItemScreen.bind(this, ScreenNames.RING),
    [MapScreenInputs.SCROLL]: this.showInventoryItemScreen.bind(this, ScreenNames.SCROLL),
    [MapScreenInputs.WEAPONS]: this.showInventoryItemScreen.bind(this, ScreenNames.WEAPON),
    [MapScreenInputs.COMMANDS]: this.showCommandScreen,
    [MapScreenInputs.UNEQUIP]: this.showUnequipScreen,
    [MapScreenInputs.MESSAGES]: this.showMessageScreen,
    [MapScreenInputs.HELP]: this.showHelpScreen,
    [MapScreenInputs.MOVE_UP]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_LEFT]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_DOWN]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_RIGHT]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_UP_LEFT]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_UP_RIGHT]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_DOWN_LEFT]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.MOVE_DOWN_RIGHT]: this.attemptPlayerMovement.bind(this),
    [MapScreenInputs.DESCEND]: this.attemptDescend,
    [MapScreenInputs.WAIT]: this.playerWait,
    [MapScreenInputs.INSPECT]: this.showInspectScreen
  }

  constructor() {
    super({});
  }

  render() {
    const { currentFloor, messenger } = Game.instance;
    const { tiles } = currentFloor;
    messenger.clearPanel(Panel.BOTTOM);
    messenger.writeToPanel(Panel.BOTTOM, [{
      color: Colors.DEFAULT,
      text: `Press '?' for command list.`
    }]);
    this.renderTiles();
  }

  renderTiles () { // This should really be rendered once per floor
    const tiles = document.getElementById('tilemap');
    const title = document.getElementById('title');
    const { currentFloor } = Game.instance;
    const titleHtml = `<h2>${currentFloor.getFormattedName()}</h2>`;
    let tileHtml = '';
    for (let y = 0; y < currentFloor.floorHeight; y++) {
      tileHtml += `<p>`;
      for (let x = 0; x < currentFloor.floorWidth; x++) {
        const tile = currentFloor.tiles[y][x];
        const { char } = tile.isOccupied ? tile.occupiers[0] : tile; // @TODO update to show the most important occupier to display, maybe with z values
        tileHtml += `
        <span
          class='tile'
          style="color: ${this.getTileColor(tile)};}"
          id="${this.getTileId(y, x)}"
        >
          ${char}
        </span>`;
      } // debug color
      tileHtml += `</p>`;
    }

    title.innerHTML = titleHtml;
    tiles.innerHTML = tileHtml;

    // debug
    this.debugHighlightRoomStartingPositions();
    // debug
  }

  getTileColor (tile: Tile): string {
    if (tile.isVisible) {
      return tile.isOccupied ? tile.occupiers[0].color.val() : tile.color.val();
    } else {
      return tile.hasVisited ? Colors.HAS_VISITED_TILE.val() : Colors.BACKGROUD_COLOR.val();
    }
  }

  getTileId (y: number, x: number): string {
    return `${y}-${x}`;
  }

  attemptPlayerMovement(keyValue: string): void | Message[] {
    const { player, currentFloor } = Game.instance;
    const { pos } = player;
    const { tiles } = currentFloor;
    let nextPos;
    switch (keyValue) {
      case 'w':
        nextPos = Vector2.apply(pos, new Vector2(0, -1));
        break;
      case 'a':
        nextPos = Vector2.apply(pos, new Vector2(-1, 0));
        break;
      case 's':
        nextPos = Vector2.apply(pos, new Vector2(0, 1));
        break;
      case 'd':
        nextPos = Vector2.apply(pos, new Vector2(1, 0));
        break;
      case 'q':
        nextPos = Vector2.apply(pos, new Vector2(-1, -1));
        break;
      case 'e':
        nextPos = Vector2.apply(pos, new Vector2(1, -1));
        break;
      case 'z':
        nextPos = Vector2.apply(pos, new Vector2(-1, 1));
        break;
      case 'c':
        nextPos = Vector2.apply(pos, new Vector2(1, 1));
        break;
    }
    // Quickest checks first!
    if (player.canMove && currentFloor.inBounds(currentFloor.floorWidth, currentFloor.floorHeight, nextPos)) {
      const { isPassible, isOccupied, occupiers } = tiles[nextPos.y][nextPos.x];
      if (isPassible && !isOccupied) {
        const prevPos = player.pos;
        Game.instance.updatePlayerPos(player, nextPos);
        this.redrawTile(prevPos);
        this.redrawTile(nextPos);
      } else if (isOccupied) {
        let target;
        let messages: Message[] = [];
        // Find the first enemy in the space
        // @TODO there really shouldn't be more than one enemy in a single space
        // There might be something like an enemy and some items on the floor, debris, or a trap
        for (let i = 0; i < occupiers.length; i++) {
          if (occupiers[i].isInteractive && occupiers[i].isEnemy) {
            target = occupiers[i];
            if (player.attemptAttack(target)) {
              const damage = player.attack(target);
              messages.push(player.formatSuccessfulAttack(damage, target));
            } else {
              messages.push(player.formatUnsuccessfulAttack(target));
            }
          }
        }
        return messages;
      } else if (!isPassible) {
      } else {
        console.log('Something is not right here. Check your logic, ya dingus.');
      }
    }
    return null;
  }

  playerWait () {
    const { player } = Game.instance;
    player.hasMoveInteracted = true;
  }

  showHelpScreen (): void | Message[] {
    const [helpScreen] = Game.instance.screens.filter(screen => screen.name === ScreenNames.HELP);
    Game.instance.activeScreen = helpScreen;
  }

  showUnequipScreen (): void | Message[] {
    const [unequipScreen] = Game.instance.screens.filter(screen => screen.name === ScreenNames.UNEQUIP);
    Game.instance.activeScreen = unequipScreen;
  }

  showMessageScreen (): void | Message[] {
    const [messageScreen] = Game.instance.screens.filter(screen => screen.name === ScreenNames.MESSAGES);
    Game.instance.activeScreen = messageScreen;
  }

  showCommandScreen (): void | Message[] {
    const [commandScreen] = Game.instance.screens.filter(screen => screen.name === ScreenNames.COMMANDS);
    Game.instance.activeScreen = commandScreen;
  }

  showInventoryScreen (): void | Message[] {
    const [inventoryScreen] = Game.instance.screens.filter(screen => screen.name === ScreenNames.INVENTORY);
    Game.instance.activeScreen = inventoryScreen;
  }

  showInventoryItemScreen (inventoryItem: string): void | Message[] {
    const [nextScreen] = Game.instance.screens.filter(screen => screen.name === inventoryItem);
    Game.instance.activeScreen = nextScreen;
  }

  showInspectScreen (): void | Message[] {
    const [inspectScreen] = Game.instance.screens.filter(screen => screen.name === ScreenNames.INSPECT);
    Game.instance.activeScreen = inspectScreen;
    console.log(inspectScreen);
  }

  attemptDescend (): void | Message[] {
    const { currentFloor, player } = Game.instance;
    if (currentFloor.tiles[player.pos.y][player.pos.x].type === TileTypes.FLOOR_DOWN) {
      Game.instance.playerDescend();
    } else {
      return [<Message>{
        text: 'You cannot descend here.'
      }];
    }
  }

  debugHighlightRoomStartingPositions (): void {
    Game.instance.currentFloor.rooms.forEach((room) => {
      const selector = this.getTileId(room.pos.y, room.pos.x);
      document.getElementById(selector).style.border = '1px solid blue';
    });
  }

  redrawTile (pos: Vector2) {
    const selector = this.getTileId(pos.y, pos.x);
    const tile = Game.instance.currentFloor.tiles[pos.y][pos.x];
    const { char } = tile.isOccupied ? tile.occupiers[0] : tile; // @TODO update to show the most important occupier to display, maybe with z values
    const tileColor = this.getTileColor(tile);
    const el: HTMLElement = document.getElementById(selector);
    el.innerText = char;
    el.style.color = tileColor;
    el.style.border = 'none';
  }

}
export default MapScreen;

export { MapScreenInputs }