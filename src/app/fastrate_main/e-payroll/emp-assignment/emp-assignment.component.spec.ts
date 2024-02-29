import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAssignmentComponent } from './emp-assignment.component';

describe('EmpAssignmentComponent', () => {
  let component: EmpAssignmentComponent;
  let fixture: ComponentFixture<EmpAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpAssignmentComponent]
    });
    fixture = TestBed.createComponent(EmpAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
