import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { defaultMonster, IActiveMonster } from '../active-monster';
import { ActiveAttack, AttackCategory, attackTable } from '../attack';
import { Status, NonVolStatus } from '../status';
import { matchupTable } from '../types';
import { Fighters, Gen1UsedAttack, Gen1BattleCache } from '../battle-cache';
import { Stats, BaseStats } from '../stats';
import { IPlayer, ITrainer } from '../opponent';

@Component({
  selector: 'app-fight-view-gen1',
  templateUrl: './fight-view-gen1.component.html',
  styleUrls: ['./fight-view-gen1.component.scss'],
})
export class FightViewGen1Component implements OnInit, OnDestroy {
  @Input() oppTrainer?: ITrainer;
  @Input() player?: IPlayer;
  // oppMonster: IActiveMonster = defaultMonster;
  // playerMonster: IActiveMonster = defaultMonster;
  @Input() endFight: () => void = () => {};
  playersTurn: boolean = true;
  prompt: { content: string[]; callback?: Function } = {
    content: ['Testing 123'],
  };
  fightMenuLoc: number = 0;
  hoveredAttack?: ActiveAttack;

  oppImgSrc: string = '../../assets/images/fight/opp/';
  playerImgSrc: string = '../../assets/images/fight/player/';

  gen1BattleCache: Gen1BattleCache = [];

  cachedOnContextMenu:
    | (((this: GlobalEventHandlers, ev: MouseEvent) => any) &
        ((this: Window, ev: MouseEvent) => any))
    | null = null;

  setFightMenuLoc(loc: number): void {
    this.fightMenuLoc = loc;
  }

  constructor() {}

  ngOnInit(): void {
    this.cachedOnContextMenu = window.oncontextmenu;

    window.oncontextmenu = (event) => {
      event.preventDefault();

      this.setFightMenuLoc(0);
    };
  }

  ngOnDestroy(): void {
    window.oncontextmenu = this.cachedOnContextMenu;
  }

  setHoveredAttack(attack: ActiveAttack | undefined): void {
    this.hoveredAttack = attack;
  }

  engageTurn(
    prompt: string,
    attackerIsPlayer: boolean,
    attack: ActiveAttack
  ): void {
    this.prompt = {
      content: [prompt],
      callback: () => {
        const content = this.useAttack(attackerIsPlayer, attack);
        this.prompt = {
          content: content, //['Attack Done!', 'It was super effective!... maybe...'],
        };
        //! FOR TESTING ONLY
        this.playersTurn = !attackerIsPlayer;
        if (!this.playersTurn && this.oppTrainer)
          this.engageTurn(
            'ENEMY used TACKLE',
            false,
            this.oppTrainer.getChosenMonster().attacks[0]
          );
      },
    };
  }

  getPrompts(
    damage: number,
    defender: IActiveMonster,
    attack: ActiveAttack
  ): string[] {
    switch (damage) {
      case -1:
        return ['Nothing happened...'];
      case 0:
        return ['The attack missed'];
      default:
        if (
          defender.base.defend.resistances.some((type) =>
            attack.base.types.includes(type)
          )
        )
          return ["It's not very effective..."];
        if (
          defender.base.defend.weaknesses.some((type) =>
            attack.base.types.includes(type)
          )
        )
          return ["It's super effective!"];
        return [];
    }
  }

  useAttack(attackerIsPlayer: boolean, attack: ActiveAttack): string[] {
    if(!this.player || !this.oppTrainer) return ['Nothing happened...'];

    const fighters = {
      attacker: attackerIsPlayer ? this.player.getChosenMonster() : this.oppTrainer.getChosenMonster(),
      defender: attackerIsPlayer ? this.oppTrainer.getChosenMonster() : this.player.getChosenMonster(),
    };

    const attackData: Gen1UsedAttack = {
      fightersBefore: fighters,
      fighters: fighters,
      attack: attack,
    };
    Object.assign(attackData.fightersBefore, fighters);

    let prompts: string[] = [];
    const accRoll = Math.random() * 100;
    if (accRoll <= attack.base.accuracy) {
      attack.pp--;
      const resultDamage = this.calculateDamage(attackData, fighters, attack);
      prompts = this.getPrompts(resultDamage, fighters.defender, attack);
      if (resultDamage >= 1) {
        fighters.defender.takeDamage(resultDamage);
        if (attack.base.statEffect)
          fighters.defender.applyStatEffect(attack.base.statEffect);
        if (attack.base.applyStatus)
          fighters.defender.applyStatus(attack.base.applyStatus);
        if (attack.base.removeStatus)
          fighters.defender.removeStatus(attack.base.removeStatus);
      }
      attackData.resultDamage = resultDamage;
    }

    attackData.attack = attack;
    attackData.accRoll = Math.floor(accRoll) + '/' + attack.base.accuracy;

    this.gen1BattleCache.push(attackData);

    return prompts;
  }

  calculateDamage(
    attackData: Gen1UsedAttack,
    fighters: Fighters,
    attack: ActiveAttack
  ): number {
    const baseDamage = this.calculateBaseDamage(attackData, fighters, attack);
    const modifiedDamage = this.calculateModifiedDamage(
      attackData,
      fighters,
      attack,
      baseDamage
    );

    attackData.baseDamage = baseDamage;
    attackData.modifiedDamage = modifiedDamage;

    // if (modifiedDamage === 0) return 0;
    if (modifiedDamage <= 1) return modifiedDamage;

    const random = Math.random() * (255 - 217) + 217;
    const randomedDamage = Math.floor((modifiedDamage * random) / 255);

    attackData.random = (random / 255).toFixed(2);
    // attackData.randomedDamage = randomedDamage;

    return randomedDamage;
  }

  calculateBaseDamage(
    attackData: Gen1UsedAttack,
    fighters: Fighters,
    attack: ActiveAttack
  ): number {
    const baseSpeed = fighters.attacker.base.stats['Speed'];
    const criticalThresh = attack.base.highCrit
      ? Math.min(8 * Math.floor(baseSpeed / 2), 255)
      : Math.floor(baseSpeed / 2);
    const criticalRole = Math.random() * 256; //! ASK MATT WHAT STAT STAGE MODIFIERS ARE
    const critical = criticalRole < criticalThresh ? 2 : 1;

    const stats = critical === 2 ? 'currentStats' : 'tempStats';

    const level = (critical === 2 ? 2 : 1) * fighters.attacker.level;
    const power = attack.base.power;
    const A = fighters.attacker.getBattleStatValue(
      Stats[attack.base.category ? 'SPECIAL' : 'ATTACK']
    );
    const D = fighters.defender.getBattleStatValue(
      Stats[attack.base.category ? 'SPECIAL' : 'DEFENSE']
    );

    attackData.baseSpeed = baseSpeed;
    attackData.criticalThresh = criticalThresh;
    attackData.criticalRole = Math.floor(criticalRole);
    attackData.critical = critical;
    attackData.stats = stats;
    attackData.level = level;
    attackData.power = power;
    attackData.A = A;
    attackData.D = D;

    return (
      Math.min(
        Math.floor(
          Math.floor(((Math.floor((2 * level) / 5) + 2) * power * A) / D) / 50
        ),
        997
      ) + 2
    );
  }

  calculateModifiedDamage(
    attackData: Gen1UsedAttack,
    fighters: Fighters,
    attack: ActiveAttack,
    baseDamage: number
  ): number {
    let modifiedDamage = baseDamage;

    const STAB = fighters.attacker.base.types.some((type) =>
      attack.base.types.includes(type)
    );

    if (STAB) modifiedDamage += Math.floor(modifiedDamage / 2);

    let targetIsImmune = true;
    attack.base.types.forEach((attackingType) => {
      const defendingTypes = fighters.defender.base.types;
      defendingTypes.forEach((defendingType) => {
        let noChange = false;
        if (matchupTable[attackingType].strong.includes(defendingType)) {
          modifiedDamage = Math.floor(modifiedDamage * 20);
        } else if (matchupTable[attackingType].weak.includes(defendingType)) {
          modifiedDamage = Math.floor(modifiedDamage * 5);
        } else if (
          !matchupTable[attackingType].immune.includes(defendingType)
        ) {
          modifiedDamage = Math.floor(modifiedDamage * 10);
        } else noChange = true;

        if (!noChange) {
          modifiedDamage = Math.floor(modifiedDamage / 10);
          targetIsImmune = false;
        }
      });
    });

    attackData.STAB = STAB;
    attackData.targetIsImmune = targetIsImmune;

    if (targetIsImmune) return -1;
    if (modifiedDamage === 0) return 0; // miss

    return modifiedDamage;
  }
}
