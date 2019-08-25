import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCalcInputComponent } from './ng-calc-input.component';

describe('NgCalcInputComponent', () => {
  let component: NgCalcInputComponent;
  let fixture: ComponentFixture<NgCalcInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCalcInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCalcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
