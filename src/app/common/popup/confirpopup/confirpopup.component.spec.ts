import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirpopupComponent } from './confirpopup.component';

describe('ConfirpopupComponent', () => {
  let component: ConfirpopupComponent;
  let fixture: ComponentFixture<ConfirpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirpopupComponent]
    });
    fixture = TestBed.createComponent(ConfirpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
