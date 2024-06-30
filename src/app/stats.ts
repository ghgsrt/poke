export enum Stats {
  HP = 'HP',
  ATTACK = 'Attack',
  DEFENSE = 'Defense',
  SPEED = 'Speed',
  SPECIAL = 'Special',
}

export type BaseStats = {
  [key in Stats]: number;
};

export type StatNames = keyof BaseStats;

// export type IV = {
//     [key in Stats]: number;
// }

// export interface BaseStats extends IV {
//     HP: number;
// }

// export type IVNames = keyof IV;

export const StatStages: { [key: number]: number } = {
  '-6': 0.25,
  '-5': 0.28,
  '-4': 0.33,
  '-3': 0.4,
  '-2': 0.5,
  '-1': 0.66,
  '0': 1,
  '1': 1.5,
  '2': 2,
  '3': 2.5,
  '4': 3,
  '5': 3.5,
  '6': 4,
};

let temp = StatStages['-6'];
