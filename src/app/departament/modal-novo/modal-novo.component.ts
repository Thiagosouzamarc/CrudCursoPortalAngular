import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cursoModel } from 'src/app/shared/model/curso-model';
import { DepartamentService, EventEmitterService } from 'src/app/departament.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Canal {
  value: string;
  nome: string;
}

@Component({
  selector: 'app-modal-novo',
  templateUrl: './modal-novo.component.html',
  styleUrls: ['./modal-novo.component.css']
})
export class ModalNovoComponent implements OnInit {

  public dataMask = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public urlMask = 'http://'
  formulario : FormGroup

  canais: Canal[] = [
    {value: 'Java', nome: 'Java'},
    {value: 'DotNet', nome: 'DotNet'},
    {value: 'PHP', nome: 'PHP'},
    {value: 'PYthon', nome: 'PYthon'},
    {value: 'Delphi', nome: 'Delphi'},
    {value: 'Mobile', nome: 'Mobile'}
  ];

  constructor(public dialogRef: MatDialogRef<ModalNovoComponent, any>,
              private formBuilder: FormBuilder,
              public departService: DepartamentService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.formBuilder.group({
      'titulo': this.formBuilder.control(null,[Validators.required]),
      'url': this.formBuilder.control(null, [Validators.required]),
      'canal': this.formBuilder.control(null, [Validators.required]),
      'datapublicacao': this.formBuilder.control(null, [Validators.required]),
      'cargahoraria': this.formBuilder.control(null, [Validators.required]),
    })
   }

  get titulo() {return this.formulario.get('titulo');}
  get url() {return this.formulario.get('url');}
  get canal() {return this.formulario.get('canal');}
  get datapublicacao() {return this.formulario.get('datapublicacao');}
  get cargahoraria() {return this.formulario.get('cargahoraria');}

  ngOnInit() {
  }

  fechar(){
    this.dialogRef.close();
  }

  salvar(){
    var form = this.formulario
    if(form.valid){
      var curso: cursoModel = new cursoModel
      curso.titulo = form.value.titulo
      curso.url = this.urlMask + form.value.url
      curso.canal = form.value.canal
      curso.datapublicacao = form.value.datapublicacao
      curso.cargahoraria = form.value.cargahoraria

      this.departService.postCursos(curso).subscribe(sucesso =>{
        this.toastr.success('Curso cadastrado com sucesso!', 'Sucesso!');
        this.dialogRef.close();
        EventEmitterService.get('refreshCursos').emit(true);
      }, erro =>{
        this.dialogRef.close();
        this.toastr.error('Ocorreu um erro durante o processo!', 'Erro!')
      })
    }
    
  }
}
