import { TestBed } from '@angular/core/testing';

import { EditListDocService } from './edit-list-doc.service';

describe('EditListDocService', () => {
  let service: EditListDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditListDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
