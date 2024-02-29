import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillMOAFComponent } from './fill-moaf.component';

describe('FillMOAFComponent', () => {
  let component: FillMOAFComponent;
  let fixture: ComponentFixture<FillMOAFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FillMOAFComponent]
    });
    fixture = TestBed.createComponent(FillMOAFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
