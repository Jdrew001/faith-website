import { TestBed } from '@angular/core/testing';

import { GenericResourceService } from './generic-resource.service';

describe('GenericResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericResourceService = TestBed.get(GenericResourceService);
    expect(service).toBeTruthy();
  });
});
