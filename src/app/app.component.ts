import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';

import { ThemeService, ThemeObserver } from './core/services/theme.service';
import { ThemeType } from './core/interfaces/theme.interface';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Material App';
  currentTheme: ThemeType = 'light';
  private themeSubscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private themeObserver: ThemeObserver
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes using Observer pattern
    this.themeSubscription = this.themeObserver.onThemeChange((theme) => {
      this.currentTheme = theme;
    });

    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }
}
