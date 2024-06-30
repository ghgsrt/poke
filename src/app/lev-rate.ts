export const enum LevRate {
  SLOW = 1,
  MEDIUM_SLOW,
  MEDIUM_FAST,
  FAST,
  ERRATIC,
  FLUCTUATING,
}

export function getEXPForLevel(rate: LevRate, level: number): number {
  switch (rate) {
    case LevRate.SLOW:
      return (5 * Math.pow(level, 3)) / 4;
    case LevRate.MEDIUM_SLOW:
      return (
        (6 / 5) * Math.pow(level, 3) -
        15 * Math.pow(level, 2) +
        100 * level -
        140
      );
    case LevRate.MEDIUM_FAST:
      return Math.pow(level, 3);
    case LevRate.FAST:
      return (4 * Math.pow(level, 3)) / 5;
    case LevRate.ERRATIC:
      if (level < 50) return (Math.pow(level, 3) * (100 - level)) / 50;
      if (level < 68) return (Math.pow(level, 3) * (150 - level)) / 100;
      if (level < 98)
        return (Math.pow(level, 3) * Math.floor((1911 - 10 * level) / 3)) / 500;
      return (Math.pow(level, 3) * (160 - level)) / 100;
    case LevRate.FLUCTUATING:
      if (level < 15)
        return Math.pow(level, 3) * ((Math.floor((level + 1) / 3) + 24) / 50);
      if (level < 36) return Math.pow(level, 3) * ((level + 14) / 50);
      return Math.pow(level, 3) * ((Math.floor(level / 2) + 32) / 50);
  }
}

export function getEXPForLevelRange(
  rate: LevRate,
  minLevel: number = 0,
  maxLevel: number = 100
): LevelList {
  let exp: Array<number> = [];
  let level = minLevel;
  for (level; level <= maxLevel; level++) exp.push(getEXPForLevel(rate, level));

  return exp as LevelList;
}

// https://stackoverflow.com/a/52490977 ????????????
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;
type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

type LevelList = Tuple<number, 101>; // [0 - 100]
type EXPLookupTable = {
  [key in LevRate]: LevelList;
};

const t0 = performance.now();
export const expTable: EXPLookupTable = {
  [LevRate.SLOW]: getEXPForLevelRange(LevRate.SLOW),
  [LevRate.MEDIUM_SLOW]: getEXPForLevelRange(LevRate.MEDIUM_SLOW),
  [LevRate.MEDIUM_FAST]: getEXPForLevelRange(LevRate.MEDIUM_FAST),
  [LevRate.FAST]: getEXPForLevelRange(LevRate.FAST),
  [LevRate.ERRATIC]: getEXPForLevelRange(LevRate.ERRATIC),
  [LevRate.FLUCTUATING]: getEXPForLevelRange(LevRate.FLUCTUATING),
};
const t1 = performance.now();
console.log('Time to Populate EXP Table (SWITCH): ' + (t1 - t0) + 'ms');

