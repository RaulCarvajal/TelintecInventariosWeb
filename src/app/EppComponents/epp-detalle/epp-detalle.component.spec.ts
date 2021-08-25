import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppDetalleComponent } from './epp-detalle.component';

describe('EppDetalleComponent', () => {
  let component: EppDetalleComponent;
  let fixture: ComponentFixture<EppDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EppDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EppDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
