import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatephotosComponent } from './validatephotos.component';

describe('ValidatephotosComponent', () => {
  let component: ValidatephotosComponent;
  let fixture: ComponentFixture<ValidatephotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatephotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatephotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
