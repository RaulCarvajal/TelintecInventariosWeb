import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasContratoComponent } from './areas-contrato.component';

describe('AreasContratoComponent', () => {
  let component: AreasContratoComponent;
  let fixture: ComponentFixture<AreasContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
