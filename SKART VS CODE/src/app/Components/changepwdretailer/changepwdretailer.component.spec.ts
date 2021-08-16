import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepwdretailerComponent } from './changepwdretailer.component';

describe('ChangepwdretailerComponent', () => {
  let component: ChangepwdretailerComponent;
  let fixture: ComponentFixture<ChangepwdretailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepwdretailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepwdretailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
