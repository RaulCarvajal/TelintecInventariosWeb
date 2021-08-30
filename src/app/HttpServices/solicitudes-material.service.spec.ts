import { TestBed } from '@angular/core/testing';

import { SolicitudesMaterialService } from './solicitudes-material.service';

describe('SolicitudesMaterialService', () => {
  let service: SolicitudesMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudesMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
