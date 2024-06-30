import { Ability } from './abilities';
import { Matchup, Types, matchupTable, hasKey } from './types';
import { LevRate } from './lev-rate';
import { Status } from './status';
import { Item } from './item';
import { Attack, Attacks, attackTable } from './attack';
import { Stats, BaseStats } from './stats';
// import { BaseColors} from './colors'

const enum BaseColors {
  RED = 360,
  PINK = 315,
  PURPLE = 270,
  BLUE = 225,
  TEAL = 180,
  GREEN = 135,
  LIME = 90,
  ORANGE = 45,
}

export type LearnSet = {
  [key: number]: Attack | Attack[];
};

export type Defend = {
  resistances: Types[];
  weaknesses: Types[];
  immunities: Types[];
};

export interface Monster {
  name: MonsterNamesKeys;
  types: Types[];
  stats: BaseStats;
  learnSet: LearnSet;
  desc: string;
  height: string;
  weight: number;
  gender: ['Male' | 'Female', undefined] | ['Male', 'Female'];
  genderRatio: number;
  catchRate: number;
  eggGroups: string; //! MAKE EGG GROUPS ENUM
  baseExpYield: number;
  levelingRate: LevRate;
  dexColor: BaseColors;
  category: string;
  defend: Defend;
  abilities?: Ability[];
  hiddenAbilities?: Ability[];
}

export function getFromLearnSet(base: Monster, level: number): Attack[] {
  let attacks: Attack[] = [];
  let keys = Object.keys(base.learnSet).map((key) => parseInt(key));
  let availAttackKeys = keys.filter((key) => key <= level);
  for (let x = 0; x < 4; x++) {
    let candidateKey =
      base.learnSet[availAttackKeys[availAttackKeys.length - (1 + x)]];
    if (Array.isArray(candidateKey)) {
      attacks.push(...candidateKey);
      x += candidateKey.length - 1;
    } else attacks.push(candidateKey);
  }

  return attacks;
}

export enum MonsterNames {
  Bulbasaur = 1,
  Ivysaur,
  Wartortle,
  Machop,
  Geodude,
}

type MonsterNamesKeys = keyof typeof MonsterNames;

type MonsterTable = {
  [key in MonsterNames]: Monster;
};

export function getMonsterFromTable(idx: number): Monster {
  return monsterTable[idx as MonsterNames];
}

export const monsterTable: MonsterTable = {
  [MonsterNames.Bulbasaur]: {
    name: 'Bulbasaur',
    types: [Types.GRASS, Types.POISON],
    stats: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      Speed: 45,
      Special: 65,
    },
    learnSet: {
      1: [attackTable[Attacks.TACKLE], attackTable[Attacks.GROWL]],
      7: attackTable[Attacks.LEECH_SEED],
      13: attackTable[Attacks.VINE_WHIP],
      20: attackTable[Attacks.POISON_POWDER],
      27: attackTable[Attacks.RAZOR_LEAF],
      34: attackTable[Attacks.GROWTH],
      41: attackTable[Attacks.SLEEP_POWDER],
      48: attackTable[Attacks.SOLAR_BEAM],
    },
    desc: 'There is a plant seed on its back right from the day this Pokemon is born. The seed slowly grows larger.',
    height: `2' 04"`,
    weight: 15.2,
    gender: ['Male', 'Female'],
    genderRatio: 87.5,
    catchRate: 45,
    eggGroups: 'Monster and Grass',
    baseExpYield: 64,
    levelingRate: LevRate.MEDIUM_SLOW,
    dexColor: BaseColors.GREEN,
    category: 'Seed',
    defend: {
      resistances: [],
      weaknesses: [],
      immunities: [],
    },
  },
  [MonsterNames.Ivysaur]: {
    name: 'Ivysaur',
    types: [Types.GRASS, Types.POISON],
    stats: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      Speed: 45,
      Special: 65,
    },
    learnSet: {
      1: [attackTable[Attacks.TACKLE], attackTable[Attacks.GROWL]],
      7: attackTable[Attacks.LEECH_SEED],
      13: attackTable[Attacks.VINE_WHIP],
      20: attackTable[Attacks.POISON_POWDER],
      27: attackTable[Attacks.RAZOR_LEAF],
      34: attackTable[Attacks.GROWTH],
      41: attackTable[Attacks.SLEEP_POWDER],
      48: attackTable[Attacks.SOLAR_BEAM],
    },
    desc: 'There is a plant seed on its back right from the day this Pokemon is born. The seed slowly grows larger.',
    height: `2' 04"`,
    weight: 15.2,
    gender: ['Male', 'Female'],
    genderRatio: 87.5,
    catchRate: 45,
    eggGroups: 'Monster and Grass',
    baseExpYield: 64,
    levelingRate: LevRate.MEDIUM_SLOW,
    dexColor: BaseColors.GREEN,
    category: 'Seed',
    defend: {
      resistances: [],
      weaknesses: [],
      immunities: [],
    },
  },
  [MonsterNames.Wartortle]: {
    name: 'Wartortle',
    types: [Types.GRASS, Types.POISON],
    stats: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      Speed: 45,
      Special: 65,
    },
    learnSet: {
      1: [attackTable[Attacks.TACKLE], attackTable[Attacks.GROWL]],
      7: attackTable[Attacks.LEECH_SEED],
      13: attackTable[Attacks.VINE_WHIP],
      20: attackTable[Attacks.POISON_POWDER],
      27: attackTable[Attacks.RAZOR_LEAF],
      34: attackTable[Attacks.GROWTH],
      41: attackTable[Attacks.SLEEP_POWDER],
      48: attackTable[Attacks.SOLAR_BEAM],
    },
    desc: 'There is a plant seed on its back right from the day this Pokemon is born. The seed slowly grows larger.',
    height: `2' 04"`,
    weight: 15.2,
    gender: ['Male', 'Female'],
    genderRatio: 87.5,
    catchRate: 45,
    eggGroups: 'Monster and Grass',
    baseExpYield: 64,
    levelingRate: LevRate.MEDIUM_SLOW,
    dexColor: BaseColors.GREEN,
    category: 'Seed',
    defend: {
      resistances: [],
      weaknesses: [],
      immunities: [],
    },
  },
  [MonsterNames.Machop]: {
    name: 'Machop',
    types: [Types.GRASS, Types.POISON],
    stats: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      Speed: 45,
      Special: 65,
    },
    learnSet: {
      1: [attackTable[Attacks.TACKLE], attackTable[Attacks.GROWL]],
      7: attackTable[Attacks.LEECH_SEED],
      13: attackTable[Attacks.VINE_WHIP],
      20: attackTable[Attacks.POISON_POWDER],
      27: attackTable[Attacks.RAZOR_LEAF],
      34: attackTable[Attacks.GROWTH],
      41: attackTable[Attacks.SLEEP_POWDER],
      48: attackTable[Attacks.SOLAR_BEAM],
    },
    desc: 'There is a plant seed on its back right from the day this Pokemon is born. The seed slowly grows larger.',
    height: `2' 04"`,
    weight: 15.2,
    gender: ['Male', 'Female'], // redundant since can be derived from gender ratio ??
    genderRatio: 87.5,
    catchRate: 45,
    eggGroups: 'Monster and Grass',
    baseExpYield: 64,
    levelingRate: LevRate.MEDIUM_SLOW,
    dexColor: BaseColors.GREEN,
    category: 'Seed',
    defend: {
      resistances: [],
      weaknesses: [],
      immunities: [],
    },
  },
  [MonsterNames.Geodude]: {
    name: 'Geodude',
    types: [Types.ROCK, Types.GROUND],
    stats: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      Speed: 45,
      Special: 65,
    },
    learnSet: {
      1: [attackTable[Attacks.TACKLE], attackTable[Attacks.GROWL]],
      7: attackTable[Attacks.LEECH_SEED],
      13: attackTable[Attacks.VINE_WHIP],
      20: attackTable[Attacks.POISON_POWDER],
      27: attackTable[Attacks.RAZOR_LEAF],
      34: attackTable[Attacks.GROWTH],
      41: attackTable[Attacks.SLEEP_POWDER],
      48: attackTable[Attacks.SOLAR_BEAM],
    },
    desc: 'There is a plant seed on its back right from the day this Pokemon is born. The seed slowly grows larger.',
    height: `2' 04"`,
    weight: 15.2,
    gender: ['Male', 'Female'],
    genderRatio: 87.5,
    catchRate: 45,
    eggGroups: 'Monster and Grass',
    baseExpYield: 64,
    levelingRate: LevRate.MEDIUM_SLOW,
    dexColor: BaseColors.GREEN,
    category: 'Seed',
    defend: {
      resistances: [],
      weaknesses: [],
      immunities: [],
    },
  },
};

// monsters.forEach((monster) => {
for (let key in monsterTable) {
  let monster = monsterTable[parseInt(key) as MonsterNames];
  monster.types.forEach((type) => {
    monster.defend.weaknesses = monster.defend.weaknesses.concat(
      Object.keys(matchupTable).filter((key) => {
        if (hasKey(matchupTable, key))
          return matchupTable[key].strong.includes(type);
        return false;
      }) as Types[]
    );
    monster.defend.resistances = monster.defend.resistances.concat(
      Object.keys(matchupTable).filter((key) => {
        if (hasKey(matchupTable, key))
          return matchupTable[key].weak.includes(type);
        return false;
      }) as Types[]
    );
    monster.defend.immunities = monster.defend.immunities.concat(
      Object.keys(matchupTable).filter((key) => {
        if (hasKey(matchupTable, key))
          return matchupTable[key].immune.includes(type);
        return false;
      }) as Types[]
    );
  });

  let canceled: Types[] = [];
  monster.defend.weaknesses = [
    ...new Set(
      monster.defend.weaknesses.filter((type) => {
        if (monster.defend.resistances.includes(type)) {
          canceled.push(type);
          return false;
        }
        return true;
      })
    ),
  ];

  monster.defend.resistances = [
    ...new Set(
      monster.defend.resistances.filter((type) => !canceled.includes(type))
    ),
  ];
  //     monster.matchup.strong = monster.matchup.strong.concat(
  //       matchupTable[type].strong
  //     );
  //     monster.matchup.weak = monster.matchup.weak.concat(matchupTable[type].weak);
  //     monster.matchup.immune = monster.matchup.immune.concat(
  //       matchupTable[type].immune
  //     );
  //   });

  //   let canceled: Types[] = [];
  //   monster.matchup.strong = [
  //     ...new Set(
  //       monster.matchup.strong.filter((type) => {
  //         if (monster.matchup.weak.includes(type)) {
  //           canceled.push(type);
  //           return false;
  //         }
  //         return true;
  //       })
  //     ),
  //   ];
  //   monster.matchup.weak = [
  //     ...new Set(monster.matchup.weak.filter((type) => !canceled.includes(type))),
  //   ];
  //   monster.matchup.immune = [...new Set(monster.matchup.immune)];

  //   for (let prop in monster.matchup) {
  //     if (hasKey(monster.matchup, prop))
  //       monster.matchup[prop] = [...new Set(monster.matchup[prop])];
  //   }
}

//  = monsters.map((monster) => {
//   return {
//     base: monster,
//     level: 10,
//     attacks: [],
//     currentStats: {
//       [Stats.HP]: 3,
//       [Stats.ATTACK]: 3,
//       [Stats.DEFENSE]: 3,
//       [Stats.SPECIAL_ATTACK]: 4,
//       [Stats.SPECIAL_DEFENSE]: 4,
//       [Stats.SPEED]: 3,
//     },
//     status: Status.OK,
//   };
// });
