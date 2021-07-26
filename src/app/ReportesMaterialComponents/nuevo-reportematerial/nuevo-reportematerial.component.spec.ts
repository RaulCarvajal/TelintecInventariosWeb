import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoReportematerialComponent } from './nuevo-reportematerial.component';

describe('NuevoReportematerialComponent', () => {
  let component: NuevoReportematerialComponent;
  let fixture: ComponentFixture<NuevoReportematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoReportematerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoReportematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
