import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesmaterialComponent } from './solicitudesmaterial.component';

describe('SolicitudesmaterialComponent', () => {
  let component: SolicitudesmaterialComponent;
  let fixture: ComponentFixture<SolicitudesmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
