import { Component, inject, output } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { ThemeService } from '../../../../core/services/theme.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    Button,
    Toolbar,
    Tooltip
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  themeService = inject(ThemeService)
  authService = inject(AuthService)
  onToggleSidebar = output<void>()

  toggleSidebar(): void {
    this.onToggleSidebar.emit()
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  logout(): void {
    this.authService.logout()
  }
}
