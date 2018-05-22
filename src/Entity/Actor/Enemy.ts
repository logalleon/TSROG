import { Actor, ActorOptions, AttackRange } from './Actor';
import { Message, Messenger } from '../../Message/Message';
import { Colors } from '../../Canvas/Color';
import Vector2 from '../../Vector';
import Game from '../../Game';
import { Promise as Bluebird } from 'bluebird';
import { Player } from './Player';

const { colorize } = Messenger;

const MASSIVE_DAMAGE_THRESHOLD: number = .30;

interface EnemyOptions {
  actorOptions: ActorOptions,
  enemyType: IEnemyType,
  name: string,
  cr: number
}

interface IEnemyType {
  creatureType: string,
  variant: string | null,
  descriptor: string | null
}

class Enemy extends Actor {

  public isInteractive = true;
  public isEnemy = true;

  public name: string;
  public enemyType: IEnemyType;
  public cr: number;

  public massiveDamageThreshold: number;
  public attackRange: AttackRange = AttackRange.MELEE;

  private path: Vector2[];
  
  constructor (options: EnemyOptions) {
    super(options.actorOptions);
    for (let key in options) {
      if (key !== 'actorOptions') {
        this[key] = options[key];
      }
    }
    this.massiveDamageThreshold = Math.ceil(this.hp * MASSIVE_DAMAGE_THRESHOLD);
  }

  act ():Message[] | null {
    const { player } = Game.instance;
    if (!player.hasMoved) {
      // If the player hasn't moved but has attacked or used a potion / scroll, attack
      if (this.inRange()) {
        return this.targetAndAttemptAttackPlayer(player);
      // If the player hasn't moved but is still too far away, attempt to move closer
      } else {
        this.path = this.getUpdatedPath();
        const nextPos: Vector2 = this.path[this.path.length - 2];
        this.move(nextPos);
        return [];
      }
    // Always update the path if the player has moved
    } else {
      this.path = this.getUpdatedPath();
      // The player has moved into range
      if (this.inRange()) {
        return this.targetAndAttemptAttackPlayer(player);
      // The player is still too far away
      } else {
        const nextPos: Vector2 = this.path[this.path.length - 2];
        this.move(nextPos);
        return [];
      }
    }
  }

  targetAndAttemptAttackPlayer (player: Player): Message[] {
    if (this.attemptAttack(player)) {
      const damage = this.attack(player);
      return [<Message>{
        text: `
          The ${this.formattedName()} attacks you for 
          ${colorize(String(damage), Colors.DAMAGE_DEFAULT)} damage.
            `
      }]
    } else {
      return [<Message>{
        text: `The ${this.formattedName()} misses you.`
      }]
    }
  }

  inRange (): boolean {
    return this.path.length <= this.attackRange + 1;
  }

  /**
   * @override
   * @param destination
   */
  move (destination: Vector2): void {
    // Update the tile references to the enemy
    Game.instance.gameMap.updateEnemyPosition(this.pos, destination, this);
    // Update the open / closed tiles for pathfinding
    Game.instance.gameMap.updateEasystarTiles();
    super.move(destination);
  }

  update (): Message[] | null {
    if (this.isDead()) {
      // Set the flag for this object to be removed from game.activeEnemies
      this.isActive = false;
      return [<Message>{
        text: colorize(`The ${this.formattedName()} has perished.`, Colors.DEATH_DEFAULT)
      }];
    } else {
      return [];
    }
  }

  formattedName (): string {
    const { descriptor, variant } = this.enemyType;
    const { name } = this;
    return `${descriptor}
    ${variant ? ` variant ` : ''}
    ${name}`;
  }

  formattedChar (): string {
    const { char, color } = this;
    return `&lt;${colorize(char, color)}&gt;`;
  }

  getUpdatedPath (): Vector2[] {
    const { player, gameMap } = Game.instance;
    const { easystar } = gameMap;
    // Unset self
    gameMap.setTileToOpen(this.pos);

    // Calculate the path
    let path = gameMap.getPath(player.pos, this.pos);

    // Set self
    gameMap.setTileToClosed(this.pos);

    return(path);
  }

}
export { Enemy, IEnemyType, EnemyOptions };