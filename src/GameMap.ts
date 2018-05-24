import Vector2 from './Vector';
import { Color } from './Canvas/Color';
import Game from './Game';
import { js as EasyStar } from '../custom_modules/easystarjs';
import { Promise } from 'bluebird';
import { Enemy } from './Entity/Actor/Enemy';

interface GameMapOptions {
  tiles: Tile[][]
}

// @TODO this should probably be a class where the tile can add, remove, and check the status of occupiers
interface Tile {
  isPassable: boolean,
  isOccupied: boolean,
  description: string,
  posX: number,
  posY: number,
  char: string,
  color: Color
  occupiers?: any[]
}

class GameMap {

  public height: number;
  public width: number;
  public tiles: Tile[][];

  public easystarTiles: number[][];
  public easystar: EasyStar;

  private easystarOpenTile: number = 0;
  private easystarClosedTile: number = 1;

  public game: Game;

  constructor (options: GameMapOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
    this.height = this.tiles.length;
    this.width = this.tiles[0].length;
  }

  inBounds (width: number, height: number, v: Vector2): boolean {
    return v.x >= 0 &&
      v.y >= 0 &&
      v.x < width &&
      v.y < height;
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
    let { occupiers } = this.tiles[y][x];
    // Bring out the dead
    occupiers = occupiers.filter(occupier => !occupier.isDead());
    this.tiles[y][x].occupiers = occupiers;
    this.tiles[y][x].isOccupied = Boolean(occupiers.length);
  }

  generateEasystarTiles (): number[][] {
    let easystarTiles = [];
    for (let y = 0; y < this.tiles.length; y++) {
      easystarTiles[y] = [];
      for (let x = 0; x < this.tiles[y].length; x++) {
        const currentTile = this.tiles[y][x];
        easystarTiles[y].push(
          currentTile.isPassable && !currentTile.isOccupied ?
          this.easystarOpenTile :
          this.easystarClosedTile
        );
      }
    }
    // Set the player's location to open so the AI can "move" there
    const { x, y } = this.game.player.pos;
    easystarTiles[y][x] = this.easystarOpenTile;
    return easystarTiles;
  }

  updateEasystarTiles (): void {
    this.easystarTiles = this.generateEasystarTiles();
    this.easystar.setGrid(this.easystarTiles);
  }

  setGame (game: Game): void {
    this.game = game;
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
    this.tiles[y][x].occupiers = this.tiles[y][x].occupiers.filter(occupier => !occupier.isEnemy);
    this.tiles[y][x].isOccupied = false;
    // Add to the next position
    Array.isArray(this.tiles[newPos.y][newPos.x].occupiers) ? 
    this.tiles[newPos.y][newPos.x].occupiers.push(enemy) :
    this.tiles[newPos.y][newPos.x].occupiers = [enemy];
    this.tiles[newPos.y][newPos.x].isOccupied = true;
  }

}



export { GameMap, GameMapOptions, Tile };