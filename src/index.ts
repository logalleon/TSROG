import Game from './Game';
import { GameMap, Tile } from './GameMap';
import { Screen, ScreenNames } from './Screen/Screen';
import * as Input from './Input';
import { clearCanvas, CanvasProps, setupCanvas } from './Canvas/Canvas';
import { Player, PlayerOptions, Pickup, InventoryItems, EquipmentSlots } from './Entity/Actor/Player';
import MapScreen from './Screen/MapScreen';
import InventoryScreen from './Screen/InventoryScreen';
import Vector2 from './Vector';
import { fontOptions } from './Canvas/Canvas';
import { ActorOptions } from './Entity/Actor/Actor';
import { Armor, ArmorOptions } from './Entity/Prop/Armor';
import { PropOptions } from './Entity/Prop/Prop';
import { Quality } from './Entity/Prop/Prop.data';
import InventoryItemScreen from './Screen/InventoryItemScreen';
import CommandScreen from './Screen/CommandScreen';
import { Color } from './Canvas/Color';
import { Enemy } from './Entity/Actor/Enemy';

const height = 240;
const width = 600;
window.onload = () => {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
  const ctx: CanvasRenderingContext2D = setupCanvas(canvas, height, width);
  const canvasProps: CanvasProps = {
    height,
    width
  };
  const el = document.getElementById('messages');
  const bottomEl = document.getElementById('bottomMessage');

  // TEST DATA ///////////////////////////////////////
  const F = () => ({
    isPassable: true,
    isOccupied: false,
    description: 'Hard stone floor',
    posX: 0,
    posY: 0,
    char: '.',
    color: new Color({ hex: fontOptions.fontColor })
  });
  const W = () => ({
    isPassable: false,
    isOccupied: false,
    description: 'A wall',
    posX: 0,
    posY: 0,
    char: '\u2592',
    color: new Color({ hex: '#CCB69B' })
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

  // END TEST DATA

  const screens: Screen[] = [
    new MapScreen(),
    new InventoryScreen(),
    new InventoryItemScreen(ScreenNames.AMULET, InventoryItems.AMULETS),
    new InventoryItemScreen(ScreenNames.ARMOR, InventoryItems.ARMOR),
    new InventoryItemScreen(ScreenNames.FOOD, InventoryItems.FOOD),
    new InventoryItemScreen(ScreenNames.KEYS, InventoryItems.KEYs),
    new InventoryItemScreen(ScreenNames.POTIONS, InventoryItems.POTIONS),
    new InventoryItemScreen(ScreenNames.RING, InventoryItems.RINGS),
    new InventoryItemScreen(ScreenNames.SCROLL, InventoryItems.SCROLLS),
    new InventoryItemScreen(ScreenNames.WEAPON, InventoryItems.WEAPONS),
    new CommandScreen()
  ];
  // Adds a player TEST DATAAAAAa
  const actorOptions: ActorOptions = {
    pos: new Vector2(1, 1),
    char: '@',
    isActive: true,
    color: new Color({ hex: '#ff3354' }),
    hp: 17,
    ac: 10,
    damage: '1d4',
    cth: 0
  }
  const options: PlayerOptions = {
    actorOptions
  };
  
  const player: Player = new Player(options);

  // Some test equipment for the player
  const armorPropOptions: PropOptions = {
    isActive: true,
    color: new Color({ hex: '#ff00ff' }),
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
    color: new Color({ hex: '#ff00ff' }),
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
  const chainMail = new Armor(armorOptions1);

  // END TEST DATA ////////////////////

  const g = new Game(gameMap, screens, canvasProps, ctx, player, el, bottomEl);
  // Bind the current game to all screens
  g.screens.forEach((screen) => screen.setGame(g));

  // TESSSSSSSSSSST DATA
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

  const aops: ActorOptions = {
    pos: new Vector2(2, 4),
    isActive: true,
    color: new Color({ hex: '#3300ff'}),
    hp: 5,
    ac: 10,
    char: 'L',
    damage: '1d6',
    cth: 5
  };

  const e = new Enemy(aops);
  g.gameMap.tiles[e.pos.y][e.pos.x].isOccupied = true;
  g.gameMap.tiles[e.pos.y][e.pos.x].occupiers = [e];

  

  // END TEST DATA

  g.activeScreen.render(g.ctx);
  window.game = g;
};