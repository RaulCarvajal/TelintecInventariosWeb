import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariokpiComponent } from './inventariokpi.component';

describe('InventariokpiComponent', () => {
  let component: InventariokpiComponent;
  let fixture: ComponentFixture<InventariokpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventariokpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventariokpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
