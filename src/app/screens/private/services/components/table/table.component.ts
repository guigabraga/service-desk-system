import { Component, inject, signal } from '@angular/core';
import { ServicesService } from '../../../../../core/services/services.service';
import { IServicesObject } from '../../../../../core/models/services-schemas/services-schemas';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [
    TableModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  private servicesService = inject(ServicesService)

  servicesList = signal<IServicesObject[]>([])

  ngOnInit(): void {
    this.servicesService.getAll().subscribe({
      next: (data) => {
        this.servicesList.set(data)
      }
    })
  }
}
