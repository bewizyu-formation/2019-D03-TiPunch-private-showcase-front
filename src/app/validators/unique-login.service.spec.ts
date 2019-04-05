import { TestBed } from '@angular/core/testing';

import { UniqueLoginService } from './unique-login.service';

describe('UniqueLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueLoginService = TestBed.get(UniqueLoginService);
    expect(service).toBeTruthy();
  });
});
