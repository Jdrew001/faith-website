import { TestBed } from '@angular/core/testing';

import { VisitorResourceService } from './visitor-resource.service';

describe('VisitorResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisitorResourceService = TestBed.get(VisitorResourceService);
    expect(service).toBeTruthy();
  });
});
