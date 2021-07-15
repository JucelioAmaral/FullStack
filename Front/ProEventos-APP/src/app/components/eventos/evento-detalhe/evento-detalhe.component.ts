import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

 get bsConfigPropriedade(): any{
  return {
    adaptivePosition: true,
    dateInputFormat: 'DD-MM-YYYY HH:mm a',
    containerClass: 'theme-green',
    showWeekNumbers: false
  };
}

constructor(private fb: FormBuilder,
            private localeService: BsLocaleService,
            private router: ActivatedRoute,
            private eventoService: EventoService,
            private spinner: NgxSpinnerService,
            private toastr: ToastrService)
{
            this.localeService.use('pt-br');
}

public carregarEvento(): void{
  const eventoIdParam = this.router.snapshot.paramMap.get('id');

  if (eventoIdParam != null){

    this.estadoSalvar = 'put';

    this.spinner.show();
    this.eventoService.getEventoById(+eventoIdParam).subscribe({
      next:(evento: Evento) => {
        this.evento ={...evento};
        this.form.patchValue(this.evento);
      },
      error:(error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao tentar carregar Evento.','Erro!');
        console.error(error);
      },
      complete:() => this.spinner.hide(),
    });
  }
}

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void{
    this.form = this.fb.group({
      tema: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL:['', Validators.required],
    });
  }

  public  resetForm(): void{
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any{
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarInsercaoAlteracao(): void{
    this.spinner.show();
    if (this.form.valid){
      if(this.estadoSalvar == 'post'){
      // O "value" terá todos os valores do objeto evento, que atribuirá ao this.evento. Como se fosse um automapper.
      this.evento = {...this.form.value}
        this.eventoService.postEvento(this.evento).subscribe(
          () => this.toastr.success('Evento salvo com sucesso','Evento salvo!'),
          (error: any) =>{
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o evento','Erro ao salvar.');
          },
          () => this.spinner.hide()
        );
      } else {
        // O "value" terá todos os valores do objeto evento, que atribuirá ao this.evento. Como se fosse um automapper.
      this.evento = {id: this.evento.id, ...this.form.value}
        this.eventoService.putEvento(this.evento.id, this.evento).subscribe(
          () => this.toastr.success('Evento alterado com sucesso','Evento alterado!'),
          (error: any) =>{
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o evento','Erro ao salvar.');
          },
          () => this.spinner.hide()
        );
      }

    }
  }
}
