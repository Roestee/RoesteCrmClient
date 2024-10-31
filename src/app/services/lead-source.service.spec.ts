import { TestBed } from '@angular/core/testing';

import { LeadSourceService } from './lead-source.service';

describe('LeadSourceService', () => {
  let service: LeadSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
