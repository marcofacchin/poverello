import { TestBed } from '@angular/core/testing';

import { OmschrijvingService } from './omschrijving.service';

describe('OmschrijvingService', () => {
  let service: OmschrijvingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmschrijvingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
