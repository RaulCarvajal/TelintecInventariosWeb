import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosPartidaComponent } from './cambios-partida.component';

describe('CambiosPartidaComponent', () => {
  let component: CambiosPartidaComponent;
  let fixture: ComponentFixture<CambiosPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiosPartidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiosPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
