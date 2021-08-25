import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppSolicitudComponent } from './epp-solicitud.component';

describe('EppSolicitudComponent', () => {
  let component: EppSolicitudComponent;
  let fixture: ComponentFixture<EppSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EppSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EppSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
