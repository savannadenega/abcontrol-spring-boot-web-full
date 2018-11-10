import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDetailsComponent } from './compra-details.component';

describe('CompraDetailsComponent', () => {
  let component: CompraDetailsComponent;
  let fixture: ComponentFixture<CompraDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
