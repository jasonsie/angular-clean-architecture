import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

/**
 * Settings component for application configuration
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <div class="settings-container">
      <h1>Settings</h1>

      <div class="settings-grid">
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Profile Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Display Name</mat-label>
                <input matInput value="John Doe">
              </mat-form-field>
            </div>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" value="john.doe@example.com">
              </mat-form-field>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Save Profile</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Application Preferences</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Theme</mat-label>
                <mat-select value="light">
                  <mat-option value="light">Light</mat-option>
                  <mat-option value="dark">Dark</mat-option>
                  <mat-option value="auto">Auto</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="form-row">
              <mat-slide-toggle checked>Enable Notifications</mat-slide-toggle>
            </div>
            <div class="form-row">
              <mat-slide-toggle>Auto-save Changes</mat-slide-toggle>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Save Preferences</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Security</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="form-row">
              <mat-slide-toggle checked>Two-Factor Authentication</mat-slide-toggle>
            </div>
            <div class="form-row">
              <mat-slide-toggle checked>Login Notifications</mat-slide-toggle>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Update Security</button>
            <button mat-button color="warn">Change Password</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }

    .settings-card {
      .form-row {
        margin-bottom: 16px;

        mat-form-field {
          width: 100%;
        }
      }

      mat-card-actions {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {}
