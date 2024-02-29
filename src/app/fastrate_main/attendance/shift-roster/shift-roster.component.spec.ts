import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRosterComponent } from './shift-roster.component';

describe('ShiftRosterComponent', () => {
  let component: ShiftRosterComponent;
  let fixture: ComponentFixture<ShiftRosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftRosterComponent]
    });
    fixture = TestBed.createComponent(ShiftRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
