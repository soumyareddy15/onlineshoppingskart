import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerforgotpasswordComponent } from './retailerforgotpassword.component';

describe('RetailerforgotpasswordComponent', () => {
  let component: RetailerforgotpasswordComponent;
  let fixture: ComponentFixture<RetailerforgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerforgotpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
