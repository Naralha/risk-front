import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  
  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
   }

  //mock login
  login() {
    // Implement your login logic here
    this.loginService.login(this.form.get('email')?.value, this.form.get('password')?.value);
  }
}
