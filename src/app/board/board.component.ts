import { Component, OnInit } from '@angular/core';
import { Types, Matchup, matchupTable } from '../types';
import { MenuItem } from '../menu-item';
import {
  Monster,
  MonsterNames,
  getMonsterFromTable,
  monsterTable,
} from '../monster';
import { IActiveMonster, testParty, defaultMonster } from '../active-monster';
import { Item } from '../item';
import { expTable } from '../lev-rate';
import { view } from '../view';
import { IPlayer, Player, ITrainer, Trainer, Trainers, trainerTable } from '../opponent';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  matchups = matchupTable;
  monsterKeys = Object.keys(monsterTable).map((key) => parseInt(key));
  monsterTable = monsterTable;
  exp = JSON.stringify(expTable);
  superMenu: string[] | MenuItem[] = [
    'POKeDEX',
    'POKeMON',
    'ITEM',
    'ASH',
    'SAVE',
    'OPTION',
    'EXIT',
  ];

  selectedMenu: number | null = null;
  selectedMonster: Monster | undefined = undefined;
  selectedActiveMonster: IActiveMonster | undefined = undefined;
  view = view;
  prompt: string | undefined = undefined;

  viewTeam: boolean = false;
  viewDex: boolean = false;
  getMonster: Function = getMonsterFromTable;

  fighting: boolean = false;
  // oppMonster: IActiveMonster = testParty[0];
  // playerMonster: IActiveMonster = defaultMonster;

  // team: IActiveMonster[] = testParty;
  // bag: Item[] = [];

  player: IPlayer = new Player([], testParty);
  testEnemy: ITrainer = trainerTable[Trainers.Dave];

  endFight = () => {
    this.fighting = false;
  };

  squares: any = [];

  damageBulby() {
    testParty[0].takeDamage(1);
  }

  constructor() {
    this.superMenu = this.superMenu.map((content, idx) => {
      return {
        name: content,
        click: () => {
          this.handleSuperMenu(content === 'EXIT' ? null : idx + 1);
        },
      };
    });
  }

  ngOnInit(): void {
    this.newGame();

    window.oncontextmenu = (event) => {
      event.preventDefault();
      this.handleSuperMenu(
        this.selectedMenu !== 0
          ? this.selectedActiveMonster
            ? 2
            : this.selectedMonster
            ? 1
            : 0
          : null
      );
      this.selectedMonster = undefined;
      this.selectedActiveMonster = undefined;
    };
  }

  handleSuperMenu(idx: number | null) {
    this.selectedMenu = idx;
  }

  get menu() {
    switch (this.selectedMenu) {
      case 0:
        return this.superMenu;
      case 1:
        this.viewDex = true;
        this.viewTeam = false;
        return Object.keys(monsterTable).map((key) => {
          let _key = parseInt(key);
          return {
            name: monsterTable[_key as MonsterNames].name,
            click: () => {
              this.viewMonster(_key);
              view.set(0);
              this.selectedMenu = null;
            },
          };
        });
      case 2:
        this.viewDex = false;
        this.viewTeam = true;
        return this.player.team.map((monster) => {
          return {
            name: monster.nickname ?? monster.base.name,
            click: () => {
              this.selectedActiveMonster = monster;
              view.set(0);
              this.selectedMenu = null;
            },
          };
        });
      case 3:
        return this.player.bag;
      default:
        if (this.selectedMenu !== null) return this.superMenu;
    }

    return undefined;
  }

  newGame() {
    this.squares = Array(18).fill(null);
  }

  viewMonster(monster: number) {
    this.selectedMonster = monsterTable[monster as MonsterNames];
  }
}
