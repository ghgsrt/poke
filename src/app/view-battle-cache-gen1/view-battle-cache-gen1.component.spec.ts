import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBattleCacheGen1Component } from './view-battle-cache-gen1.component';

describe('ViewBattleCacheGen1Component', () => {
  let component: ViewBattleCacheGen1Component;
  let fixture: ComponentFixture<ViewBattleCacheGen1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBattleCacheGen1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBattleCacheGen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
