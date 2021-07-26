import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesmaterialComponent } from './reportesmaterial.component';

describe('ReportesmaterialComponent', () => {
  let component: ReportesmaterialComponent;
  let fixture: ComponentFixture<ReportesmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
