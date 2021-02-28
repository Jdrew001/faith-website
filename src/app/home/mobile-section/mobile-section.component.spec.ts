import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSectionComponent } from './mobile-section.component';

describe('MobileSectionComponent', () => {
  let component: MobileSectionComponent;
  let fixture: ComponentFixture<MobileSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
