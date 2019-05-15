import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetaiComponent } from './team-detai.component';

describe('TeamDetaiComponent', () => {
  let component: TeamDetaiComponent;
  let fixture: ComponentFixture<TeamDetaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
