import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

// Angular Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

/**
 * Layout component that provides the main structure for the board section
 * Implements responsive design with collapsible sidebar
 * Follows SOLID principles: Single Responsibility - handles layout structure only
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly breakpointObserver = inject(BreakpointObserver);

  // Reactive state using signals (Angular 17+ pattern)
  public readonly isSidenavOpen = signal<boolean>(true);
  public readonly isHandset = signal<boolean>(false);

  // Computed values based on reactive state
  public readonly sidenavMode = computed(() => this.isHandset() ? 'over' : 'side');
  public readonly sidenavHasBackdrop = computed(() => this.isHandset());

  ngOnInit(): void {
    this.initializeResponsiveLayout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize responsive layout behavior
   * Observes breakpoint changes and updates sidebar state accordingly
   */
  private initializeResponsiveLayout(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        takeUntil(this.destroy$)
      )
      .subscribe(isHandset => {
        this.isHandset.set(isHandset);
        // Auto-close sidebar on mobile devices
        if (isHandset) {
          this.isSidenavOpen.set(false);
        } else {
          this.isSidenavOpen.set(true);
        }
      });
  }

  /**
   * Toggle sidebar visibility
   * Pure function that doesn't mutate external state directly
   */
  public toggleSidenav(): void {
    this.isSidenavOpen.update(current => !current);
  }

  /**
   * Close sidebar (typically called on mobile when route changes)
   */
  public closeSidenav(): void {
    if (this.isHandset()) {
      this.isSidenavOpen.set(false);
    }
  }
}
