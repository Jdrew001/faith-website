import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialAlertComponent } from './special-alert.component';

describe('SpecialAlertComponent', () => {
  let component: SpecialAlertComponent;
  let fixture: ComponentFixture<SpecialAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
