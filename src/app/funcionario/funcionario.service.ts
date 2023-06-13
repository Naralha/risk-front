import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private url : string = "http://localhost:8081/organograma/api/funcionario";

  constructor(private http: HttpClient) { }

  insertData(data : any) {
    return this.http.post(this.url, data);
  }
  fetchData() {
    return this.http.get(this.url + "/empresaId/1");
  }
}
