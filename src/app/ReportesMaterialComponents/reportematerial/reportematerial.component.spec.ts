import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportematerialComponent } from './reportematerial.component';

describe('ReportematerialComponent', () => {
  let component: ReportematerialComponent;
  let fixture: ComponentFixture<ReportematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportematerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
