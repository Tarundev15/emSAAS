import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOneComponent } from './setting-one.component';

describe('SettingOneComponent', () => {
  let component: SettingOneComponent;
  let fixture: ComponentFixture<SettingOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingOneComponent]
    });
    fixture = TestBed.createComponent(SettingOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
