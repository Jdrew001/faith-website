import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiblestudyComponent } from './biblestudy.component';

describe('BiblestudyComponent', () => {
  let component: BiblestudyComponent;
  let fixture: ComponentFixture<BiblestudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblestudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblestudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
