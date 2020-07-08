import { TestBed } from '@angular/core/testing';

import { EditDocumentService } from './edit-document.service';

describe('EditDocumentService', () => {
  let service: EditDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
