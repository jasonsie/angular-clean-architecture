import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Reusable Material Card Component following Template Method pattern
 * Provides a consistent card structure that can be customized
 */
@Component({
  selector: 'app-material-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card [class]="additionalClasses">
      <mat-card-header *ngIf="title || subtitle">
        <mat-card-title *ngIf="title">{{ title }}</mat-card-title>
        <mat-card-subtitle *ngIf="subtitle">{{ subtitle }}</mat-card-subtitle>
      </mat-card-header>

      <img *ngIf="imageUrl" mat-card-image [src]="imageUrl" [alt]="imageAlt" />

      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>

      <mat-card-actions *ngIf="hasActions" [align]="actionsAlignment">
        <ng-content select="[slot=actions]"></ng-content>
      </mat-card-actions>
    </mat-card>
  `,
})
export class MaterialCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() imageAlt = '';
  @Input() hasActions = false;
  @Input() actionsAlignment: 'start' | 'end' = 'start';
  @Input() additionalClasses = '';
}
