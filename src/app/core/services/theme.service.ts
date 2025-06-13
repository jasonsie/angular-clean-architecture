import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import {
  IThemeService,
  IThemeReader,
  IThemeController,
  IThemeObservable,
  ThemeType
} from '../interfaces/theme.interface';
import { StorageService } from './storage.service';

/**
 * Theme service implementation following Observer pattern and SOLID principles
 * Single Responsibility: Manages only theme-related functionality
 * Open/Closed: Can be extended with new theme types without modification
 * Dependency Inversion: Depends on abstractions (interfaces) not concretions
 */

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements IThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly document = inject(DOCUMENT);
  private themeSubject = new BehaviorSubject<ThemeType>('light');

  public readonly themeChange$ = this.themeSubject.asObservable();

  constructor(
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeTheme();
  }

  // IThemeReader implementation
  getCurrentTheme(): ThemeType {
    return this.themeSubject.value;
  }

  isSystemThemeSupported(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all';
  }

  // IThemeController implementation
  setTheme(theme: ThemeType): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    this.storageService.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  // IThemeObservable implementation
  subscribe(callback: (theme: ThemeType) => void): Subscription {
    return this.themeChange$.subscribe(callback);
  }

  private initializeTheme(): void {
    const savedTheme = this.storageService.getItem(this.THEME_KEY) as ThemeType;
    const initialTheme = savedTheme || this.getSystemTheme();
    this.setTheme(initialTheme);
  }

  private getSystemTheme(): ThemeType {
    if (!isPlatformBrowser(this.platformId) || !this.isSystemThemeSupported()) {
      return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: ThemeType): void {
    const body = this.document.body;

    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');

    // Apply new theme
    if (theme === 'auto') {
      const systemTheme = this.getSystemTheme();
      body.classList.add(`${systemTheme}-theme`);
    } else {
      body.classList.add(`${theme}-theme`);
    }
  }
}

/**
 * Theme observer implementation following Observer pattern
 * Can be used by components to react to theme changes
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeObserver {
  constructor(private themeService: ThemeService) {}

  onThemeChange(callback: (theme: ThemeType) => void): Subscription {
    return this.themeService.subscribe(callback);
  }
}
