import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblestudySectionComponent } from './biblestudy-section.component';

describe('BiblestudySectionComponent', () => {
  let component: BiblestudySectionComponent;
  let fixture: ComponentFixture<BiblestudySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblestudySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblestudySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
