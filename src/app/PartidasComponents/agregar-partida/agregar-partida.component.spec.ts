import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPartidaComponent } from './agregar-partida.component';

describe('AgregarPartidaComponent', () => {
  let component: AgregarPartidaComponent;
  let fixture: ComponentFixture<AgregarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPartidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
