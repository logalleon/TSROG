import { Actor, ActorOptions } from './Actor';
import { Message, Messenger } from '../../Message/Message';
import { Colors } from '../../Canvas/Color';

const { colorize } = Messenger;

const MASSIVE_DAMAGE_THRESHOLD: number = .30;

interface EnemyOptions {
  actorOptions: ActorOptions,
  enemyType: IEnemyType,
  name: string,
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

  public massiveDamageThreshold: number;

  constructor (options: EnemyOptions) {
    super(options.actorOptions);
    for (let key in options) {
      if (key !== 'actorOptions') {
        this[key] = options[key];
      }
    }
    this.massiveDamageThreshold = Math.ceil(this.hp * MASSIVE_DAMAGE_THRESHOLD);
  }

  act (): Message[] | null {
    return [<Message>{
      color: Colors.DEFAULT,
      text: colorize(`The ${this.formattedName()} does nothing.`, Colors.RED)
    }];
  }

  update (): Message[] | null {
    if (this.isDead()) {
      // Set the flag for this object to be removed from game.activeEnemies
      this.isActive = false;
      return [<Message>{
        color: Colors.RED,
        text: `The ${this.formattedName()} has perished.`
      }];
    } else {
      return null;
    }
  }

  formattedName (): string {
    const { descriptor, variant } = this.enemyType;
    const { name } = this;
    return `${descriptor} ${variant ? variant + ' ' : ''}${name}`;
  }

}
export { Enemy, IEnemyType, EnemyOptions };