import Game from './Game';
import { Screen, ScreenNames } from './Screen/Screen';
import * as Input from './Input';
import { clearCanvas, CanvasProps, setupCanvas } from './Canvas/Canvas';
import { Player, PlayerOptions, Pickup, InventoryItems, EquipmentSlots } from './Entity/Actor/Player';
import Vector2 from './Vector';
import { fontOptions } from './Canvas/Canvas';
import { ActorOptions } from './Entity/Actor/Actor';
import { Color, Colors } from './Canvas/Color';
import { Enemy, EnemyOptions } from './Entity/Actor/Enemy';
import { EnemySpawner } from './Entity/Actor/EnemySpawner';
import { CreatureTypes, Variations, defaultVariations } from './Entity/Actor/Enemy.data';
import { StatusMenu } from './UI/StatusMenu';
import { Panel } from './Message/Messenger';
import { PickupProp } from './Entity/Prop/Prop';
import { Weapon } from './Entity/Prop/Weapon/Weapon';
import { BASE_REGEN, BASE_LOS } from './Entity/Actor/config';

const height = 240;
const width = 600;

window.onload = () => {
  const el = document.getElementById('messages');
  const bottomEl = document.getElementById('bottomMessage');

  // Adds a player TEST DATAAAAAa
  const actorOptions: ActorOptions = {
    pos: new Vector2(1, 1),
    char: '@',
    isActive: true,
    color: new Color({ html: 'rebeccapurple' }),
    hp: 10,
    ac: 10,
    damage: '1d4',
    cth: 0
  }
  const options: PlayerOptions = {
    actorOptions,
    level: 1,
    maxHp: 10,
    hpRegen: BASE_REGEN,
    los: BASE_LOS
  };
  
  const player: Player = new Player(options);
  const g = new Game(player);

  // For debugging
  (<any>window).game = g;
};