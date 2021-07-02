import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
  //providers: [EventoService]. OBS1: Lembrar de colocar a ","(virgula) no final da linha acima se descomentar.
  //                            OBS2: Essa injeção de dependencia já existe no arquivo "app.module.ts". Está aqui como exemplo de que pode ser inserida aqui tbm. Nos dois arquivos, juntos ou um lá e aqui, não influencia, tanto faz.
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
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.getEventos();
  }
AlterarImagem(){
  this.exibirImagem = !this.exibirImagem;
}

  public getEventos(): void{
    this.eventoService.getEventos().subscribe(
    Response =>{
       this.eventos = Response;
       this.eventosFiltrados = this.eventos;
    },
    error => console.log(error)
  );
}

}
