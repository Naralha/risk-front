import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url : string = "http://localhost:8081/organograma/api/usuario";

  constructor(private http: HttpClient) { }

  insertData(data : any) {
    return this.http.post(this.url, data);
  }
  fetchData() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  fetchDataIsFuncionario() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url+"/funcionario");
  }

  deleteData(data : any) {
    console.log(data);
    return this.http.delete(this.url + "/"+ data.idnVarUsuario);
  }
}
