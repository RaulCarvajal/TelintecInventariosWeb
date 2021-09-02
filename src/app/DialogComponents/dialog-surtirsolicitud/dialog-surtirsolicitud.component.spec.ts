import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSurtirsolicitudComponent } from './dialog-surtirsolicitud.component';

describe('DialogSurtirsolicitudComponent', () => {
  let component: DialogSurtirsolicitudComponent;
  let fixture: ComponentFixture<DialogSurtirsolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSurtirsolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSurtirsolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
