import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemitosolicitudComponent } from './dialog-remitosolicitud.component';

describe('DialogRemitosolicitudComponent', () => {
  let component: DialogRemitosolicitudComponent;
  let fixture: ComponentFixture<DialogRemitosolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRemitosolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemitosolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
