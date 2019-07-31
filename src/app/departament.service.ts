import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departament } from './departament';
import { cursoModel } from './shared/model/curso-model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  urlCursos = "http://localhost:50106/api/cursos";
  readonly url = 'http://localhost:3000/departaments';
  constructor(private http: HttpClient) { }

  get(): Observable<Departament[]>{
    return this.http.get<Departament[]>(this.url);
  }

  add(d: Departament): Observable<Departament>{
    return this.http.post<Departament>(this.url, d);
  }

  getCursos(): Observable<any>{
    return this.http.get(this.urlCursos)
  }

  postCursos(cursos: cursoModel){
    return this.http.post(this.urlCursos, cursos)
  }
  delCursos(id: number){
    return this.http.delete(this.urlCursos + '/' + id)
  }
  putCursos(id: number, curso: cursoModel){
    return this.http.put(this.urlCursos + '/' + id, curso)
  }

}
    export class EventEmitterService {
      
      public static emitters: {
        [teste: string]: EventEmitter<any>
      } = {}

      static get(teste: string): EventEmitter<any>{
        if(!this.emitters[teste])
        this.emitters[teste] = new EventEmitter<any>();
        return this.emitters[teste]
      }
    }

