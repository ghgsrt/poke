import { Component, Input } from '@angular/core';
import { IActiveMonster } from '../active-monster';
import { Stats } from '../stats';

@Component({
  selector: 'app-healthbar',
  template: `
    <div *ngIf="monster">
      <div class="flex row wrapper">
        <p class="level-l ta-right f-bold">:L</p>
        <p class="level-r f-bold">{{ monster.level }}</p>
      </div>
      <div class="hp flex row justify-end wrapper">
        <p class="hp-bar-label f-bold">HP:</p>
        <div class="hp-bar-outline">
          <div
            class="hp-bar"
            style="width: {{ (monster.battleHealth / monster.getStatValue(HP)) * 100 }}%"
          ></div>
        </div>
      </div>
      <pre *ngIf="showHPNums" class="hp-num ta-right f-bold"
        >{{ padStart(monster.battleHealth.toString(), 3) }}/{{
          padStart(monster.getStatValue(HP).toString(), 3)
        }}
        </pre
      >
    </div>
  `,
  styleUrls: ['./healthbar.component.scss'],
})
export class HealthbarComponent {
  @Input() monster?: IActiveMonster;
  @Input() showHPNums: boolean = true;
  HP = Stats.HP;

  padStart(target: string, maxLength: number, fillString?: string): string {
    return target.padStart(maxLength, fillString);
  }
}
