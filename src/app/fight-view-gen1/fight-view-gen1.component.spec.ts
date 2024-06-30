import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightViewGen1Component } from './fight-view-gen1.component';

describe('FightViewGen1Component', () => {
  let component: FightViewGen1Component;
  let fixture: ComponentFixture<FightViewGen1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightViewGen1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightViewGen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
