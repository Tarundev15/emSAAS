import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignShiftComponent } from './assign-shift.component';

describe('AssignShiftComponent', () => {
  let component: AssignShiftComponent;
  let fixture: ComponentFixture<AssignShiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignShiftComponent]
    });
    fixture = TestBed.createComponent(AssignShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
