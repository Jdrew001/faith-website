import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMessageDetailsComponent } from './a-message-details.component';

describe('AMessageDetailsComponent', () => {
  let component: AMessageDetailsComponent;
  let fixture: ComponentFixture<AMessageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMessageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
