import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRowComponent } from './material-row.component';

describe('MaterialRowComponent', () => {
  let component: MaterialRowComponent;
  let fixture: ComponentFixture<MaterialRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
