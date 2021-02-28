import { TestBed } from '@angular/core/testing';

import { VisitorFormService } from './visitor-form.service';

describe('VisitorFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitorFormService = TestBed.get(VisitorFormService);
    expect(service).toBeTruthy();
  });
});
