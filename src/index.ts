import Game from './Game';
import { GameMap, Tile } from './GameMap';
import { Screen } from './Screen';
import * as Input from './Input';
import { clearCanvas, CanvasProps, setupCanvas } from './Canvas/Canvas';
import { Player, PlayerOptions, Pickup, InventoryItems, EquipmentSlots } from './Entity/Actor/Player';
import MapScreen from './Screens/MapScreen';
import InventoryScreen from './Screens/InventoryScreen';
import Vector2 from './Vector';
import { fontOptions } from './Canvas/Canvas';
import { ActorOptions } from './Entity/Actor/Actor';
import { Armor, ArmorOptions } from './Entity/Prop/Armor';
import { PropOptions, Quality } from './Entity/Prop/Prop';

const height = 240;
const width = 600;
window.onload = () => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
  const ctx: CanvasRenderingContext2D = setupCanvas(canvas, height, width);
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
    char: '.',
    color: { hex: fontOptions.fontColor }
  });
  const W = () => ({
    isPassable: false,
    isOccupied: false,
    description: 'A wall',
    posX: 0,
    posY: 0,
    char: '\u2592',
    color: { hex: '#CCB69B' }
  });
  const gameMap = new GameMap({
    tiles: [
      [W(),W(),W(),W(),W(),W(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),F(),F(),F(),F(),F(),W()],
      [W(),W(),W(),W(),W(),W(),W()],
    ]
  });
  const screens: Screen[] = [
    new MapScreen(),
    new InventoryScreen()
  ];
  // Adds a player
  const actorOptions: ActorOptions = {
    pos: new Vector2(1, 1),
    char: '@',
    isActive: true,
    color: { hex: '#ff3354' },
    hp: 17,
    ac: 10,
    damage: '1d4',
    cth: 0
  }
  const options: PlayerOptions = {
    actorOptions
  }
  
  const player: Player = new Player(options);

  // Some test equipment for the player
  const armorPropOptions: PropOptions = {
    isActive: true,
    color: { hex: '#ff00ff' },
    char: 'A',
    name: 'Plate Mail',
    canBePickedUp: true,
    description: 'A set of plate mail'
  };
  const armorOptions: ArmorOptions = {
    modifier: 4,
    material: 'Iron',
    quality: Quality.FAIR,
    propOptions: armorPropOptions
  }
  const plateMail = new Armor(armorOptions);

  const armorPropOptions1: PropOptions = {
    isActive: true,
    color: { hex: '#ff00ff' },
    char: 'A',
    name: 'Chain Mail',
    canBePickedUp: true,
    description: 'A set of chain mail'
  };
  const armorOptions1: ArmorOptions = {
    modifier: 2,
    material: 'Tin',
    quality: Quality.POOR,
    propOptions: armorPropOptions1
  };
  const chainMail = new Armor(armorOptions1)

  const g = new Game(gameMap, screens, canvasProps, ctx, player);
  // Bind the current game to all screens
  g.screens.forEach((screen) => screen.setGame(g));

  let pickup: Pickup = {
    type: InventoryItems.ARMOR,
    item: plateMail
  }
  player.addToInventory(pickup);
  player.attemptToEquip({ index: 0, type: InventoryItems.ARMOR }, EquipmentSlots.ARMOR);
  pickup = {
    type: InventoryItems.ARMOR,
    item: chainMail
  };
  player.addToInventory(pickup);
  g.updatePlayerPos(player, player.pos);
  g.activeScreen.render(g.ctx);
};