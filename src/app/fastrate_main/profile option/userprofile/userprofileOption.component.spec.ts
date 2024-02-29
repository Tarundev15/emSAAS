import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileOptionComponent } from './userprofileOption.component';

describe('UserprofileComponent', () => {
  let component: UserprofileOptionComponent;
  let fixture: ComponentFixture<UserprofileOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprofileOptionComponent]
    });
    fixture = TestBed.createComponent(UserprofileOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
