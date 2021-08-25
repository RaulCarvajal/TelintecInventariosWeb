import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppSolicitudesComponent } from './epp-solicitudes.component';

describe('EppSolicitudesComponent', () => {
  let component: EppSolicitudesComponent;
  let fixture: ComponentFixture<EppSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EppSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EppSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
