import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { DepartamentComponent } from './departament/departament.component';
import { ModalNovoComponent } from './departament/modal-novo/modal-novo.component';
import { ModalEditarComponent } from './departament/modal-editar/modal-editar.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DepartamentComponent,
    ModalNovoComponent,
    ModalEditarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    ToastrModule.forRoot()
  ],
  entryComponents:[
    ModalEditarComponent,
    ModalNovoComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
