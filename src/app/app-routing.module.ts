import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { OrganogramaComponent } from './organograma/organograma.component';

const routes: Routes = [
  {path: 'empresa-component', component: EmpresaComponent},
  {path: 'funcionario-component', component: FuncionarioComponent},
  {path: 'organograma-component', component: OrganogramaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
