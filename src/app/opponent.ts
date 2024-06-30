import { ActiveMonster, IActiveMonster } from './active-monster';
import { Item } from './item';
import { MonsterNames } from './monster';
import { NonVolStatus } from './status';

export const enum TrainerMovement {
  L_STATIC,
  R_STATIC,
  F_STATIC,
  B_STATIC,
  L_SPIN, // 360 CCW
  R_SPIN, // 360 CW
  LH_SPIN, // 180 CCW from left
  RH_SPIN, // 180 CW from right
  FH_SPIN, // 180 CW from front
  BH_SPIN, // 180 CW from back
  LF_SPIN, // left-front facing
  RF_SPIN, // right-front facing
  LB_SPIN, // left-back facing
  RB_SPIN, // right-back facing
  CUSTOM, // ranges and more dynamic movement
}

export const enum TrainerTypes {
  HIKER = 'Hiker',
}

export const enum Trainers {
  Dave,
}

type TrainerNames = keyof typeof Trainers;

export type TrainerPrompts = {
  preBattle?: string;
  battleStart?: string;
  victory?: string;
  defeat?: string;
  postBattle?: string;
};

export type Coordinates = {
  X: number;
  Y: number;
};

export interface IPlayer {
  bag: Item[];
  team: IActiveMonster[];
  chosen: number; // currently battling monster
  getChosenMonster(): IActiveMonster;
  numAbleMonsters(): number;
}

export interface ITrainer extends IPlayer {
  name: string;
  type: TrainerTypes;
  prompts: TrainerPrompts;
  movement: TrainerMovement;
  baseCoords: Coordinates;
}

export class Player implements IPlayer {
  bag: Item[];
  team: IActiveMonster[];
  chosen: number = 0;

  constructor(bag: Item[], team: IActiveMonster[]) {
    this.bag = bag;
    this.team = team;
  }

  getChosenMonster(): IActiveMonster {
      return this.team[this.chosen];
  }

  numAbleMonsters(): number {
    return this.team.filter(
      (monster) => monster.status.nonVStatus !== NonVolStatus.FNT
    ).length;
  }
}

export class Trainer extends Player implements ITrainer {
  name: TrainerNames;
  type: TrainerTypes;
  prompts: TrainerPrompts;
  movement: TrainerMovement;
  baseCoords: Coordinates;

  constructor(
    name: TrainerNames,
    type: TrainerTypes,
    prompts: TrainerPrompts,
    movement: TrainerMovement,
    baseCoords: Coordinates,
    bag: Item[],
    team: IActiveMonster[]
  ) {
    super(bag, team);
    this.name = name;
    this.type = type;
    this.prompts = prompts;
    this.movement = movement;
    this.baseCoords = baseCoords;
  }
}

type TrainerTable = {
  [key in Trainers]: ITrainer;
};

export const trainerTable: TrainerTable = {
  [Trainers.Dave]: new Trainer(
    'Dave',
    TrainerTypes.HIKER,
    {},
    TrainerMovement.L_STATIC,
    { X: 0, Y: 0 },
    [],
    [
      new ActiveMonster(MonsterNames.Machop, 15),
      new ActiveMonster(MonsterNames.Geodude, 15),
    ]
  ),
};
