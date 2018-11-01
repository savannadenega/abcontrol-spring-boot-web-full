import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasPagamentoComponent } from './formas-pagamento.component';

describe('FormasPagamentoComponent', () => {
  let component: FormasPagamentoComponent;
  let fixture: ComponentFixture<FormasPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormasPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormasPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
