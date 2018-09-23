import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeProductListComponent } from './backoffice-product-list.component';

describe('BackofficeProductListComponent', () => {
  let component: BackofficeProductListComponent;
  let fixture: ComponentFixture<BackofficeProductListComponent>;

  beforeEach(async(() => {
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
