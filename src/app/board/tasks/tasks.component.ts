import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Tasks component for task management
 */
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="tasks-container">
      <div class="tasks-header">
        <h1>Tasks</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Task
        </button>
      </div>

      <div class="tasks-list">
        <mat-card class="task-card">
          <mat-card-content>
            <div class="task-header">
              <h3>Implement user authentication</h3>
              <mat-chip-set>
                <mat-chip color="primary" selected>High Priority</mat-chip>
              </mat-chip-set>
            </div>
            <p>Add login and registration functionality with JWT tokens.</p>
            <div class="task-meta">
              <span>Due: March 15, 2025</span>
              <span>Assigned to: John Doe</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="task-card">
          <mat-card-content>
            <div class="task-header">
              <h3>Design system documentation</h3>
              <mat-chip-set>
                <mat-chip color="accent" selected>Medium Priority</mat-chip>
              </mat-chip-set>
            </div>
            <p>Create comprehensive documentation for the design system components.</p>
            <div class="task-meta">
              <span>Due: March 20, 2025</span>
              <span>Assigned to: Jane Smith</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .tasks-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .tasks-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .task-card {
      .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        h3 {
          margin: 0;
        }
      }

      .task-meta {
        display: flex;
        gap: 24px;
        margin-top: 16px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {}
