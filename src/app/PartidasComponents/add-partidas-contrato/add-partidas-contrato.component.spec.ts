import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartidasContratoComponent } from './add-partidas-contrato.component';

describe('AddPartidasContratoComponent', () => {
  let component: AddPartidasContratoComponent;
  let fixture: ComponentFixture<AddPartidasContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartidasContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartidasContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
