import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSolicitudmaterialComponent } from './nueva-solicitudmaterial.component';

describe('NuevaSolicitudmaterialComponent', () => {
  let component: NuevaSolicitudmaterialComponent;
  let fixture: ComponentFixture<NuevaSolicitudmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSolicitudmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSolicitudmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
