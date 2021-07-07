import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
  //providers: [EventoService]. OBS1: Lembrar de colocar a ","(virgula) no final da linha acima se descomentar.
  //                            OBS2: Essa injeção de dependencia já existe no arquivo "app.module.ts". Está aqui como exemplo de que pode ser inserida aqui tbm. Nos dois arquivos, juntos ou um lá e aqui, não influencia, tanto faz.
})
export class EventosComponent implements OnInit {
  modalRef = {} as BsModalRef;
  public eventos : Evento[] =[];
  public eventosFiltrados : Evento[] =[];
  public larguraImagem: number = 100;
  public margemImagem: number = 2;
  public exibirImagem: boolean = true;
  private filtroListado: string = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }
  public filtrarEventos(filtrarPor: string ): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
   ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }
  public AlterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  // public getEventos(): void{
  //   this.eventoService.getEventos().subscribe(
  //   (Response: Evento[]) =>{
  //      this.eventos = Response;
  //      this.eventosFiltrados = this.eventos;
  //   },
  //   error => console.log(error)
  // );

  public getEventos(): void{
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos.', 'Erro!')
      },
      complete: () =>  this.spinner.hide()
  });
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento deletado com sucesso!', 'Deletado.');
  }

  decline(): void {
    this.modalRef.hide();
  }
}
