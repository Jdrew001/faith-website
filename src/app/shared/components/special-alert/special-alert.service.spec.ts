import { TestBed } from '@angular/core/testing';

import { SpecialAlertService } from './special-alert.service';

describe('SpecialAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialAlertService = TestBed.get(SpecialAlertService);
    expect(service).toBeTruthy();
  });
});
