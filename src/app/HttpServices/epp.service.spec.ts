import { TestBed } from '@angular/core/testing';

import { EppService } from './epp.service';

describe('EppService', () => {
  let service: EppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
