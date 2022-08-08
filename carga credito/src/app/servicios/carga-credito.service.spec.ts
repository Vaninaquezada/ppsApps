import { TestBed } from '@angular/core/testing';

import { CargaCreditoService } from './carga-credito.service';

describe('CargaCreditoService', () => {
  let service: CargaCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
