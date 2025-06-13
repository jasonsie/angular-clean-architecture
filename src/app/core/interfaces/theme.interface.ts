/**
 * Theme interfaces following Interface Segregation Principle
 */

export type ThemeType = 'light' | 'dark' | 'auto';

export interface IThemeReader {
  getCurrentTheme(): ThemeType;
  isSystemThemeSupported(): boolean;
}

export interface IThemeController {
  setTheme(theme: ThemeType): void;
  toggleTheme(): void;
}

export interface IThemeObservable {
  themeChange$: Observable<ThemeType>;
  subscribe(callback: (theme: ThemeType) => void): Subscription;
}

export interface IThemeService extends IThemeReader, IThemeController, IThemeObservable {}

import { Observable, Subscription } from 'rxjs';
