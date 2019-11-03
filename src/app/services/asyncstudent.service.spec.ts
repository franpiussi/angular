import { TestBed } from '@angular/core/testing';

import { AsyncstudentService } from './asyncstudent.service';

describe('AsyncstudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsyncstudentService = TestBed.get(AsyncstudentService);
    expect(service).toBeTruthy();
  });
});
