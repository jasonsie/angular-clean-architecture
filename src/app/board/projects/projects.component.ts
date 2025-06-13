import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Projects component for managing project portfolios
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="projects-container">
      <div class="projects-header">
        <h1>Projects</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Project
        </button>
      </div>

      <div class="projects-grid">
        <mat-card class="project-card">
          <mat-card-header>
            <mat-card-title>Project Alpha</mat-card-title>
            <mat-card-subtitle>Web Application</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>A modern web application built with Angular and Material Design.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button>VIEW</button>
            <button mat-button>EDIT</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="project-card">
          <mat-card-header>
            <mat-card-title>Project Beta</mat-card-title>
            <mat-card-subtitle>Mobile App</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Cross-platform mobile application development project.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button>VIEW</button>
            <button mat-button>EDIT</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .projects-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .project-card {
      mat-card-actions {
        display: flex;
        gap: 8px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {}
