import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  private url : string = "http://localhost:8081/organograma/api/empresas";

  constructor(private http: HttpClient) { }

  insertData(data : any) {
    return this.http.post(this.url, data);
  }
}
