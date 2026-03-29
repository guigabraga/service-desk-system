import { Component, input, output } from '@angular/core';
import { IServicesObject } from '../../../../../core/models/services-schemas/services-schemas';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-dialog-description',
  imports: [
    Dialog,
    Button,
    DividerModule,
    MessageModule
  ],
  templateUrl: './dialog-description.component.html',
  styleUrl: './dialog-description.component.css',
})
export class DialogDescriptionComponent {
  service = input<IServicesObject | null>(null);
  visible = input<boolean>(false);
  visibleChange = output<boolean>();
}
