import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { SuccessModalComponentComponent } from './success-modal-component/success-modal-component.component'
import { MatDialogModule } from '@angular/material/dialog';
import { OrganogramaComponent } from './organograma/organograma.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TreeOrganogramaComponent } from './organograma/tree-organograma/tree-organograma.component';
import { FormularioOrganogramaComponent } from './organograma/formulario-organograma/formulario-organograma.component';
import { EditNameDialogComponent } from './organograma/tree-organograma/edit-name-dialog/edit-name-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { UsuarioComponent } from './usuario/usuario.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableUsuarioComponent } from './usuario/table-usuario/table-usuario.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';




 

@NgModule({
    declarations: [
        AppComponent,
        EmpresaComponent,
        FuncionarioComponent,
        SuccessModalComponentComponent,
        OrganogramaComponent,
        TreeOrganogramaComponent,
        FormularioOrganogramaComponent,
        EditNameDialogComponent,
        UsuarioComponent,
        TableUsuarioComponent,
        LoginComponent,
    ],
    providers: [MatPaginator],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        HttpClientModule,
        MatDialogModule,
        MatTreeModule,
        MatSelectModule,
        MatAutocompleteModule,
        FormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatPaginatorModule
    ]
})
export class AppModule { 

  
}
