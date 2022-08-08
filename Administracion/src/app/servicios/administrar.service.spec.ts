import { TestBed } from '@angular/core/testing';

import { AdministrarService } from './administrar.service';

describe('AdministrarService', () => {
  let service: AdministrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
