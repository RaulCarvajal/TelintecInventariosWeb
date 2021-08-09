import { TestBed } from '@angular/core/testing';

import { ContratoplantaService } from './contratoplanta.service';

describe('ContratoplantaService', () => {
  let service: ContratoplantaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoplantaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
