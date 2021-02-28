import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAVisitSectionComponent } from './plan-a-visit-section.component';

describe('PlanAVisitSectionComponent', () => {
  let component: PlanAVisitSectionComponent;
  let fixture: ComponentFixture<PlanAVisitSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAVisitSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAVisitSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
