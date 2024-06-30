import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { MenuComponent } from './menu/menu.component';
import { OverviewComponent } from './overview/overview.component';
import { TeamViewGen1Component } from './team-view-gen1/team-view-gen1.component';
import { HealthbarComponent } from './healthbar/healthbar.component';
import { FightViewGen1Component } from './fight-view-gen1/fight-view-gen1.component';
import { ViewBattleCacheGen1Component } from './view-battle-cache-gen1/view-battle-cache-gen1.component';
import { PromptComponent } from './prompt/prompt.component';
import { ViewBattleStatsGen1Component } from './view-battle-stats-gen1/view-battle-stats-gen1.component';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    MenuComponent,
    OverviewComponent,
    TeamViewGen1Component,
    HealthbarComponent,
    FightViewGen1Component,
    ViewBattleCacheGen1Component,
    PromptComponent,
    ViewBattleStatsGen1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
