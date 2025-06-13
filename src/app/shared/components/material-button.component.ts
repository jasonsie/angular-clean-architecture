import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export type ButtonVariant = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';
export type ButtonColor = 'primary' | 'accent' | 'warn';

/**
 * Reusable Material Button Component following Open/Closed Principle
 * Can be extended for new button types without modifying existing code
 */
@Component({
  selector: 'app-material-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <ng-container [ngSwitch]="variant">
      <button *ngSwitchCase="'basic'" mat-button [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon *ngIf="icon" aria-hidden="true">{{ icon }}</mat-icon>
        <ng-content></ng-content>
      </button>

      <button *ngSwitchCase="'raised'" mat-raised-button [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon *ngIf="icon" aria-hidden="true">{{ icon }}</mat-icon>
        <ng-content></ng-content>
      </button>

      <button *ngSwitchCase="'stroked'" mat-stroked-button [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon *ngIf="icon" aria-hidden="true">{{ icon }}</mat-icon>
        <ng-content></ng-content>
      </button>

      <button *ngSwitchCase="'flat'" mat-flat-button [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon *ngIf="icon" aria-hidden="true">{{ icon }}</mat-icon>
        <ng-content></ng-content>
      </button>

      <button *ngSwitchCase="'icon'" mat-icon-button [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon aria-hidden="true">{{ icon }}</mat-icon>
      </button>

      <button *ngSwitchCase="'fab'" mat-fab [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon aria-hidden="true">{{ icon }}</mat-icon>
      </button>

      <button *ngSwitchCase="'mini-fab'" mat-mini-fab [color]="color" [disabled]="disabled"
              [matTooltip]="tooltip" (click)="onClick()" [attr.aria-label]="tooltip">
        <mat-icon aria-hidden="true">{{ icon }}</mat-icon>
      </button>
    </ng-container>
  `
})
export class MaterialButtonComponent {
  @Input() variant: ButtonVariant = 'basic';
  @Input() color: ButtonColor = 'primary';
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() tooltip?: string;

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
