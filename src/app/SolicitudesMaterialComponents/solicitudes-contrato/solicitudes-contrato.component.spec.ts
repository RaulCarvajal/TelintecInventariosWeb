import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesContratoComponent } from './solicitudes-contrato.component';

describe('SolicitudesContratoComponent', () => {
  let component: SolicitudesContratoComponent;
  let fixture: ComponentFixture<SolicitudesContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
