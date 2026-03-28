import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(this.loadAuth())

  private loadAuth(): boolean {
    return localStorage.getItem('auth') === 'true'
  }

  login(): void {
    localStorage.setItem('auth', 'true')
    this.isAuthenticated.set(true)
  }

  logout(): void {
    localStorage.removeItem('auth')
    this.isAuthenticated.set(false)
  }
}
