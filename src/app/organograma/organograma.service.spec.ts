import { TestBed } from '@angular/core/testing';

import { OrganogramaService } from './organograma.service';

describe('OrganogramaService', () => {
  let service: OrganogramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganogramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
