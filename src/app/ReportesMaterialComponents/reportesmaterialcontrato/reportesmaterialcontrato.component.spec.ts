import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesmaterialcontratoComponent } from './reportesmaterialcontrato.component';

describe('ReportesmaterialcontratoComponent', () => {
  let component: ReportesmaterialcontratoComponent;
  let fixture: ComponentFixture<ReportesmaterialcontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesmaterialcontratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesmaterialcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
