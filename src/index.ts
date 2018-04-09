import Game from './Game';
import { GameMap, Tile } from './GameMap';
import { Screen } from './Screen';
import * as Input from './Input';
import { clearCanvas, CanvasProps } from './Canvas';
import { Player } from './Player';

import MapScreen from './Screens/MapScreen';
import InventoryScreen from './Screens/InventoryScreen';

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
      [W(),W(),W(),W()],
      [W(),F(),F(),W()],
      [W(),F(),F(),W()],
      [W(),F(),F(),W()],
      [W(),F(),F(),W()],
      [W(),W(),W(),W()]
    ]
  };
  const screens: Screen[] = [
    new MapScreen(),
    new InventoryScreen()
  ];
  const g = new Game(gameMap, screens, canvasProps, ctx);
  // Bind the current game to all screens
  g.screens.forEach((screen) => screen.setGame(g));

  // Adds a player
  const player: Player = {
    posX: 1,
    posY: 1,
    char: '@'
  };
  g.updatePlayerPos(player);
  g.activeScreen.render(g.ctx);
};