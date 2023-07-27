import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { OrganogramaComponent } from './organograma/organograma.component';
import { TableUsuarioComponent } from './usuario/table-usuario/table-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  {path: 'empresa-component', component: EmpresaComponent},
  {path: 'funcionario-component', component: FuncionarioComponent},
  {path: 'organograma-component', component: OrganogramaComponent},
  {path: 'usuario-component', component: UsuarioComponent},
  {path: 'table-usuario-component', component: TableUsuarioComponent},
  {path: '', component: LoginComponent},
  {path: 'empty-component', component: EmptyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
