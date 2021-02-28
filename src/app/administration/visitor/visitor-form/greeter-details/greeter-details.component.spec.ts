import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreeterDetailsComponent } from './greeter-details.component';

describe('GreeterDetailsComponent', () => {
  let component: GreeterDetailsComponent;
  let fixture: ComponentFixture<GreeterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreeterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreeterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
