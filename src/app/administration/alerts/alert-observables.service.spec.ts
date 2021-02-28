import { TestBed } from '@angular/core/testing';

import { AlertObservablesService } from './alert-observables.service';

describe('AlertObservablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertObservablesService = TestBed.get(AlertObservablesService);
    expect(service).toBeTruthy();
  });
});
