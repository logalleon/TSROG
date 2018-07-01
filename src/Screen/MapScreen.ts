import { Screen, ScreenNames } from './Screen';
import Game from '../Game';
import { InputMap } from '../Input';
import { clearCanvas, fontOptions, CanvasProps } from '../Canvas/Canvas';
import Vector2 from '../Vector';
import { Message } from '../Message/Message';
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
  ASCEND = '<'
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
    [MapScreenInputs.DESCEND]: this.attemptDescend
  }

  constructor() {
    super();
  }

  render() {
    const { currentFloor, messenger } = this.game;
    const { tiles } = currentFloor;
    messenger.clearBottomMessages();
    messenger.logBottomMessage({
      color: Colors.DEFAULT,
      text: `Press '?' for command list.`
    });
    this.renderTiles();
  }

  renderTiles () {
    const tiles = document.getElementById('tilemap');
    const title = document.getElementById('title');
    const { currentFloor } = Game.instance;
    const titleHtml = `<h2>${currentFloor.getFormattedName()}</h2>`;
    let tileHtml = '';
    for (let y = 0; y < currentFloor.floorHeight; y++) {
      tileHtml += '<p>';
      for (let x = 0; x < currentFloor.floorWidth; x++) {
        const tile = currentFloor.tiles[y][x];
        const { char, color } = tile.isOccupied ?
        tile.occupiers[0] : tile; // @TODO update to show the most important occupier to display, maybe with z values
        tileHtml += `<span class='tile' style="color: ${color.val()}">${char}</span>`;
      }
      tileHtml += '</p>';
    }
    
    title.innerHTML = titleHtml;
    tiles.innerHTML = tileHtml;
  }

  attemptPlayerMovement(keyValue: string): void | Message[] {
    const { player, currentFloor } = this.game;
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
        this.game.updatePlayerPos(player, nextPos);
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

  showInventoryItemScreen (inventoryItem: string): void | Message[] {
    const [nextScreen] = this.game.screens.filter(screen => screen.name === inventoryItem);
    this.game.activeScreen = nextScreen;
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

}
export default MapScreen;

export { MapScreenInputs }