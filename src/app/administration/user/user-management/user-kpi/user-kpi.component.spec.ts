import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKpiComponent } from './user-kpi.component';

describe('UserKpiComponent', () => {
  let component: UserKpiComponent;
  let fixture: ComponentFixture<UserKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
