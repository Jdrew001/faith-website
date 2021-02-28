import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASubscribeListComponent } from './a-subscribe-list.component';

describe('ASubscribeListComponent', () => {
  let component: ASubscribeListComponent;
  let fixture: ComponentFixture<ASubscribeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASubscribeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASubscribeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
