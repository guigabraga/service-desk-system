import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';
import { ServicesService } from '../../../core/services/services.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

type TCategory = {
  name: "Infra" | "Acesso" | "Software" | "Conexão";
  value: "Infra" | "Acesso" | "Software" | "Conexão";
}

@Component({
  selector: 'app-new-service',
  imports: [
    Card,
    ReactiveFormsModule,
    InputText,
    Textarea,
    SelectModule,
    Button,
    ToastModule
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css',
  providers: [MessageService]
})
export class NewServiceComponent {

  themeService = inject(ThemeService)
  private form = inject(FormBuilder);
  private servicesService = inject(ServicesService)
  private messageService = inject(MessageService);
  categories: TCategory[] = []
  erro = false;
  loading = false;

  ngOnInit() {
    this.categories = [
      {
        name: "Infra",
        value: "Infra"
      },
      {
        name: "Acesso",
        value: "Acesso"
      },
      {
        name: "Software",
        value: "Software"
      },
      {
        name: "Conexão",
        value: "Conexão"
      }
    ]
  }

  newService: FormGroup = this.form.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(250)]],
    category: ['', Validators.required],
  });

  isInvalid(field: string): boolean {
    const control = this.newService.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  onSubmit(): void {
    if (this.newService.invalid) {
      this.newService.markAllAsTouched();
      return;
    }

    this.loading = true;

    setTimeout(() => {
      const newData = {
        title: this.newService.value.title,
        description: this.newService.value.description,
        category: this.newService.value.category.value
      }

      this.servicesService.create(newData).subscribe({
        next: (response) => {
          this.newService.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Novo chamado ID: ${response.id} criado com sucesso`
          })
          this.loading = false
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao criar novo chamado'
          })
          this.loading = false
        }
      })
      
    }, 1000);
  }

}
