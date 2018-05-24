enum StandardDice {
  d2 = 'd2',
  d4 = 'd4',
  d6 = 'd6',
  d8 = 'd8',
  d10 = 'd10',
  d12 = 'd12',
  d20 = 'd20'
}

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const rollDice = (dice: string): number => {
  let roll = 0;
  const [die, bonus] = dice.split('+');
  const [iterations, range] = die.split('d');
  for (let i = 0; i < (iterations ? Number(iterations) : 1); i++) {
    roll += randomInt(1, range);
  }
  return roll + (bonus ? Number(bonus) : 0);
};

const pluck = (arr: Array<any>): any => {
  return arr[randomInt(0, arr.length - 1)];
}

interface Range {
  low: number,
  high: number
}

const clamp = (value: number, low: number, high: number): number => {
  if (value < low) {
    return low;
  }
  if (value > high) {
    return high;
  }
  return value;
}

export { rollDice, StandardDice, randomInt, pluck, Range, clamp };