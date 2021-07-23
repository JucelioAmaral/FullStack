import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import {take} from 'rxjs/operators';

@Injectable(
  //{providedIn: 'root'}.OBS:Essa injeção de dependencia já existe no arquivo "app.module.ts". Está aqui como exemplo de que pode ser inserida aqui tbm. Nos dois arquivos, juntos ou um lá e aqui, não influencia, tanto faz.
)
export class EventoService {
    baseURL = 'https://localhost:5001/api/Eventos';
    constructor(private Http: HttpClient) { }

    public getEventos(): Observable<Evento[]>{
      return this.Http.get<Evento[]>(this.baseURL).pipe(take(1));
    }

    public getEventosByTema(tema: string): Observable<Evento[]>{
      return this.Http.get<Evento[]>(`${this.baseURL}/tema${tema}`).pipe(take(1));
    }

    public getEventoById(id: number): Observable<Evento>{
      return this.Http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
    }

    public postEvento(evento: Evento): Observable<Evento>{
      return this.Http.post<Evento>(this.baseURL, evento).pipe(take(1));
    }

    public putEvento(id: number, evento: Evento): Observable<Evento>{
      return this.Http.put<Evento>(`${this.baseURL}/${id}`, evento).pipe(take(1));
    }

    public deleteEvento(id: number): Observable<any>{
      return this.Http.delete(`${this.baseURL}/${id}`).pipe(take(1));
    }

    postUpload(eventoId: number, file: File): Observable<Evento>{
      const fileToUpload = file[0] as File;
      const formData = new FormData();
      formData.append('file', fileToUpload)

      return this.Http.post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData).pipe(take(1));
    }
  }
