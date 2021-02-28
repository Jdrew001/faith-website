import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamglobalSectionComponent } from './iamglobal-section.component';

describe('IamglobalSectionComponent', () => {
  let component: IamglobalSectionComponent;
  let fixture: ComponentFixture<IamglobalSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamglobalSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamglobalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
