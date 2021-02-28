import { TestBed } from '@angular/core/testing';

import { AnnouncementImplService } from './announcement-impl.service';

describe('AnnouncementImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementImplService = TestBed.get(AnnouncementImplService);
    expect(service).toBeTruthy();
  });
});
