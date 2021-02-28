import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMessageListComponent } from './a-message-list.component';

describe('AMessageListComponent', () => {
  let component: AMessageListComponent;
  let fixture: ComponentFixture<AMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
