import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizeAttendanceComponent } from './regularize-attendance.component';

describe('RegularizeAttendanceComponent', () => {
  let component: RegularizeAttendanceComponent;
  let fixture: ComponentFixture<RegularizeAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularizeAttendanceComponent]
    });
    fixture = TestBed.createComponent(RegularizeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
