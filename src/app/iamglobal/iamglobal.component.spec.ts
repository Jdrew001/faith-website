import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamglobalComponent } from './iamglobal.component';

describe('IamglobalComponent', () => {
  let component: IamglobalComponent;
  let fixture: ComponentFixture<IamglobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamglobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamglobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
