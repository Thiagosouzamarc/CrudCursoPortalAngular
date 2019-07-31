import { Component, OnInit, EventEmitter } from '@angular/core';
import { Departament } from '../departament';
import { DepartamentService, EventEmitterService } from '../departament.service';
import { MatDialog } from '@angular/material';
import { ModalEditarComponent } from './modal-editar/modal-editar.component';
import { ModalNovoComponent } from './modal-novo/modal-novo.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css']
})
export class DepartamentComponent implements OnInit {
  
displayedColumns = ['id', 'titulo', 'URL', 'canal', 'data', 'carga', 'editar'];
dados: any;
refresh: any = null;

  constructor(private departamentoService: DepartamentService,
               public dialog: MatDialog,
              private toastr: ToastrService,
              ) { 

  }

  ngOnInit() {

    this.departamentoService.getCursos().subscribe(resp => {
      this.dados = resp

      console.log('dados', this.dados)

      this.refresh = EventEmitterService.get('refreshCursos').subscribe(e => this.pesquisar());
    })
  }

  ngOnDestroy(){
    if(this.refresh !== null) this.refresh.unsubscribe();
  }

  pesquisar(){
    this.departamentoService.getCursos().subscribe(resp =>{
      this.dados = resp
    })
  }
  save(){
    
  }

  listar(){
  }

  cancel(){

  }

  delete(id){
    console.log('IDDD', id)
    this.departamentoService.delCursos(id).subscribe(sucesso =>{
      this.toastr.success('Curso excluido com sucesso!', 'Sucesso!');
      this.pesquisar();
      }, erro =>{
        this.toastr.error('Ocorreu um erro durante o processo!', 'Erro!')

    })
  }
  add(){
    var data = { sender: this};
    let dialogRef = this.dialog.open(ModalNovoComponent, {width:'600px', data: data})
  }

  edit(dados){
    var data = {sender: this}
    console.log('dialog', data)
    let dialogRef = this.dialog.open(ModalEditarComponent, {width: '600px', data: dados })
  }
}
