import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenu } from 'primeng/panelmenu';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterModule,
    PanelMenu,
    Button,
    Tooltip
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  collapsed = input<boolean>(false)

  menuItems: MenuItem[] = [
    {
      label: 'Início',
      icon: 'pi pi-home',
      routerLink: '/home'
    }
  ]
}
