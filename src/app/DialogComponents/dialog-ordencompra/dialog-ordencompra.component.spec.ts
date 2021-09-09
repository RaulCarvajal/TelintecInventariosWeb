import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrdencompraComponent } from './dialog-ordencompra.component';

describe('DialogOrdencompraComponent', () => {
  let component: DialogOrdencompraComponent;
  let fixture: ComponentFixture<DialogOrdencompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrdencompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrdencompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
