import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroupComponent } from './manage-group.component';

describe('ManageGroupComponent', () => {
  let component: ManageGroupComponent;
  let fixture: ComponentFixture<ManageGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageGroupComponent]
    });
    fixture = TestBed.createComponent(ManageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
