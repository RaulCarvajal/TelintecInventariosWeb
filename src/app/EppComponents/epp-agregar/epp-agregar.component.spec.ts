import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppAgregarComponent } from './epp-agregar.component';

describe('EppAgregarComponent', () => {
  let component: EppAgregarComponent;
  let fixture: ComponentFixture<EppAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EppAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EppAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
