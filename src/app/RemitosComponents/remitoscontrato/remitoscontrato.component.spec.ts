import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitoscontratoComponent } from './remitoscontrato.component';

describe('RemitoscontratoComponent', () => {
  let component: RemitoscontratoComponent;
  let fixture: ComponentFixture<RemitoscontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemitoscontratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitoscontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
