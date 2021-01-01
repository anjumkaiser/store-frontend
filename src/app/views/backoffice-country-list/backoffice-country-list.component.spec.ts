import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackofficeCountryListComponent } from './backoffice-country-list.component';

describe('BackofficeCountryListComponent', () => {
  let component: BackofficeCountryListComponent;
  let fixture: ComponentFixture<BackofficeCountryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeCountryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeCountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
