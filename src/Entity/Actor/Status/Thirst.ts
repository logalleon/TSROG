import { STARTING_THIRST } from "../config";

enum ThirstLevels {
  BURSTING = 'bursting',
  VERY_HYDRATED = 'very hydrated',
  NOT_THIRSTY = 'not thirsty',
  THIRSTY = 'thirsty',
  VERY_THIRSTY = 'very thirsty',
  PARCHED = 'parched'
}

interface IThirst { // for battle
  level: ThirstLevels,
  thirst: number,
  scale: number[]
  update(): void
}

class Thirst implements IThirst {

  public level: ThirstLevels;
  public thirst: number;
  public scale: number[] = [500, 400, 300, 200, 100]

  constructor () {
    this.thirst = STARTING_THIRST
    this.update();
  }

  update (): void {
    this.thirst--;
    if (this.thirst >= this.scale[0]) {
      this.level = ThirstLevels.BURSTING;
    } else if (this.thirst > this.scale[1]) {
      this.level = ThirstLevels.VERY_HYDRATED;
    } else if (this.thirst > this.scale[2]) {
      this.level = ThirstLevels.NOT_THIRSTY;
    } else if (this.thirst > this.scale[3]) {
      this.level = ThirstLevels.THIRSTY;
    } else if (this.thirst > this.scale[4]) {
      this.level = ThirstLevels.VERY_THIRSTY;
    } else {
      this.level = ThirstLevels.PARCHED;
    }
  }

  eat (amount: number): void {
    this.thirst += amount;
  }

}

export { Thirst, ThirstLevels }