import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';
import { SuccessModalComponentComponent } from '../success-modal-component/success-modal-component.component'
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent {
  usuarios$!: Observable<Usuario[]>;
  displayedColumns: string[] = ['nome', 'login', 'actions'];
  dataSource = new MatTableDataSource<Usuario>([]);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  e!: string;

  constructor(private paginator: MatPaginator, private service: UsuarioService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(element: any){}

}
