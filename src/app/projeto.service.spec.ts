import { TestBed, inject } from '@angular/core/testing';

import { ProjetoService } from './projeto.service';

describe('ProjetoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjetoService]
    });
  });

  it('should be created', inject([ProjetoService], (service: ProjetoService) => {
    expect(service).toBeTruthy();
  }));
});
