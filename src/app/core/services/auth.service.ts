import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router)
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
    this.router.navigate(['/login'])
  }
}
