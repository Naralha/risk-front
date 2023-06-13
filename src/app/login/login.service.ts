import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Simulate a server-side authentication check
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  getAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
