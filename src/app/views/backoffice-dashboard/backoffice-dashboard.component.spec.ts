import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BackofficeDashboardComponent } from './backoffice-dashboard.component';

describe('BackofficeDashboardComponent', () => {
  let component: BackofficeDashboardComponent;
  let fixture: ComponentFixture<BackofficeDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
