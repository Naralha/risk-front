import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Organograma } from '../models/organograma.interface';


@Injectable({
  providedIn: 'root'
})
export class OrganogramaService {
  
  private url : string = "http://localhost:8081/organograma/api/organograma";
  private urlFuncionarioOrganograma : string = "http://localhost:8081/organograma/api/funcionario-organogramas";

  TREE_DATA : Organograma[] = []

  constructor(private http: HttpClient) { }

  setTreeData(organograma : Organograma[]){
      this.TREE_DATA = organograma;
  }

  getTreeData() : Organograma[]{
    return this.TREE_DATA;
  }
  
  insertData(data : any) {
    return this.http.post(this.url, data);
  }

  fetchData() {
    return this.http.get(this.url + "/empresaId/1"); 
  }

  fetchDataArray() {
    return this.http.get(this.url + "/array/empresaId/1"); 
  }

  save(selectedValue1: string, selectedValue2: string) {
    console.log()
  }
}
