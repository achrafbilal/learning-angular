import { TestBed } from '@angular/core/testing';

import { RestDataApiService } from './rest-data-api.service';

describe('RestDataApiService', () => {
  let service: RestDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
