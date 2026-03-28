import { Component, input, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { PanelMenu } from 'primeng/panelmenu';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    PanelMenu,
    Button,
    Tooltip
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {

  collapsed = input<boolean>(false)
  private router = inject(Router)
  private subscription = new Subscription()

  currentPath = this.router.url;

  menuItems: MenuItem[] = [
    {
      label: 'Início',
      icon: 'pi pi-home',
      routerLink: '/home'
    },
    {
      label: 'Chamados',
      icon: 'pi pi-hammer',
      routerLink: '/services'
    },
    {
      label: 'Novo chamado',
      icon: 'pi pi-plus',
      routerLink: '/new-service'
    }
  ];

  ngOnInit(): void {
    this.updateMenuItemsState()

    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.currentPath = this.router.url
          this.updateMenuItemsState()
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  isActive(route?: string | string[]): boolean {
    if (!route) return false;
    const path = Array.isArray(route) ? `/${route.join('/')}` : route
    return this.currentPath === path || this.currentPath.startsWith(path + '/')
  }

  private updateMenuItemsState(): void {
    this.menuItems = this.menuItems.map(item => ({
      ...item,
      styleClass: this.isActive(item.routerLink as string | string[])
        ? 'active-panel-item'
        : ''
    }));
  }
}