import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * Analytics component for data visualization and reporting
 */
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="analytics-container">
      <h1>Analytics</h1>
      <div class="analytics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-header">
              <mat-icon>trending_up</mat-icon>
              <h3>Project Completion Rate</h3>
            </div>
            <div class="metric-value">85%</div>
            <div class="metric-change positive">+5% from last month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-header">
              <mat-icon>schedule</mat-icon>
              <h3>Average Task Duration</h3>
            </div>
            <div class="metric-value">3.2 days</div>
            <div class="metric-change negative">+0.3 days from last month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-header">
              <mat-icon>group</mat-icon>
              <h3>Team Productivity</h3>
            </div>
            <div class="metric-value">92%</div>
            <div class="metric-change positive">+3% from last month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-header">
              <mat-icon>bug_report</mat-icon>
              <h3>Bug Resolution Time</h3>
            </div>
            <div class="metric-value">1.8 days</div>
            <div class="metric-change positive">-0.4 days from last month</div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }

    .metric-card {
      .metric-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;

        h3 {
          margin: 0;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.6);
        }

        mat-icon {
          color: #3f51b5;
        }
      }

      .metric-value {
        font-size: 36px;
        font-weight: bold;
        color: #3f51b5;
        margin-bottom: 8px;
      }

      .metric-change {
        font-size: 14px;

        &.positive {
          color: #4caf50;
        }

        &.negative {
          color: #f44336;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {}
