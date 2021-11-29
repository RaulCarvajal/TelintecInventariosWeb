import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDevolucionmaterialComponent } from './dialog-devolucionmaterial.component';

describe('DialogDevolucionmaterialComponent', () => {
  let component: DialogDevolucionmaterialComponent;
  let fixture: ComponentFixture<DialogDevolucionmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDevolucionmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDevolucionmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
