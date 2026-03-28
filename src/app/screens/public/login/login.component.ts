import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

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

  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });

  erro = false;
  loading = false;

  isInvalid(campo: string): boolean {
    const control = this.loginForm.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.erro = false;

    const { usuario, senha } = this.loginForm.value;

    setTimeout(() => {
      this.loading = false;

      if (usuario === 'admin' && senha === 'admin') {
        this.router.navigate(['/chamados']);
      } else {
        this.erro = true;
      }
    }, 1000);
  }
}