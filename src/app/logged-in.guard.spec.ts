import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';

describe('LoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInGuard]
    });
  });

});
