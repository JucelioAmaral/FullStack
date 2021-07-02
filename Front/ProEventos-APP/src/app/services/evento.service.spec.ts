/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { eventoService } from './evento.service';

describe('Service: Evento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [eventoService]
    });
  });

  it('should ...', inject([eventoService], (service: eventoService) => {
    expect(service).toBeTruthy();
  }));
});
