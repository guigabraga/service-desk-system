import { Component, signal } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { DialogDescriptionComponent } from './components/dialog-description/dialog-description.component';
import { IServicesObject } from '../../../core/models/services-schemas/services-schemas';

@Component({
  selector: 'app-services',
  imports: [
    TableComponent,
    DialogDescriptionComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  dialogOpen = signal<boolean>(false)
  selectedService = signal<IServicesObject | null>(null)

  openDialog(service: IServicesObject): void {
    this.dialogOpen.set(true)
    this.selectedService.set(service)
  }
}
