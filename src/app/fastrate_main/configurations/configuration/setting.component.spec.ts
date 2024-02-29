import { ComponentFixture, TestBed } from '@angular/core/testing';

import { configurationComponent } from './configuration.component';

describe('configurationComponent', () => {
  let component: configurationComponent;
  let fixture: ComponentFixture<configurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [configurationComponent]
    });
    fixture = TestBed.createComponent(configurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
