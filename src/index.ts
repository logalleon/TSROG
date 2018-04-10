import Game from './Game';
import { GameMap, Tile } from './GameMap';
import { Screen } from './Screen';
import * as Input from './Input';
import { clearCanvas, CanvasProps } from './Canvas';
import { Player } from './Player';

import MapScreen from './Screens/MapScreen';
import InventoryScreen from './Screens/InventoryScreen';
import Vector2 from './Vector';

const height = 240;
const width = 600;
window.onload = () => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
  canvas.style.height = `${height}px`;
  canvas.style.width = `${width}px`;
  // High DPI canvases
  const { devicePixelRatio } = window;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext('2d');
  ctx.scale(devicePixelRatio, devicePixelRatio);

  // Set the global font style
  ctx.font = '14px IBM Plex Mono';
  const canvasProps: CanvasProps = {
    height,
    width
  };
  const F = () => ({
    isPassable: true,
    isOccupied: false,
    description: 'Hard stone floor',
    posX: 0,
    posY: 0,
    char: '.'
  });
  const W = () => ({
    isPassable: false,
    isOccupied: false,
    description: 'A wall',
    posX: 0,
    posY: 0,
    char: 'H'
  });
  const gameMap: GameMap = {
    width: 10,
    height: 10,
    tiles: [
      [W(),W(),W(),W(),W(),W(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),W(),W(),W(),W(),W(),W()],
    ],
    inBounds: (width: number, height: number, v: Vector2) => {
      console.log(this.width);
      console.log(v);
      return v.x >= 0 &&
        v.y >= 0 &&
        v.x < width &&
        v.y < height;
    }
  };
  const screens: Screen[] = [
    new MapScreen(),
    new InventoryScreen()
  ];
    // Adds a player
    const player: Player = {
      pos: new Vector2(1, 1),
      char: '@'
    };
  const g = new Game(gameMap, screens, canvasProps, ctx, player);
  // Bind the current game to all screens
  g.screens.forEach((screen) => screen.setGame(g));

  g.updatePlayerPos(player, player.pos);
  g.activeScreen.render(g.ctx);
};