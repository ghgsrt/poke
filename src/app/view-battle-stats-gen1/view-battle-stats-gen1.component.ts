import { Component, Input } from '@angular/core';
import { IActiveMonster } from '../active-monster';
import { NonVolStatus } from '../status';
import { Stats, BaseStats } from '../stats';

@Component({
  selector: 'app-view-battle-stats-gen1',
  templateUrl: './view-battle-stats-gen1.component.html',
  styleUrls: ['./view-battle-stats-gen1.component.scss'],
})
export class ViewBattleStatsGen1Component {
  @Input() monster?: IActiveMonster;
  @Input() agent?: 'enemy' | 'player';
  @Input() calcStats?: any;
  sortNull() {
    return 0;
  }
  HP = Stats.HP;
}
