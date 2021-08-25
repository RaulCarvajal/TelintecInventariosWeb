import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudmaterialComponent } from './solicitudmaterial.component';

describe('SolicitudmaterialComponent', () => {
  let component: SolicitudmaterialComponent;
  let fixture: ComponentFixture<SolicitudmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
