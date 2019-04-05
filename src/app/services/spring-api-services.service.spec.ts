import { TestBed } from '@angular/core/testing';

import { SpringApiServicesService } from './spring-api-services.service';

describe('SpringApiServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpringApiServicesService = TestBed.get(SpringApiServicesService);
    expect(service).toBeTruthy();
  });
});
