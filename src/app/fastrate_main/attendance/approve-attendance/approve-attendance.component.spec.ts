import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAttendanceComponent } from './approve-attendance.component';

describe('ApproveAttendanceComponent', () => {
  let component: ApproveAttendanceComponent;
  let fixture: ComponentFixture<ApproveAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveAttendanceComponent]
    });
    fixture = TestBed.createComponent(ApproveAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
