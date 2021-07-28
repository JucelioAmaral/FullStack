import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Lote } from '@app/models/Lote';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class LoteService {

  baseURL = environment.apiURL + 'api/Lotes';

  constructor(private Http: HttpClient) { }

  public getLotesByEventoId(eventoId: number): Observable<Lote[]>{
    return this.Http
      .get<Lote[]>(`${this.baseURL}/${eventoId}`)
      .pipe(take(1));
  }

  public salveLote(eventoId: number, lotes: Lote[]): Observable<Lote[]>{
      return this.Http
    .put<Lote[]>(`${this.baseURL}/${eventoId}`, lotes)
    .pipe(take(1));
  }

  public deleteLote(eventoId: number, loteId: number): Observable<any>{
    return this.Http.delete(`${this.baseURL}/${eventoId}/${loteId}`).pipe(take(1));
  }

}
