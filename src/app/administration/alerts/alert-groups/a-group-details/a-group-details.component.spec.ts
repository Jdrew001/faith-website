import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGroupDetailsComponent } from './a-group-details.component';

describe('AGroupDetailsComponent', () => {
  let component: AGroupDetailsComponent;
  let fixture: ComponentFixture<AGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
