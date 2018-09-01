import { STARTING_HUNGER } from "../config";

enum HungerLevels {
  OVER_FULL = 'over full',
  FULL = 'full',
  CONTENT = 'content',
  HUNGRY = 'hungry',
  VERY_HUNGRY = 'very hungry',
  STARVING = 'starving'
}

interface IHunger { // for battle
  level: HungerLevels,
  hunger: number,
  scale: number[]
  update(): void
}

class Hunger implements IHunger {

  public level: HungerLevels;
  public hunger: number;
  public scale: number[] = [500, 400, 300, 200, 100]

  constructor () {
    this.hunger = STARTING_HUNGER
    this.update();
  }

  update (): void {
    this.hunger--;
    if (this.hunger >= this.scale[0]) {
      this.level = HungerLevels.OVER_FULL;
    } else if (this.hunger > this.scale[1]) {
      this.level = HungerLevels.FULL;
    } else if (this.hunger > this.scale[2]) {
      this.level = HungerLevels.CONTENT;
    } else if (this.hunger > this.scale[3]) {
      this.level = HungerLevels.HUNGRY;
    } else if (this.hunger > this.scale[4]) {
      this.level = HungerLevels.VERY_HUNGRY;
    } else {
      this.level = HungerLevels.STARVING;
    }
  }

  eat (amount: number): void {
    this.hunger += amount;
  }

}

export { Hunger, HungerLevels }