import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessProfileComponent } from './access-profile.component';

describe('AccessProfileComponent', () => {
  let component: AccessProfileComponent;
  let fixture: ComponentFixture<AccessProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessProfileComponent]
    });
    fixture = TestBed.createComponent(AccessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
