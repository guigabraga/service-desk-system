import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Card,
    InputText,
    Password,
    Button,
    Message
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  themeService = inject(ThemeService)
  private authService = inject(AuthService);
  private form = inject(FormBuilder);
  private router = inject(Router);
  erro = signal<boolean>(false)
  loading = signal<boolean>(false)

  loginForm: FormGroup = this.form.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });
  
  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  onSubmit(): void {

    this.loading.set(true)

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { usuario, senha } = this.loginForm.value;

    setTimeout(() => {
      if (usuario === 'admin' && senha === 'admin') {
        this.authService.login()
        this.router.navigate(['/home']);
        this.loading.set(false)
      } else {
        console.log('erro')
        this.loading.set(false)
        this.erro.set(true)
      }
    }, 1000);
  }
}