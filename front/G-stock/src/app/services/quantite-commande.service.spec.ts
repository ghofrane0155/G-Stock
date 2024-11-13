import { TestBed } from '@angular/core/testing';

import { QuantiteCommandeService } from './quantite-commande.service';

describe('QuantiteCommandeService', () => {
  let service: QuantiteCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantiteCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
