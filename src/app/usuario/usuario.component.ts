import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { SuccessModalComponentComponent } from '../success-modal-component/success-modal-component.component'
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Usuario } from '../models/usuario.interface';
import { Funcionario } from '../models/funcionario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  form: FormGroup;
  checked = false;
  usuario? : Usuario;
  

  constructor(private router: Router,private formBuilder: FormBuilder, private service: UsuarioService, public dialog: MatDialog) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  submit() {
    this.montarObjeto();
    console.log(this.usuario);
    // console.log({nvarNome: this.form.get('nome')?.value, nvarEmail: this.form.get('nome')?.value, nvarDescricao: this.form.get('descricao')?.value});
    this.service.insertData(this.usuario
                            //alterar pro id da empresa logado.
                            //  empresa: {id: "1"}
                            ).subscribe({
      next: (n) => console.log(n),
      error: (e) => console.error(e)
    })
    this.openSuccessModal();
  }

  openSuccessModal() {
    const dialogRef = this.dialog.open(SuccessModalComponentComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleFields(event: MatCheckboxChange) {
    this.checked = event.checked;
    if (this.checked) {
      // Add new form controls here when the checkbox is checked
      this.form.addControl('email', this.formBuilder.control(''));
      this.form.addControl('descricao', this.formBuilder.control(''));
    } else {
      // Remove form controls here when the checkbox is unchecked
      this.form.removeControl('email');
      this.form.removeControl('descricao');
    }
  }

  montarObjeto(){
    this.usuario = {
      nvarNome: this.form.get('nome')?.value,
      idnVarUsuarioCadastro: this.form.get('login')?.value,
      nvarSenha: this.form.get('senha')?.value
    };
    if(this.checked){
      const funcionario : Funcionario = {
        nvarEmail: this.form.get('email')?.value,
        nvarDescricao: this.form.get('descricao')?.value
      }
      this.usuario.funcionario = funcionario;
    }
  }

  find(){
    this.router.navigate(['/table-usuario-component']);
  }
}
