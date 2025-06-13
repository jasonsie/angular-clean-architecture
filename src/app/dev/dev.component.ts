import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import { map, switchMap, catchError, tap, startWith, shareReplay, takeUntil, finalize } from 'rxjs/operators';

import { SystemService } from '../core/services/system.service';
import { StorageService } from '../core/services/storage.service';
import { ThemeService, ThemeObserver } from '../core/services/theme.service';
import { SystemInfo } from '../core/interfaces/system.interface';
import { ThemeType } from '../core/interfaces/theme.interface';

/**
 * Dev Component refactored with SOLID principles and Material UI
 * Single Responsibility: Only handles development tools UI
 * Dependency Inversion: Depends on service abstractions
 * Open/Closed: Can be extended with new dev tools without modification
 */
@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.scss'
})
export class DevComponent implements OnInit, OnDestroy {
  // RxJS subjects and observables
  private destroy$ = new Subject<void>();
  private refreshSystemInfo$ = new Subject<void>();
  private testApiTrigger$ = new Subject<void>();

  // Observable streams
  systemInfo$!: Observable<SystemInfo>;
  currentTheme$!: Observable<ThemeType>;
  browserFeatures$!: Observable<string[]>;
  apiStatus$!: Observable<{ status: string; responseTime: number } | null>;
  isLoadingApi$!: Observable<boolean>;

  // Injected services using inject() function
  private readonly systemService = inject(SystemService);
  private readonly storageService = inject(StorageService);
  private readonly themeService = inject(ThemeService);
  private readonly themeObserver = inject(ThemeObserver);
  private readonly snackBar = inject(MatSnackBar);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    // Initialize observables in constructor
    this.initializeObservables();
  }

  ngOnInit(): void {
    // Trigger initial data load
    this.refreshSystemInfo$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeObservables(): void {
    // System info stream that refreshes when triggered
    this.systemInfo$ = this.refreshSystemInfo$.pipe(
      startWith(null), // Emit initially
      switchMap(() => of(this.systemService.getSystemInfo())),
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    // Current theme stream
    this.currentTheme$ = new Observable<ThemeType>(subscriber => {
      subscriber.next(this.themeService.getCurrentTheme());
      const subscription = this.themeObserver.onThemeChange((theme: ThemeType) => {
        subscriber.next(theme);
      });
      return () => subscription?.unsubscribe();
    }).pipe(
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    // Browser features stream based on system info
    this.browserFeatures$ = this.systemInfo$.pipe(
      map(systemInfo => this.getBrowserFeatures(systemInfo)),
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    // API testing streams - use a BehaviorSubject for loading state
    const isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoadingApi$ = isLoadingSubject.asObservable().pipe(
      takeUntil(this.destroy$)
    );

    this.apiStatus$ = this.testApiTrigger$.pipe(
      tap(() => {
        isLoadingSubject.next(true);
        this.showApiTestStarted();
      }),
      switchMap(() =>
        combineLatest([
          this.systemService.testApiConnection(),
          this.systemService.getApiStatus()
        ]).pipe(
          map(([isConnected, status]) => {
            this.showApiTestResult(isConnected, status);
            return status;
          }),
          catchError(() => {
            this.showApiTestError();
            return of(null);
          }),
          finalize(() => isLoadingSubject.next(false))
        )
      ),
      startWith(null),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  testApi(): void {
    this.testApiTrigger$.next();
  }

  private showApiTestStarted(): void {
    this.snackBar.open('Testing API connection...', 'Close', {
      duration: 2000,
      panelClass: ['info-snackbar']
    });
  }

  private showApiTestResult(isConnected: boolean, status: { status: string; responseTime: number }): void {
    const message = isConnected
      ? `API is online (${status.responseTime.toFixed(2)}ms)`
      : 'API connection failed';

    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isConnected ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  private showApiTestError(): void {
    this.snackBar.open('Error testing API connection', 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  clearStorage(): void {
    try {
      this.storageService.clear();
      this.snackBar.open('Storage cleared successfully', 'Close', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    } catch {
      this.snackBar.open('Error clearing storage', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  clearLocalStorage(): void {
    try {
      this.storageService.switchToLocalStorage();
      this.storageService.clear();
      this.snackBar.open('Local storage cleared', 'Close', { duration: 2000 });
    } catch {
      this.snackBar.open('Error clearing local storage', 'Close', { duration: 3000 });
    }
  }

  clearSessionStorage(): void {
    try {
      this.storageService.switchToSessionStorage();
      this.storageService.clear();
      this.snackBar.open('Session storage cleared', 'Close', { duration: 2000 });
    } catch {
      this.snackBar.open('Error clearing session storage', 'Close', { duration: 3000 });
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  refreshSystemInfo(): void {
    this.refreshSystemInfo$.next();
    this.snackBar.open('System info refreshed', 'Close', { duration: 2000 });
  }

  private getBrowserFeatures(systemInfo: SystemInfo | null): string[] {
    if (!isPlatformBrowser(this.platformId) || !systemInfo?.browser) {
      return [];
    }

    const features: string[] = [];
    if (systemInfo.browser.cookieEnabled) features.push('Cookies');
    if (typeof window !== 'undefined') {
      if ('serviceWorker' in navigator) features.push('Service Worker');
      if ('geolocation' in navigator) features.push('Geolocation');
      if ('Notification' in window) features.push('Notifications');
    }

    return features;
  }

  /**
   * TrackBy function for browser features ngFor loop
   * Improves performance by tracking items by their value
   */
  trackByFeature(index: number, feature: string): string {
    return feature;
  }
}
