import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [
    ToolbarModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  themeService = inject(ThemeService)

  ngOnInit(): void {
    this.themeService.applyTheme()
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }
}
