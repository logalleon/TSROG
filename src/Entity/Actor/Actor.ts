import Entity from '../Entity';
import Vector2 from '../../Vector';
import { Color } from '../../Canvas/Color';
import { Message } from '../../Message/Messenger';
import { Dice } from 'ossuary'
import Game from '../../Game';
import { Promise as Bluebird } from 'bluebird';

interface ActorOptions {
  pos?: Vector2,
  isActive?: boolean,
  color: Color,
  char: string,
  hp: number,
  ac: number,
  damage: string,
  cth?: number,
  canMove?: boolean,
  canAttack?: boolean
}

enum AttackRange {
  MELEE = 1
}

class Actor implements Entity {

  public pos: Vector2;
  public isActive: boolean = false;
  public color: Color;
  public char: string;

  public hp: number;
  public ac: number;

  public damage: string;
  public cth: number = 0;

  public canMove: boolean = true;
  public canAttack: boolean = true;

  constructor (options: ActorOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

  act (): Message[] | null {
    return null;
  }

  // @TODO maybe revisit later
  actAsync (): Promise<Message[] | null> {
    return new Bluebird((resolve) => resolve(null));
  }

  move (destination: Vector2) {
    this.pos = destination;
  }

  attemptAttack (target: Actor): boolean {
    const dice = `${Dice.StandardDice.d20}+${this.cth}`;
    return (Dice.rollDice(dice) >= target.ac);
  }

  attack (target: Actor): number {
    console.log(this.damage);
    const damage = Dice.rollDice(this.damage);
    target.hp -= damage;
    return damage;
  }

  isDead (): boolean {
    return this.hp <= 0;
  }

}

export { Actor, ActorOptions, AttackRange };