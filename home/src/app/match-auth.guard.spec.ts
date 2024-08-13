import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { matchAuthGuard } from './match-auth.guard';

describe('matchAuthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => matchAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
