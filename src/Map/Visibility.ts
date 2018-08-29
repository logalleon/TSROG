import Vector2 from "../Vector";
import Game from "../Game";

class RaycastVisibility {

  private mapWidth: number;
  private mapHeight: number;

  constructor (mapWidth: number, mapHeight: number) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  compute (origin: Vector2, limit?: number) {
    const { tiles } = Game.instance.currentFloor;
    // The origin is always visible
    tiles[origin.y][origin.x].isVisible = true;
    // @TODO calculate the clipping range LOS based on the limit
    for (let x = 0; x < this.mapWidth; x++) {
      this.traceLine(origin, x, 0, limit);
      this.traceLine(origin, x, this.mapHeight - 1, limit);
    }
    for (let y = 0; y < this.mapHeight; y++) {
      this.traceLine(origin, 0, y, limit);
      this.traceLine(origin, this.mapWidth - 1, y, limit);
    }
  }

  traceLine (origin: Vector2, x2: number, y2: number, limit?: number) {
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
      // @TODO do a range check here to see if x, y is out of range from the origin and break;
      tiles[y][x].isVisible = true;
      if (tiles[y][x].blocksVisibility) {
        break;
      }
    }
  }

}

export default RaycastVisibility;