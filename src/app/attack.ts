import { Types } from './types';
import { Status, PassedStatus } from './status';
import { Stats } from './stats';

export const enum Attacks {
  ACID = 'Acid',
  TACKLE = 'Tackle',
  GROWL = 'Growl',
  LEECH_SEED = 'Leech Seed',
  VINE_WHIP = 'Vine Whip',
  POISON_POWDER = 'Poison Powder',
  RAZOR_LEAF = 'Razor Leaf',
  GROWTH = 'Growth',
  SLEEP_POWDER = 'Sleep Powder',
  SOLAR_BEAM = 'Solar Beam',
}

export const enum AttackCategory {
  PHYSICAL,
  SPECIAL,
}

export const enum Targets {
  SELF = 1,
  ENEMY = 1,
  ALL_ENEMIES = 0.75,
  ALL = 0.75,
}

export type StatEffect = {
  stat: Stats;
  amt: number;
};

export interface Attack {
  name: Attacks;
  types: Types[];
  category: AttackCategory;
  pp: number;
  power: number;
  accuracy: number;
  procRate?: number;
  highCrit?: boolean;
  target?: Targets;
  statEffect?: StatEffect;
  applyStatus?: PassedStatus;
  removeStatus?: PassedStatus;
}

export type ActiveAttack = {
  base: Attack;
  pp: number;
};

type AttackTable = {
  [key in Attacks]: Attack;
};

export const attackTable: AttackTable = {
  [Attacks.ACID]: {
    name: Attacks.ACID,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      //TODO target: Targets
      stat: Stats.DEFENSE,
      amt: -1,
    },
  },
  [Attacks.TACKLE]: {
    name: Attacks.TACKLE,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: -1,
    },
  },
  [Attacks.LEECH_SEED]: {
    name: Attacks.LEECH_SEED,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.VINE_WHIP]: {
    name: Attacks.VINE_WHIP,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.POISON_POWDER]: {
    name: Attacks.POISON_POWDER,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.RAZOR_LEAF]: {
    name: Attacks.RAZOR_LEAF,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.GROWTH]: {
    name: Attacks.GROWTH,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.SLEEP_POWDER]: {
    name: Attacks.SLEEP_POWDER,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.SOLAR_BEAM]: {
    name: Attacks.SOLAR_BEAM,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
  [Attacks.GROWL]: {
    name: Attacks.GROWL,
    types: [Types.POISON],
    category: AttackCategory.SPECIAL,
    pp: 30,
    power: 40,
    accuracy: 100,
    procRate: 10,
    target: Targets.ENEMY,
    statEffect: {
      stat: Stats.DEFENSE,
      amt: 1,
    },
  },
};
