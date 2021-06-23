import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos : any =[];
  public eventosFiltrados : any  =[];
  larguraImagem: number =150;
  margemImagem: number = 2;
  exibirImagem: boolean =true;
  private _filtroLista: string ='';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  filtrarEventos(filtrarPor: string ): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexof(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexof(filtrarPor) !== -1
    )
  }

  constructor(private Http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }
AlterarImagem(){
  this.exibirImagem = !this.exibirImagem;
}

  public getEventos(): void{
    this.Http.get('https://localhost:5001/api/eventos').subscribe(
    Response =>{
       this.eventos = Response;
       this.eventosFiltrados = this.eventos;
    },
    error => console.log(error)
  );
}

}
