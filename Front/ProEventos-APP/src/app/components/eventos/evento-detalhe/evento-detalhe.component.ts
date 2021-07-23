import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { LoteService } from '@app/services/lote.service';
import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  modalRef: BsModalRef;
  eventoId!: number;
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';
  loteAtual= {id: 0, nome: '', indice: 0};
  imagemURL = 'assets/upload.jpg';
  file: File;

get modoEditar(): boolean{
  return this.estadoSalvar =='put';
}

  get lotes ():FormArray{
    return this.form.get('lotes') as FormArray;
  }

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
            private activatedRouter: ActivatedRoute,
            private eventoService: EventoService,
            private spinner: NgxSpinnerService,
            private toastr: ToastrService,
            private modalService: BsModalService,
            private router: Router,
            private loteService: LoteService)
{
            this.localeService.use('pt-br');
}

public carregarEvento(): void{
  this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id');

  if (this.eventoId != null && this.eventoId != 0){
    this.spinner.show();

    this.estadoSalvar = 'put';

    this.eventoService.getEventoById(this.eventoId).subscribe({
      next:(evento: Evento) => {
        this.evento ={...evento};
        this.form.patchValue(this.evento);
        this.evento.lotes.forEach(lote => {
          this.lotes.push(this.criarLote(lote));
        });
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
      lotes: this.fb.array([])
    });
  }

  adicionarLote():void{
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }


  criarLote(lote: Lote): FormGroup{
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }

  public mudarValorData(value: Date, indice: number, campo: string): void{
  this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string{
    return nome == null || nome == '' ? 'Nome do lote': nome
  }

  public  resetForm(): void{
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any{
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarEvento(): void{
    this.spinner.show();
    if (this.form.valid){
      if(this.estadoSalvar == 'post'){
      // O "value" terá todos os valores do objeto evento, que atribuirá ao this.evento. Como se fosse um automapper.
      this.evento = {...this.form.value}
        this.eventoService.postEvento(this.evento).subscribe(
          (eventoRetorno: Evento) => {
            this.toastr.success('Evento salvo com sucesso','Evento salvo!'),
            this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
          },
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
          () => {
            this.toastr.success('Evento alterado com sucesso','Evento alterado!');
          },
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

  public saveLotes(): void{
      if(this.form.controls.lotes.valid){
        this.spinner.show();
        this.loteService.salveLote(this.eventoId, this.form.value.lotes).subscribe(
          () => {
            this.toastr.success('Lotes salvos com sucesso','Sucesso!');
            // this.lotes.reset();
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar salvar lotes','Erro!');
            console.log(error);
          },
        ).add(()=> this.spinner.hide());
      }
  }

  public removerLote(template: TemplateRef<any>,
                     indice: number): void {

    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, {class: 'modal-sm' });
  }

  confirmDeleteLote(): void{
    this.modalService.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe(
      () =>{
        this.toastr.success('Lote deletado com sucesso','Sucesso!');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) =>{
        this.toastr.error(`Erro ao tentar deleatr o lote ${this.loteAtual.id}`,'Erro!')
        console.error(error);
      },
    ).add(()=> this.spinner.hide());
  }

  declineDeleteLote(): void{
    this.modalService.hide();
  }

  onFileChange(ev: any){
    const reader = new FileReader;
    reader.onload = (event: any) => this.imagemURL = event.target.result;
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);
    this.uploadImagem();
  }

  uploadImagem(): void{
    this.spinner.show();// Chamada para algo que possa demorar
    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com sucesso','Sucesso.');
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar atualizar a imagem','Erro!');
        console.log(error);
      }
    ).add(()=> this.spinner.hide());
  }

}
