import Vector2 from "../Vector";
import Game from "../Game";
import { TileTypes } from "./Tile";
import MapScreen, { MapScreenInputs } from "../Screen/Map/MapScreen";
import { ScreenNames } from "../Screen/Screen";
import { distance } from "../Geometry";
import { Random } from "ossuary";

class RaycastVisibility {

  private mapWidth: number;
  private mapHeight: number;

  constructor (mapWidth: number, mapHeight: number) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  updateMapSize (width: number, height: number): void {
    this.mapWidth = width;
    this.mapHeight = height;
  }

  resetLos (origin: Vector2, losRange?: number) {
    const { tiles } = Game.instance.currentFloor;
    // const left = Random.clamp(origin.x - losRange, 0, this.mapWidth);
    // const right = Random.clamp(origin.x + losRange, 0, this.mapWidth);
    // const top = Random.clamp(origin.y - losRange - 1, 0, this.mapHeight);
    // const bottom = Random.clamp(origin.y + losRange + 1, 0, this.mapHeight); @todo this is buggy
    for (let y = 0; y < Game.instance.currentFloor.floorHeight; y++) {
      for (let x = 0; x < Game.instance.currentFloor.floorWidth; x++) {
        tiles[y][x].isVisible = false;
        // @TODO the map screen really should have its own refernce
        (Game.instance.screenManager.screens[ScreenNames.MAP] as MapScreen).redrawTile(new Vector2(x, y));
      }
    }
  }

  compute (origin: Vector2, losRange?: number) {
    const { tiles } = Game.instance.currentFloor;
    // The origin is always visible
    tiles[origin.y][origin.x].isVisible = true;
    // Redraw the origin tile
    (Game.instance.screenManager.screens[ScreenNames.MAP] as MapScreen).redrawTile(origin);
    // Calculate clipping for the x coordinate
    const left = Random.clamp(origin.x - losRange, 0, this.mapWidth);
    const right = Random.clamp(origin.x + losRange, 0, this.mapWidth);
    // Calculate clipping for the y coordinate
    const top = Random.clamp(origin.y - losRange - 1, 0, this.mapHeight);
    const bottom = Random.clamp(origin.y + losRange + 1, 0, this.mapHeight);
    for (let x = left; x < right; x++) {
      this.traceLine(origin, x, top, losRange);
      this.traceLine(origin, x, bottom - 1, losRange);
    }
    for (let y = top + 1; y < bottom - 1; y++) {
      this.traceLine(origin, left, y, losRange);
      this.traceLine(origin, right - 1, y, losRange);
    }
  }

  traceLine (origin: Vector2, x2: number, y2: number, losRange?: number) {
    const { tiles } = Game.instance.currentFloor;
    const xDelta = x2 - origin.x;
    const yDelta = y2 - origin.y;
    let xLen = Math.abs(xDelta);
    let yLen = Math.abs(yDelta);
    let xInc = (<any>Math).sign(xDelta); // @TODO hack hack hack
    let yInc = (<any>Math).sign(yDelta) << 16; // @TODO wat understand this
    let index = (origin.y << 16) + origin.x;
    // Raytrace on the longest axis or swap
    if (xLen < yLen) {
      let t = xLen;
      let u = xInc;
      xLen = yLen;
      yLen = t;
      xInc = yInc;
      yInc = u;
    }
    let errorInc = yLen * 2;
    let error = -xLen;
    let errorReset = xLen * 2;
    // Skip the origin of the ray as this is the same as the origin above (always visible)
    while (--xLen >= 0) {
      index += xInc; // advance down the long axis (could be x or y as swapped above)
      error += errorInc;
      if (error > 0) {
        error -= errorReset;
        index += yInc;
      }

      let x = index & 0xFFFF; // @TODO wtf is going on here look up the algorithm
      let y = index >> 16;

      // Range check to immediately stop
      if (Math.ceil(distance(origin, new Vector2(x, y))) > losRange) {
        break;
      }
      tiles[y][x].isVisible = true;
      if (tiles[y][x].type !== TileTypes.VOID) { // @TODO figure out why the tracings is sometimes exposing void tiles in the first place
        tiles[y][x].hasVisited = true;
      }

      // Redraw the tile to expose it
      (Game.instance.screenManager.screens[ScreenNames.MAP] as MapScreen).redrawTile(new Vector2(x, y));

      // Stop looping after exposing a los-blocking tile
      if (tiles[y][x].blocksVisibility) {
        break;
      }
    }
  }

}

export default RaycastVisibility;