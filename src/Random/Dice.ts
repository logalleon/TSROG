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

const weightedPluck = (arr: string[]): string => {
  const scalars = {};
  const items = [].concat(arr);
  let scaleMax = 0;
  let min = 1;
  let max = 1;
  items.forEach((el, i) => {
    if (el.match(/\^/g)) {
      const [str, scalar] = el.split('^');
      scalars[i] = Number(scalar);
      items[i] = str;
    }
    const scalar = scalars[i];
    min = scalar < min ? scalar : min;
    max = scalar > max ? scalar : max;
  });
  const scale = max / min;
  items.forEach((el, i) => {
    scaleMax += scale * (scalars[i] ? scalars[i] : 1);
  });
  let weightedSelection;
  let currentIndex = 0;
  const atIndex = randomInt(0, scaleMax);
  for (let i = 0; i < items.length; i++) {
    currentIndex += scale * (scalars[i] ? scalars[i] : 1);
    if (atIndex <= currentIndex) {
      weightedSelection = items[i];
      break;
    }
  }
  return weightedSelection;
}

export { rollDice, StandardDice, randomInt, pluck, Range, clamp };