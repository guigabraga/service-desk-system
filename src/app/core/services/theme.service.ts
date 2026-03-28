import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  isDark = signal<boolean>(this.loadTheme())

  private loadTheme(): boolean {
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  toggleTheme(): void {
    this.isDark.update(v => !v)
    this.applyTheme();
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light')
  }

  applyTheme(): void {
    document.querySelector('html') ?.classList.toggle('app-dark', this.isDark())
  }
}