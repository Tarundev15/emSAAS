import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadlistComponent } from './leadlist.component';

describe('LeadlistComponent', () => {
  let component: LeadlistComponent;
  let fixture: ComponentFixture<LeadlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadlistComponent]
    });
    fixture = TestBed.createComponent(LeadlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
