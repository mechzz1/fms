import { TestBed } from '@angular/core/testing';

import { AuthErrorHandlerService } from './auth-error-handler.service';

describe('AuthErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthErrorHandlerService = TestBed.get(AuthErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
