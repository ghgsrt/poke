import { Component, Input } from '@angular/core';
import { Gen1BattleCache } from '../battle-cache';

@Component({
  selector: 'app-view-battle-cache-gen1',
  templateUrl: './view-battle-cache-gen1.component.html',
  styleUrls: ['./view-battle-cache-gen1.component.scss'],
})
export class ViewBattleCacheGen1Component {
  @Input() battleCache: Gen1BattleCache = [];
  sortNull() {
    return 0;
  }
}
