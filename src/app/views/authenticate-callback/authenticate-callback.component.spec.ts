import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateCallbackComponent } from './authenticate-callback.component';

describe('AuthenticateCallbackComponent', () => {
  let component: AuthenticateCallbackComponent;
  let fixture: ComponentFixture<AuthenticateCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticateCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
