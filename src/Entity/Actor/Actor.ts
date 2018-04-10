import Entity from '../Entity';
import Vector2 from '../../Vector';
import Color from '../../Canvas/Color';
import { rollDice, StandardDice } from '../../Random/Dice';

interface ActorOptions {
  pos: Vector2,
  isActive: boolean,
  color: Color,
  char: string,
  hp: number,
  ac: number,
  damage: string,
  cth: number,
  canMove?: boolean,
  canAttack?: boolean
}

class Actor implements Entity {

  public pos: Vector2;
  public isActive: boolean;
  public color: Color;
  public char: string;

  public hp: number;
  public ac: number;

  public damage: string;
  public cth: number;

  public canMove: boolean = true;
  public canAttack: boolean = true;

  constructor (options: ActorOptions) {
    for (let key in options) {
      this[key] = options[key];
    }
  }

  move (destination: Vector2) {
    if (this.canMove) {
      this.pos = destination;
    }
  }

  attemptAttack (target: Actor): boolean {
    const dice = `${StandardDice.d20}+${this.cth}`;
    return (rollDice(dice) >= target.ac);
  }

  attack (target: Actor): number {
    const damage = rollDice(this.damage);
    target.hp -= damage;
    return damage;
  }

  isDead (): boolean {
    return this.hp <= 0;
  }

}

export { Actor, ActorOptions };