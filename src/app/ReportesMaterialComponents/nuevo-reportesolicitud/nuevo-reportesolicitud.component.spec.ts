import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoReportesolicitudComponent } from './nuevo-reportesolicitud.component';

describe('NuevoReportesolicitudComponent', () => {
  let component: NuevoReportesolicitudComponent;
  let fixture: ComponentFixture<NuevoReportesolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoReportesolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoReportesolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
