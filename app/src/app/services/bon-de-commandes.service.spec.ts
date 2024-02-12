import { TestBed } from '@angular/core/testing';

import { BonDeCommandesService } from './bon-de-commandes.service';

describe('BonDeCommandesService', () => {
  let service: BonDeCommandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonDeCommandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
