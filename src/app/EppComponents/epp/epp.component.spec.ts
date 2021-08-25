import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppComponent } from './epp.component';

describe('EppComponent', () => {
  let component: EppComponent;
  let fixture: ComponentFixture<EppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
