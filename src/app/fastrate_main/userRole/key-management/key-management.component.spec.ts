import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyManagementComponent } from './key-management.component';

describe('KeyManagementComponent', () => {
  let component: KeyManagementComponent;
  let fixture: ComponentFixture<KeyManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyManagementComponent]
    });
    fixture = TestBed.createComponent(KeyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
