import { TestBed } from '@angular/core/testing';

import { PlanAVisitService } from './plan-a-visit.service';

describe('PlanAVisitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanAVisitService = TestBed.get(PlanAVisitService);
    expect(service).toBeTruthy();
  });
});
