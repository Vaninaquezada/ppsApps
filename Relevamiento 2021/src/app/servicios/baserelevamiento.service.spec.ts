import { TestBed } from '@angular/core/testing';

import { BaserelevamientoService } from './baserelevamiento.service';

describe('BaserelevamientoService', () => {
  let service: BaserelevamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaserelevamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
