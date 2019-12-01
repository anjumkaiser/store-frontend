import { TestBed } from '@angular/core/testing';

import { UnAuthenticationGuard } from './unauthentication.guard';

describe('UnAuthenticationGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnAuthenticationGuard = TestBed.get(UnAuthenticationGuard);
    expect(service).toBeTruthy();
  });
});
