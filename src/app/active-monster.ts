import { NonVolStatus, Status, PassedStatus } from './status';
import { Item } from './item';
import { Attack, ActiveAttack, attackTable, StatEffect } from './attack';
import { Stats, BaseStats, StatNames, StatStages } from './stats';
import {
  Monster,
  MonsterNames,
  monsterTable,
  getFromLearnSet,
} from './monster';
import { hasKey } from './types';
import { expTable } from './lev-rate';
import { Types } from './types';

export interface IActiveMonster {
  base: Monster;
  nickname?: string;
  level: number;
  exp: number; // total exp earned from 0
  attacks: ActiveAttack[];
  IV: BaseStats;
  EV: BaseStats;
  // battleStats: BaseStats;
  battleHealth: number;
  statStages: { [key: string]: number };
  status: Status;
  item?: Item;
  getStatValue(stat: StatNames): number;
  getBattleStatValue(stat: StatNames): number;
  getHPIV(): number;
  getStats(): BaseStats;
  getBattleStats(): BaseStats;
  getTypeEffectiveness(attackTypes: Types[]): number;
  takeDamage(damage: number): void;
  applyStatEffect(effect: StatEffect): void;
  applyStatus(status: PassedStatus): boolean; // returns true if successful
  removeStatus(status: PassedStatus): boolean; // "
}

export class ActiveMonster implements IActiveMonster {
  base: Monster;
  nickname?: string;
  level: number;
  exp: number;
  attacks: ActiveAttack[];
  IV: BaseStats = {
    HP: 0,
    Attack: Math.floor(Math.random() * 16),
    Defense: Math.floor(Math.random() * 16),
    Speed: Math.floor(Math.random() * 16),
    Special: Math.floor(Math.random() * 16),
  };
  EV: BaseStats = {
    HP: 0,
    Attack: 0,
    Defense: 0,
    Speed: 0,
    Special: 0,
  };
  // battleStats: BaseStats;
  battleHealth = 0;
  statStages: { [key: string]: number } = {
    Attack: 0,
    Defense: 0,
    Speed: 0,
    Special: 0,
  };
  status: Status = {
    nonVStatus: NonVolStatus.OK,
    vStatus: [],
    selfStatus: [],
  };
  item?: Item;

  constructor(
    name: MonsterNames,
    level: number,
    nickname?: string,
    attacks?: ActiveAttack[]
  ) {
    this.base = monsterTable[name];
    this.level = level;
    this.exp = expTable[this.base.levelingRate][this.level];
    this.attacks =
      attacks ??
      getFromLearnSet(this.base, this.level)?.map((attack) => {
        return { base: attack, pp: attack?.pp } as ActiveAttack;
      });

    this.IV.HP = this.getHPIV();
    this.battleHealth = this.getStatValue(Stats.HP);

    if (nickname) this.nickname = nickname;
  }

  getStatValue(stat: StatNames): number {
    return Math.min(
      Math.floor(
        (((this.base.stats[stat] + this.IV[stat]) * 2 +
          Math.floor(Math.min(Math.ceil(Math.sqrt(this.EV[stat])), 255) / 4)) *
          this.level) /
          100
      ) + (stat === 'HP' ? this.level + 10 : 5),
      999
    );
  }

  getBattleStatValue(stat: StatNames): number {
    return Math.floor(
      this.getStatValue(stat) * StatStages[this.statStages[stat]]
    );
  }

  getHPIV(): number {
    let HPIV = '';
    for (let stat in this.IV)
      HPIV += this.IV[stat as StatNames].toString(2).slice(-1);

    return parseInt(HPIV, 2);
  }

  getStats(): BaseStats {
    return {
      HP: this.getStatValue(Stats.HP),
      Attack: this.getStatValue(Stats.ATTACK),
      Defense: this.getStatValue(Stats.DEFENSE),
      Speed: this.getStatValue(Stats.SPEED),
      Special: this.getStatValue(Stats.SPECIAL),
    };
  }

  getBattleStats(): BaseStats {
    return {
      HP: this.getStatValue(Stats.HP),
      Attack: this.getBattleStatValue(Stats.ATTACK),
      Defense: this.getBattleStatValue(Stats.DEFENSE),
      Speed: this.getBattleStatValue(Stats.SPEED),
      Special: this.getBattleStatValue(Stats.SPECIAL),
    };
  }

  getTypeEffectiveness(attackTypes: Types[]): number {
    let effectiveness = 1;
    this.base.defend.immunities.forEach((immunity) => {
      if (attackTypes.includes(immunity)) effectiveness = 0;
    });

    if (effectiveness !== 1) return effectiveness;

    this.base.defend.resistances.forEach((resistance) => {
      if (attackTypes.includes(resistance)) effectiveness = 0.5;
    });

    if (effectiveness !== 1) return effectiveness;

    this.base.defend.weaknesses.forEach((weakness) => {
      if (attackTypes.includes(weakness)) effectiveness = 2;
    });

    return effectiveness;
  }

  takeDamage(damage: number): void {
    this.battleHealth -= damage;
    if (this.battleHealth <= 0) {
      this.battleHealth = 0;
      this.status.nonVStatus = NonVolStatus.FNT;
    }
  }

  applyStatEffect(effect: StatEffect): void {
    let temp = this.statStages[effect.stat as string] + effect.amt;
    switch (true) {
      case temp < -6:
        temp = -6;
        break;
      case temp > 6:
        temp = 6;
        break;
    }

    this.statStages[effect.stat as string] = temp;
  }

  applyStatus(status: PassedStatus): boolean {
    if (status.nonVStatus) {
      if (this.status.nonVStatus !== NonVolStatus.OK) return false;

      this.status.nonVStatus = status.nonVStatus;
      return true;
    }

    let statusChanged = false;

    if (status.vStatus) {
      this.status.vStatus = this.status.vStatus.concat(status.vStatus);
      statusChanged = true;
    }

    if (status.selfStatus) {
      this.status.selfStatus = this.status.selfStatus.concat(status.selfStatus);
      statusChanged = true;
    }

    return statusChanged;
  }

  removeStatus(status: PassedStatus): boolean {
    if (status.nonVStatus) {
      if (this.status.nonVStatus !== status.nonVStatus) return false;

      this.status.nonVStatus = NonVolStatus.OK;
      return true;
    }

    let statusChanged = false;

    if (status.vStatus) {
      const origLen = this.status.vStatus.length;

      this.status.vStatus = this.status.vStatus.filter(
        (effect) => !status.vStatus?.includes(effect)
      );

      statusChanged = this.status.vStatus.length !== origLen;
    }

    if (status.selfStatus) {
      const origLen = this.status.selfStatus.length;

      this.status.selfStatus = this.status.selfStatus.filter(
        (effect) => !status.selfStatus?.includes(effect)
      );

      statusChanged = this.status.selfStatus.length !== origLen;
    }

    return statusChanged;
  }
}

export const testParty: IActiveMonster[] = [];

const testNames = ['Bulby', 'IvyBro', 'Wartle'];
let nameIndex = 0;
for (let monster in monsterTable) {
  if (hasKey(monsterTable, monster))
    testParty.push(new ActiveMonster(monster, 40, testNames[nameIndex++]));
  else testParty.push(new ActiveMonster(MonsterNames.Bulbasaur, 5));
}

export const defaultMonster = new ActiveMonster(
  MonsterNames.Bulbasaur,
  5,
  'MISSINGNO'
);
