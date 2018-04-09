import Game from './Game';
import { GameMap } from './GameMap';
import { Screen } from './Screen';
import * as Input from './Input';
import { clearCanvas, CanvasProps } from './Canvas';

import MapScreen from './Screens/MapScreen';
import InventoryScreen from './Screens/InventoryScreen';

const height = 600;
const width = 800;
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
  const gameMap: GameMap = {
    width: 10,
    height: 10,
    tiles: []
  };
  const screens: Screen[] = [
    new MapScreen(),
    new InventoryScreen()
  ];
  const g = new Game(gameMap, screens, canvasProps, ctx);
  // Bind the current game to all screens
  g.screens.forEach((screen) => screen.setGame(g));
  g.activeScreen.render(g.ctx);
};