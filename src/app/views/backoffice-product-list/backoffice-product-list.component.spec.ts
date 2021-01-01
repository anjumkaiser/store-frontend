import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackofficeProductListComponent } from './backoffice-product-list.component';

describe('BackofficeProductListComponent', () => {
  let component: BackofficeProductListComponent;
  let fixture: ComponentFixture<BackofficeProductListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
