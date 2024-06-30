import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBattleStatsGen1Component } from './view-battle-stats-gen1.component';

describe('ViewBattleStatsGen1Component', () => {
  let component: ViewBattleStatsGen1Component;
  let fixture: ComponentFixture<ViewBattleStatsGen1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBattleStatsGen1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBattleStatsGen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
