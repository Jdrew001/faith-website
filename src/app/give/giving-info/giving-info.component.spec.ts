import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivingInfoComponent } from './giving-info.component';

describe('GivingInfoComponent', () => {
  let component: GivingInfoComponent;
  let fixture: ComponentFixture<GivingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
