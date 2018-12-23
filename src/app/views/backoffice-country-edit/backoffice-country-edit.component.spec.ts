import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeCountryEditComponent } from './backoffice-country-edit.component';

describe('BackofficeCountryEditComponent', () => {
  let component: BackofficeCountryEditComponent;
  let fixture: ComponentFixture<BackofficeCountryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeCountryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeCountryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
