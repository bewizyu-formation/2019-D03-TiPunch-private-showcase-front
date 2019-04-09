import { TestBed } from '@angular/core/testing';

import { UniqueLoginValidatorService } from './unique-login-validator.service';

describe('UniqueLoginValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueLoginValidatorService = TestBed.get(UniqueLoginValidatorService);
    expect(service).toBeTruthy();
  });
});
