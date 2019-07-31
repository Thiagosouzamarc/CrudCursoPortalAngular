import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DepartamentService, EventEmitterService } from 'src/app/departament.service';
import { cursoModel } from 'src/app/shared/model/curso-model';
import { ToastrService } from 'ngx-toastr';

export interface Canal {
  value: string;
  nome: string;
}

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit{

  public dataMask = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public formulario : FormGroup;
  canalValue : string;
  disable: boolean

  canais: Canal[] = [
    {value: 'Java', nome: 'Java'},
    {value: 'DotNet', nome: 'DotNet'},
    {value: 'PHP', nome: 'PHP'},
    {value: 'PYthon', nome: 'PYthon'},
    {value: 'Delphi', nome: 'Delphi'},
    {value: 'Mobile', nome: 'Mobile'}
  ];

  dadosEdit: any;

  constructor( public dialogRef: MatDialogRef<ModalEditarComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private departService: DepartamentService,
    private toastr: ToastrService){ 
      this.dadosEdit = data;
      console.log('idddd', this.dadosEdit)
    }
    
    canalChange(value){
      this.canalValue = value
    }

    ngOnInit(){
      
    }

    validar(){
      if(this.dadosEdit.Titulo === ''){
        this.toastr.error('preencha o título')
      }
    }

    fechar(){
      this.dialogRef.close();
    }
    
    salvar(){
      let objEdit: cursoModel = new cursoModel
      objEdit.id = this.dadosEdit.Id 
      objEdit.titulo = this.dadosEdit.Titulo 
      objEdit.url = this.dadosEdit.URL
      objEdit.datapublicacao = this.dadosEdit.DataPublicacao
      objEdit.cargahoraria = this.dadosEdit.CargaHoraria
      objEdit.canal = this.canalValue
      
      console.log('alterado', objEdit)
      if(this.dadosEdit.Titulo === ''){
        this.toastr.error('preencha o título!')

        if(this.dadosEdit.URL === ''){
          this.toastr.error('Preencha a URL!')
        }

        if(this.dadosEdit.DataPublicacao === ''){
          this.toastr.error('Preencha a data!')
        }
        
        if(this.canalValue === ''){
          this.toastr.error('Preencha o canal!')
        }

        if(this.dadosEdit.CargaHoraria === ''){
          this.toastr.error('Preencha a carga horária!')
      }
      }
      else{
        this.departService.putCursos(this.dadosEdit.Id, objEdit).subscribe(sucesso =>{
          this.toastr.success('Curso atualizado com sucesso!', 'Sucesso!');
          this.dialogRef.close();
          this.data.sender.pesquisar()
        }, erro =>{
          this.dialogRef.close();
          this.toastr.error('Ocorreu um erro durante o processo!', 'Erro!')
        })
      }
      this.dialogRef.close();
      this.data.sender.pesquisar()
    }

}
