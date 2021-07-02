import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable(
  //{providedIn: 'root'}.OBS:Essa injeção de dependencia já existe no arquivo "app.module.ts". Está aqui como exemplo de que pode ser inserida aqui tbm. Nos dois arquivos, juntos ou um lá e aqui, não influencia, tanto faz.
)
export class EventoService {
    baseURL = 'https://localhost:5001/api/eventos';
    constructor(private Http: HttpClient) { }

    getEventos(){
      return this.Http.get(this.baseURL);
    }

}
