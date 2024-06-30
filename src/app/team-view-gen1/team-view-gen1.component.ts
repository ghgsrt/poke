import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IActiveMonster } from '../active-monster';
import { getEXPForLevel } from '../lev-rate';
import { MonsterNames } from '../monster';
import { view } from '../view';
import { Stats } from '../stats';

@Component({
  selector: 'app-team-view-gen1',
  templateUrl: './team-view-gen1.component.html',
  styleUrls: ['./team-view-gen1.component.scss'],
})
export class TeamViewGen1Component implements OnInit {
  @Input() monster?: IActiveMonster;
  @Input() view: number = 0;
  imgSrc: string = '../../assets/images/portrait/';

  HP = Stats.HP;

  ngOnInit(): void {
    let cachedOnContextMenu:
      | (((this: GlobalEventHandlers, ev: MouseEvent) => any) &
          ((this: Window, ev: MouseEvent) => any))
      | null = window.oncontextmenu;

    window.oncontextmenu = (event) => {
      event.preventDefault();

      window.oncontextmenu = cachedOnContextMenu;
      view.set(1);
    };

    if (this.monster) this.imgSrc += this.monster.base.name + '.png';

  }

  // getStats() {
  //   let stats = [];
  //   let monStats = this.monster?.getStats();
  //   for(let stat in monStats)
  //     stats.push({ label: stat, value: monStats[Stats[stat]]})
  //   return [
  //     { label: 'ATTACK', value: this.monster?.IV['Attack'] },
  //     { label: 'DEFENSE', value: this.monster?.IV['Defense'] },
  //     { label: 'SPEED', value: this.monster?.IV['Speed'] },
  //     { label: 'SPECIAL', value: this.monster?.IV['Special'] },
  //   ];
  // }

  getNo(): string {
    if (this.monster) {
      let no = MonsterNames[this.monster?.base.name].toString() || '???';
      no = no.padStart(3, '0');
      return no;
    }

    return '???';
  }

  getEXPToLevelUp() {
    if (this.monster)
      return Math.floor(
        getEXPForLevel(this.monster.base.levelingRate, this.monster.level + 1) -
          this.monster.exp
      );
    return 0;
  }

  padStart(target: string, maxLength: number, fillString?: string): string {
    return target.padStart(maxLength, fillString);
  }

  setHPBarWidth(): void {
    let bar: HTMLElement | null = document?.querySelector('.hp-bar');
    if (bar) {
      let currHealth = this.monster?.battleHealth;
      let maxHealth = this.monster?.getStatValue(this.HP);
      bar.style.width =
        ((typeof currHealth !== 'undefined' ? currHealth : 1) /
          (typeof maxHealth !== 'undefined' ? maxHealth : 1)) *
          100 +
        '%';
    }
  }
}
