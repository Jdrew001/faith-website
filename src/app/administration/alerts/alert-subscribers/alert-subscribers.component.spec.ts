import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSubscribersComponent } from './alert-subscribers.component';

describe('AlertSubscribersComponent', () => {
  let component: AlertSubscribersComponent;
  let fixture: ComponentFixture<AlertSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
