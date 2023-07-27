import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user : Usuario | undefined;
  private authenticated: boolean = false;
  
  constructor(private router: Router) { }

  login(username: string, password: string): void {
    // Simulate a server-side authentication check
    if (username == 'admin' && password == 'password') {
      this.userAdmin();
      this.authenticated = true;
      this.router.navigate(['/empty-component']);
    }
    if (username == 'super-admin' && password == 'password') {
      this.superAdmin();
      this.authenticated = true;
      this.router.navigate(['/empty-component']);
    }
  }

  logout(): void {
    this.authenticated = false;
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  userAdmin(): void {
    this.user = {
    nvarNome: 'Admin User',
    idnVarUsuarioCadastro: 'admin-123',
    nvarSenha: 'adminpassword',
    role: {
            nome: 'admin',
            permissions:[{name: 'Organograma', path:'teste',
                          children: [
                                      { name: 'Organograma', path: '/organograma-component' },
                                      { name: 'Empresa', path: '/empresa-component' }
                                    ]
                        }],
          }
    };
  }

  superAdmin(): void {
    this.user = {
      nvarNome: 'Super Admin User',
      idnVarUsuarioCadastro: 'super-admin-456',
      nvarSenha: 'superadminpassword',
      role: {
        nome: 'admin',
        permissions:[{name: 'Organograma', path:'teste',
                      children: [
                                  { name: 'Organograma', path: '/organograma-component' },
                                  { name: 'Empresa', path: '/empresa-component' },
                                  { name: 'Funcionario', path: '/funcionario-component' },
                                  { name: 'Usuario', path: '/usuario-component' }
                                ]
                    }],
             }
    };
  }

}

