import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAVisitComponent } from './plan-a-visit.component';

describe('PlanAVisitComponent', () => {
  let component: PlanAVisitComponent;
  let fixture: ComponentFixture<PlanAVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
