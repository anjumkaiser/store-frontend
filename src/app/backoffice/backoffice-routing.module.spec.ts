import { BackofficeRoutingModule } from './backoffice-routing.module';

describe('BackofficeRoutingModule', () => {
  let backofficeRoutingModule: BackofficeRoutingModule;

  beforeEach(() => {
    backofficeRoutingModule = new BackofficeRoutingModule();
  });

  it('should create an instance', () => {
    expect(backofficeRoutingModule).toBeTruthy();
  });
});
