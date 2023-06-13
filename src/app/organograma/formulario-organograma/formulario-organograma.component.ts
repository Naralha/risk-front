import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { OrganogramaService } from '../organograma.service';

interface  OrganogramaEntity{
  id : number;
  nvarNome : string;
}

interface FuncionarioEntity{
  idnVarFuncionario : string;
  nvarNome : string;
}

@Component({
  selector: 'app-formulario-organograma',
  templateUrl: './formulario-organograma.component.html',
  styleUrls: ['./formulario-organograma.component.css']
})
export class FormularioOrganogramaComponent {
  selectedValue1!: string;
  selectedValue2!: string;

  options1 : OrganogramaEntity[] = [];
  options2 : FuncionarioEntity[] = [];

  constructor(public dialog: MatDialog, 
              private organogramaService: OrganogramaService,
              private funcionarioService: FuncionarioService) {
    organogramaService.fetchData().subscribe(res => {this.options1 = res as OrganogramaEntity[];
                                                    console.log(JSON.stringify(this.options1));});
    funcionarioService.fetchData().subscribe(res => {this.options2 = res as FuncionarioEntity[]
                                                    console.log(JSON.stringify(this.options2));});
                                                    
  }

// TODO passar o valor de usuario logado que inseriu essa empresa.  
  
recuperarValores() {
  this.organogramaService.fetchData().subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    });
    this.funcionarioService.fetchData().subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    });
}

  onSubmit() {
    console.log(this.selectedValue1, this.selectedValue2);
    this.organogramaService.save(this.selectedValue1, this.selectedValue2)
  }

  // const extractOrganogramaData = (organogramasData: any[]): OrganogramaEntity[] => {
  //   return organogramasData.map(organogramaData => ({
  //     id: organogramaData.id,
  //     nVarName: organogramaData.nVarName
  //   }));
  // };
}
