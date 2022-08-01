import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditUserComponent } from './confirm-edit-user.component';

describe('ConfirmEditUserComponent', () => {
  let component: ConfirmEditUserComponent;
  let fixture: ComponentFixture<ConfirmEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEditUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
