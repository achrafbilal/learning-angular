import { TestBed } from '@angular/core/testing';

import { RestSearchApiService } from './rest-search-api.service';

describe('RestSearchApiService', () => {
  let service: RestSearchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestSearchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
