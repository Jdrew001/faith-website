import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASubscribeDetailsComponent } from './a-subscribe-details.component';

describe('ASubscribeDetailsComponent', () => {
  let component: ASubscribeDetailsComponent;
  let fixture: ComponentFixture<ASubscribeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASubscribeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASubscribeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
