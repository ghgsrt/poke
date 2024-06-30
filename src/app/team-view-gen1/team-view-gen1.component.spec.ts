import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamViewGen1Component } from './team-view-gen1.component';

describe('TeamViewGen1Component', () => {
  let component: TeamViewGen1Component;
  let fixture: ComponentFixture<TeamViewGen1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamViewGen1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewGen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
