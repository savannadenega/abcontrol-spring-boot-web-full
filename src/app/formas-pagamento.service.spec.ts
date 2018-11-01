import { TestBed, inject } from '@angular/core/testing';

import { FormasPagamentoService } from './formas-pagamento.service';

describe('FormasPagamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormasPagamentoService]
    });
  });

  it('should be created', inject([FormasPagamentoService], (service: FormasPagamentoService) => {
    expect(service).toBeTruthy();
  }));
});
