import { Component, inject, signal, output } from '@angular/core';
import { ServicesService } from '../../../../../core/services/services.service';
import { IServicesObject } from '../../../../../core/models/services-schemas/services-schemas';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Select } from 'primeng/select';
import dayjs from 'dayjs';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    Button,
    FormsModule,
    Toast,
    Select
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
    providers: [MessageService]
})
export class TableComponent {
  private servicesService = inject(ServicesService)
  private messageService = inject(MessageService);

  serviceDetails = output<IServicesObject>()
  servicesList = signal<IServicesObject[]>([])

  ngOnInit(): void {
    this.servicesService.getAll().subscribe({
      next: (data) => {
        this.servicesList.set(data)
      }
    })
  }

  formatDate(date: string): string {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
  }

  statusOptions = [
    { label: 'Aberto', value: 'Aberto' },
    { label: 'Em atendimento', value: 'Em atendimento' },
    { label: 'Finalizado', value: 'Finalizado' },
    { label: 'Cancelado', value: 'Cancelado' }
  ];

  updateStatus(evento: { id: string, status: IServicesObject['status'] }): void {
    this.servicesService.updateStatus(evento.id, evento.status).subscribe({
      next: () => {
        this.servicesList.update(lista =>
          lista.map(s => s.id === evento.id ? { ...s, status: evento.status } : s)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Status atualizado com sucesso'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar o status'
        });
      }
    });
  }
}
