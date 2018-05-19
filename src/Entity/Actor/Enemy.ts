import { Actor, ActorOptions } from './Actor';

class Enemy extends Actor {

  public isInteractive = true;
  public isEnemy = true;

  constructor (options: ActorOptions) {
    super(options);
  }

}
export { Enemy };