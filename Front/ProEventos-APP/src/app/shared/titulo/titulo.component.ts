import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  @Input() titulo!: string;
  @Input() iconClass = 'fa fa-user';
  @Input() Subtitulo = 'Desde 2021';
  @Input() botaoListar = false;
  constructor() { }

  ngOnInit(): void {
  }

}
