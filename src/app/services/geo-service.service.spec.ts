import { TestBed } from '@angular/core/testing';

import { GeoServicesService } from './geo-services.service';

describe('GeoServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoServicesService = TestBed.get(GeoServicesService);
    expect(service).toBeTruthy();
  });
});
