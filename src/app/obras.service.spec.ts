import { TestBed, inject } from '@angular/core/testing';

import { ObrasService } from './obras.service';

describe('ObrasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObrasService]
    });
  });

  it('should be created', inject([ObrasService], (service: ObrasService) => {
    expect(service).toBeTruthy();
  }));
});
