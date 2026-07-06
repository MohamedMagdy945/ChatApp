import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  
  isDarkMode = signal<boolean>(true);

  toggleTheme(): void {
    this.setTheme(!this.isDarkMode());
  }

  setTheme(darkMode: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;
    this.isDarkMode.set(darkMode);

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}