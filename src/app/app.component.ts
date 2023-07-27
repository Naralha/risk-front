import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHandset$: Observable<boolean>;

  options = [   {name: 'Organograma', path:'teste',
                    children: [{ name: 'Organograma', path: '/organograma-component' },
                               { name: 'Empresa', path: '/empresa-component' },
                               { name: 'Funcionario', path: '/funcionario-component' },
                               { name: 'Usuario', path: '/usuario-component' },]
                },
                { name: 'Option 1', path: '/option1' },
                { name: 'Option 2', path: '/option2' },
                { name: 'Option 3', path: '/option3' }
            ];

  routeTo(path: string) {
    this.router.navigateByUrl(path);
  }

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public loginService: LoginService) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  logout() {
      this.loginService.logout();
  }
}
