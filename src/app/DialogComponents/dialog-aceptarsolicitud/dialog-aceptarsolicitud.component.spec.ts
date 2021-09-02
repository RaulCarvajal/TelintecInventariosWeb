import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAceptarsolicitudComponent } from './dialog-aceptarsolicitud.component';

describe('DialogAceptarsolicitudComponent', () => {
  let component: DialogAceptarsolicitudComponent;
  let fixture: ComponentFixture<DialogAceptarsolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAceptarsolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAceptarsolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
