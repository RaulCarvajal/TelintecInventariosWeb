import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosContratoComponent } from './servicios-contrato.component';

describe('ServiciosContratoComponent', () => {
  let component: ServiciosContratoComponent;
  let fixture: ComponentFixture<ServiciosContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
