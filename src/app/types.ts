export enum Types {
  NORMAL = 'Normal',
  FIGHTING = 'Fighting',
  FLYING = 'Flying',
  POISON = 'Poison',
  GROUND = 'Ground',
  ROCK = 'Rock',
  BUG = 'Bug',
  GHOST = 'Ghost',
  STEEL = 'Steel',
  FIRE = 'Fire',
  WATER = 'Water',
  GRASS = 'Grass',
  ELECTRIC = 'Electric',
  PSYCHIC = 'Psychic',
  ICE = 'Ice',
  DRAGON = 'Dragon',
  DARK = 'Dark',
  FAIRY = 'Fairy',
}

export type Matchup = {
  strong: Types[];
  weak: Types[];
  immune: Types[];
};

type MatchupTable = {
  [key in Types]: Matchup;
};

export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

export const matchupTable: MatchupTable = {
  [Types.NORMAL]: {
    strong: [],
    weak: [Types.ROCK, Types.STEEL],
    immune: [Types.GHOST],
  },
  [Types.FIGHTING]: {
    strong: [Types.NORMAL, Types.ROCK, Types.STEEL, Types.ICE, Types.DARK],
    weak: [Types.FLYING, Types.POISON, Types.BUG, Types.PSYCHIC, Types.FAIRY],
    immune: [Types.GHOST],
  },
  [Types.FLYING]: {
    strong: [Types.FIGHTING, Types.BUG, Types.GRASS],
    weak: [Types.ROCK, Types.STEEL, Types.ELECTRIC],
    immune: [],
  },
  [Types.POISON]: {
    strong: [Types.GRASS, Types.FAIRY],
    weak: [Types.POISON, Types.GROUND, Types.ROCK, Types.GHOST],
    immune: [Types.STEEL],
  },
  [Types.GROUND]: {
    strong: [Types.POISON, Types.ROCK, Types.STEEL, Types.FIRE, Types.ELECTRIC],
    weak: [Types.BUG, Types.GRASS],
    immune: [Types.FLYING],
  },
  [Types.ROCK]: {
    strong: [Types.FLYING, Types.BUG, Types.FIRE, Types.ICE],
    weak: [Types.FIGHTING, Types.GROUND, Types.STEEL],
    immune: [],
  },
  [Types.BUG]: {
    strong: [Types.GRASS, Types.PSYCHIC, Types.DARK],
    weak: [
      Types.FIGHTING,
      Types.FLYING,
      Types.POISON,
      Types.GHOST,
      Types.STEEL,
      Types.FIRE,
      Types.FAIRY,
    ],
    immune: [],
  },
  [Types.GHOST]: {
    strong: [Types.GHOST, Types.PSYCHIC],
    weak: [Types.DARK],
    immune: [Types.NORMAL],
  },
  [Types.STEEL]: {
    strong: [Types.ROCK, Types.ICE, Types.FAIRY],
    weak: [Types.STEEL, Types.FIRE, Types.WATER, Types.ELECTRIC],
    immune: [],
  },
  [Types.FIRE]: {
    strong: [Types.BUG, Types.STEEL, Types.GRASS, Types.ICE],
    weak: [Types.ROCK, Types.FIRE, Types.WATER, Types.DRAGON],
    immune: [],
  },
  [Types.WATER]: {
    strong: [Types.GROUND, Types.ROCK, Types.FIRE],
    weak: [Types.WATER, Types.GRASS, Types.DRAGON],
    immune: [],
  },
  [Types.GRASS]: {
    strong: [Types.GROUND, Types.ROCK, Types.WATER],
    weak: [
      Types.FLYING,
      Types.POISON,
      Types.BUG,
      Types.STEEL,
      Types.FIRE,
      Types.GRASS,
      Types.DRAGON,
    ],
    immune: [],
  },
  [Types.ELECTRIC]: {
    strong: [Types.FLYING, Types.WATER],
    weak: [Types.GRASS, Types.ELECTRIC, Types.DRAGON],
    immune: [Types.GROUND],
  },
  [Types.PSYCHIC]: {
    strong: [Types.FIGHTING, Types.POISON],
    weak: [Types.STEEL, Types.PSYCHIC],
    immune: [Types.DARK],
  },
  [Types.ICE]: {
    strong: [Types.FLYING, Types.GROUND, Types.GRASS, Types.DRAGON],
    weak: [Types.STEEL, Types.FIRE, Types.WATER, Types.ICE],
    immune: [],
  },
  [Types.DRAGON]: {
    strong: [Types.DRAGON],
    weak: [Types.STEEL],
    immune: [Types.FAIRY],
  },
  [Types.DARK]: {
    strong: [Types.GHOST, Types.PSYCHIC],
    weak: [Types.FIGHTING, Types.DARK, Types.FAIRY],
    immune: [],
  },
  [Types.FAIRY]: {
    strong: [Types.FIGHTING, Types.DRAGON, Types.DARK],
    weak: [Types.POISON, Types.STEEL, Types.FIRE],
    immune: [],
  },
};

