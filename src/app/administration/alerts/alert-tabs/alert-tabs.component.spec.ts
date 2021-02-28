import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTabsComponent } from './alert-tabs.component';

describe('AlertTabsComponent', () => {
  let component: AlertTabsComponent;
  let fixture: ComponentFixture<AlertTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
