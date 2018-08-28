import Game from './Game';
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
import { Weapon, WeaponOptions } from './Entity/Prop/Weapon';
import { PropOptions } from './Entity/Prop/Prop';
import { Quality, Damage, DamageType, Material, MaterialType, MaterialSubtype } from './Entity/Prop/Prop.data';
import InventoryItemScreen from './Screen/InventoryItemScreen';
import CommandScreen from './Screen/CommandScreen';
import { Color, Colors } from './Canvas/Color';
import { Enemy, EnemyOptions } from './Entity/Actor/Enemy';
import { StandardDice } from './Random/Dice';
import { EnemySpawner } from './Entity/Actor/EnemySpawner';
import { CreatureTypes, Variations, defaultVariations } from './Entity/Actor/Enemy.data';
import { StatusMenu } from './UI/StatusMenu';
import HelpScreen from './Screen/HelpScreen';
import UnequipScreen from './Screen/UnequipScreen';
import { Panel } from './Message/Messenger';

const height = 240;
const width = 600;
window.onload = () => {
  const el = document.getElementById('messages');
  const bottomEl = document.getElementById('bottomMessage');

  const screens: Screen[] = [
    new MapScreen(),
    new InventoryScreen(),
    new InventoryItemScreen(ScreenNames.AMULET, InventoryItems.AMULETS),
    new InventoryItemScreen(ScreenNames.ARMOR, InventoryItems.ARMOR),
    new InventoryItemScreen(ScreenNames.FOOD, InventoryItems.FOOD),
    new InventoryItemScreen(ScreenNames.KEYS, InventoryItems.KEYS),
    new InventoryItemScreen(ScreenNames.POTIONS, InventoryItems.POTIONS),
    new InventoryItemScreen(ScreenNames.RING, InventoryItems.RINGS),
    new InventoryItemScreen(ScreenNames.SCROLL, InventoryItems.SCROLLS),
    new InventoryItemScreen(ScreenNames.WEAPON, InventoryItems.WEAPONS),
    new CommandScreen(),
    new HelpScreen(),
    new UnequipScreen(),
  ];
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
    hpRegen: 0.5
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

  const weaponPropOptions: PropOptions = {
    isActive: true,
    color: new Color({ hex: '#0033bb' }),
    char: 'S',
    name: 'Short Sword',
    canBePickedUp: true,
    description: 'A short sword'
  }

  const baseDamage: Damage = {
    damage: StandardDice.d6,
    type: DamageType.SLASH
  };

  const material: Material = {
    type: MaterialType.METAL,
    subtype: MaterialSubtype.BRASS
  };

  const weaponOptions: WeaponOptions = {
    baseDamage,
    material,
    quality: Quality.FAIR,
    propOptions: weaponPropOptions
  };

  const sword = new Weapon(weaponOptions);


  // END TEST DATA ////////////////////

  const g = new Game(screens, player);
  // Bind the current game to all screens
  g.screens.forEach((screen) => screen.setGame(g));

  // TESSSSSSSSSSST DATA
  let pickup: Pickup = {
    type: InventoryItems.ARMOR,
    item: sword
  }
  player.addToInventory(pickup);
  player.attemptToEquip({ index: 0, type: InventoryItems.ARMOR }, EquipmentSlots.ARMOR);
  pickup = {
    type: InventoryItems.ARMOR,
    item: chainMail
  };
  player.addToInventory(pickup);
  pickup = {
    type: InventoryItems.WEAPONS,
    item: sword
  };
  player.addToInventory(pickup);
  player.attemptToEquip({ index: 0, type: InventoryItems.WEAPONS }, EquipmentSlots.WEAPON);

  g.activeScreen.render([]);
  g.messenger.writeToPanel(Panel.PANEL_1, [{ text: 'This is the map screen', color: Colors.DEFAULT }]);

  (<any>window).game = g;
};