import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoComponent } from './remito.component';

describe('RemitoComponent', () => {
  let component: RemitoComponent;
  let fixture: ComponentFixture<RemitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
