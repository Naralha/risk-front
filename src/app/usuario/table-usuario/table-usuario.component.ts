import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../usuario.service';
import { Usuario } from 'src/app/models/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { from, map, of, tap } from 'rxjs';


@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.css']
})
export class TableUsuarioComponent {
  usuarios$!: Observable<Usuario[]>;
  displayedColumns: string[] = ['nome', 'login', 'actions'];
  dataSource = new MatTableDataSource<Usuario>([]);
  
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  e!: string;

  constructor(private paginator: MatPaginator, private service: UsuarioService) {}

  ngOnInit() {
    this.service.fetchData().subscribe(usuario => {
      this.dataSource = new MatTableDataSource<Usuario>(usuario);
      console.log("usuarioComponent: " + JSON.stringify(usuario));
    });
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(element: any){}
  
  removeRow(element: any){
    this.service.deleteData(element as Usuario).subscribe(e => console.log(e));
    const index = this.dataSource.data.findIndex((item: any) => JSON.stringify(item) === JSON.stringify(element));
    console.log(index);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource<Usuario>(this.dataSource.data);
  }
      

}



