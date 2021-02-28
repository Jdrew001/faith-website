import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AReorderComponent } from './a-reorder.component';

describe('AReorderComponent', () => {
  let component: AReorderComponent;
  let fixture: ComponentFixture<AReorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AReorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
