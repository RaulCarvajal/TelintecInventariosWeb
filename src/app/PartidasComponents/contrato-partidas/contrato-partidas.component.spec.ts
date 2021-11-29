import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoPartidasComponent } from './contrato-partidas.component';

describe('ContratoPartidasComponent', () => {
  let component: ContratoPartidasComponent;
  let fixture: ComponentFixture<ContratoPartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoPartidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
