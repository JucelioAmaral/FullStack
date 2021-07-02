import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(
  //{providedIn: 'root'}.OBS:Essa injeção de dependencia já existe no arquivo "app.module.ts". Está aqui como exemplo de que pode ser inserida aqui tbm. Nos dois arquivos, juntos ou um lá e aqui, não influencia, tanto faz.
)
export class EventoService {
    baseURL = 'https://localhost:5001/api/eventos';
    constructor(private Http: HttpClient) { }

    public getEventos(): Observable<Evento[]>{
      return this.Http.get<Evento[]>(this.baseURL);
    }

    public getEventosByTema(tema: string): Observable<Evento[]>{
      return this.Http.get<Evento[]>(`${this.baseURL}/tema${tema}`);
    }

    public getEventoById(id: number): Observable<Evento>{
      return this.Http.get<Evento>(`${this.baseURL}/${id}`);
    }

}
