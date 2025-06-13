import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * Dashboard component for the board section
 * Displays overview metrics and quick access features
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <div class="dashboard-grid">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>analytics</mat-icon>
              Analytics
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>View your project analytics and insights</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>task</mat-icon>
              Recent Tasks
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Your latest tasks and activities</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>folder</mat-icon>
              Active Projects
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Projects currently in progress</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }

    .dashboard-card {
      mat-card-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
