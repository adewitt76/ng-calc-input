import { TestBed } from '@angular/core/testing';

import { NgCalcInputService } from './ng-calc-input.service';

describe('NgCalcInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgCalcInputService = TestBed.get(NgCalcInputService);
    expect(service).toBeTruthy();
  });
});
