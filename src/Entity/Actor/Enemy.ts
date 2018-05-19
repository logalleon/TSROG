import { Actor, ActorOptions } from './Actor';
import { Message } from '../../Message/Message';
import { Colors } from '../../Canvas/Color';

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

  constructor (options: EnemyOptions) {
    super(options.actorOptions);
    for (let key in options) {
      if (key !== 'actorOptions') {
        this[key] = options[key];
      }
    }
  }

  act (): Message[] | null {
    return [<Message>{
      color: Colors.DEFAULT,
      text: `The ${this.formattedName()} does nothing.`
    }];
  }

  update (): Message[] | null {
    if (this.isDead()) {
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