import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGroupListComponent } from './a-group-list.component';

describe('AGroupListComponent', () => {
  let component: AGroupListComponent;
  let fixture: ComponentFixture<AGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
