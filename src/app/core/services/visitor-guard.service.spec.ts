import { TestBed } from '@angular/core/testing';

import { VisitorGuardService } from './visitor-guard.service';

describe('VisitorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitorGuardService = TestBed.get(VisitorGuardService);
    expect(service).toBeTruthy();
  });
});
