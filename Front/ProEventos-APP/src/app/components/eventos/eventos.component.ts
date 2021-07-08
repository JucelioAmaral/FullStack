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

  ngOnInit(): void{

 }
}
