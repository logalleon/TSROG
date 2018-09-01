import { Screen, ScreenNames } from "./Screen";
import { Panel, Message } from "../Message/Messenger";
import { InputMap } from "../Input";
import MapScreen, { MapScreenInputs } from "./MapScreen";
import Vector2 from "../Vector";
import Game from "../Game";
import { Prop } from "../Entity/Prop/Prop";
import { TileTypes } from "../Map/Tile";

class InspectScreen extends Screen {

  public identifier: Panel = Panel.PANEL_1;
  public name: ScreenNames = ScreenNames.INSPECT;
  public inputs: InputMap;

  constructor () {
    super({});
    this.inputs = (<any>Object).assign({
      [MapScreenInputs.MOVE_UP]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_LEFT]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_DOWN]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_RIGHT]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_UP_LEFT]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_UP_RIGHT]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_DOWN_LEFT]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.MOVE_DOWN_RIGHT]: this.inspectAdjacentTile.bind(this),
      [MapScreenInputs.WAIT]: this.inspectAdjacentTile.bind(this)
    }, this.inputs);
  }

  inspectAdjacentTile (keyValue: string): void | Message[] {
      const { player, currentFloor } = Game.instance;
      const { pos } = player;
      const { tiles } = currentFloor;
      let inspectPos;
      switch (keyValue) {
        case MapScreenInputs.MOVE_UP:
          inspectPos = Vector2.apply(pos, new Vector2(0, -1));
          break;
        case MapScreenInputs.MOVE_LEFT:
          inspectPos = Vector2.apply(pos, new Vector2(-1, 0));
          break;
        case MapScreenInputs.MOVE_DOWN:
          inspectPos = Vector2.apply(pos, new Vector2(0, 1));
          break;
        case MapScreenInputs.MOVE_RIGHT:
          inspectPos = Vector2.apply(pos, new Vector2(1, 0));
          break;
        case MapScreenInputs.MOVE_UP_LEFT:
          inspectPos = Vector2.apply(pos, new Vector2(-1, -1));
          break;
        case MapScreenInputs.MOVE_UP_RIGHT:
          inspectPos = Vector2.apply(pos, new Vector2(1, -1));
          break;
        case MapScreenInputs.MOVE_DOWN_LEFT:
          inspectPos = Vector2.apply(pos, new Vector2(-1, 1));
          break;
        case MapScreenInputs.MOVE_DOWN_RIGHT:
          inspectPos = Vector2.apply(pos, new Vector2(1, 1));
          break;
        case MapScreenInputs.WAIT:
          inspectPos = pos;
          break;
        default:
          throw new Error('In InspectScreen::inspectAdjacentTile');
      }
      const tile = tiles[inspectPos.y][inspectPos.x];
      this.unHighlightTiles();
      const text = tile.isOccupied ? (<Prop>tile.occupiers[0]).descriptionLong : tile.description; // @TODO this obviously has to exclude the player
      // @TODO it really seems at this point that mutliple entities need to exist on the same tile and that a selection process has to exist like in DF
      // Set the active screen back to the map
      Game.instance.activeScreen = Game.instance.screens[ScreenNames.MAP];
      return [{ text }];
  }

  render () {
    this.highlightTiles();
  }

  highlightTiles () {
    const { pos } = Game.instance.player;
    const { currentFloor } = Game.instance;
    const { floorWidth, floorHeight, tiles } = currentFloor;
    for (let x = pos.x - 1; x <= pos.x + 1; x++) {
      for (let y = pos.y - 1; y <= pos.y + 1; y++) {
        if (currentFloor.inBounds(floorWidth, floorHeight, new Vector2(x, y)) &&
          tiles[y][x].type !== TileTypes.VOID
          ) {
          const selector = Game.instance.screens[ScreenNames.MAP].getTileId(y, x);
          document.getElementById(selector).classList.add('inspect');
        }
      }
    }
  }

  unHighlightTiles () {
    const { pos } = Game.instance.player;
    const { currentFloor } = Game.instance;
    const { floorWidth, floorHeight, tiles } = currentFloor;
    for (let x = pos.x - 1; x <= pos.x + 1; x++) {
      for (let y = pos.y - 1; y <= pos.y + 1; y++) {
        if (currentFloor.inBounds(floorWidth, floorHeight, new Vector2(x, y))) {
          const selector = Game.instance.screens[ScreenNames.MAP].getTileId(y, x);
          document.getElementById(selector).classList.remove('inspect');
        }
      }
    }
  }

}

export default InspectScreen;