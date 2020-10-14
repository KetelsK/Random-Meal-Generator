import { TestBed } from '@angular/core/testing';

import { RandomMealService } from './random-meal.service';

describe('RandomMealService', () => {
  let service: RandomMealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomMealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
