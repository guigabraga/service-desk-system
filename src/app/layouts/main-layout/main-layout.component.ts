import { Component, inject, HostListener, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  themeService = inject(ThemeService)
  sidebarCollapsed = signal<boolean>(false);

  ngOnInit(): void {
    this.themeService.applyTheme()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (window.innerWidth < 600) {
      this.sidebarCollapsed.set(true);
    } else {
      this.sidebarCollapsed.set(false);
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
