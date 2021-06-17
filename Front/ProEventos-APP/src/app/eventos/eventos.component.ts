import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos : any;

  constructor(private Http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }
public getEventos(): void{
this.Http.get('https://localhost:5001/api/eventos').subscribe(
  Response => this.eventos = Response,
  error => console.log(error)
  );
}

}
