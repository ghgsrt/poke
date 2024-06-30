import { IActiveMonster } from './active-monster';
import { ActiveAttack } from './attack';

export type Fighters = {
    attacker: IActiveMonster;
    defender: IActiveMonster;
  };
  
export type Gen1UsedAttack = {
    fightersBefore?: Fighters;
    fighters: Fighters;
    attack: ActiveAttack;
    accRoll?: string;
    baseDamage?: number;
    modifiedDamage?: number;
    randomedDamage?: number;
    resultDamage?: number;
    baseSpeed?: number;
    criticalThresh?: number;
    criticalRole?: number;
    critical?: number;
    stats?: string;
    level?: number;
    power?: number;
    A?: number;
    D?: number;
    STAB?: boolean;
    targetIsImmune?: boolean;
    random?: string;
  };
export type Gen1BattleCache = Gen1UsedAttack[];