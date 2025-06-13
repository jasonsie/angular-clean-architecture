import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DateService } from '../../core/services/date.service';

/**
 * Date Component refactored with SOLID principles and Material UI
 * Single Responsibility: Only handles date manipulation UI
 * Dependency Inversion: Depends on DateService abstraction
 * Open/Closed: Can be extended with new date operations without modification
 */
@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent implements OnInit {
  currentDate: Date = new Date();
  workingDate: Date = new Date();
  selectedDate: Date = new Date();
  daysToAdd = 1;
  formatOptions = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
    { value: 'full', label: 'Full' }
  ];
  selectedFormat = 'medium';

  comparisonDate: Date = new Date();

  // Injected services using inject() function
  public readonly dateService = inject(DateService);
  private readonly snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.currentDate = this.dateService.getCurrentDate();
    this.workingDate = new Date(this.currentDate);
    this.selectedDate = new Date(this.currentDate);
    this.comparisonDate = this.dateService.addDays(this.currentDate, 7);
  }

  addDays(): void {
    try {
      this.workingDate = this.dateService.addDays(this.workingDate, this.daysToAdd);
      this.showSuccessMessage(`Added ${this.daysToAdd} day(s)`);
    } catch {
      this.showErrorMessage('Error adding days');
    }
  }

  subtractDays(): void {
    try {
      this.workingDate = this.dateService.subtractDays(this.workingDate, this.daysToAdd);
      this.showSuccessMessage(`Subtracted ${this.daysToAdd} day(s)`);
    } catch {
      this.showErrorMessage('Error subtracting days');
    }
  }

  addMonths(): void {
    try {
      this.workingDate = this.dateService.addMonths(this.workingDate, 1);
      this.showSuccessMessage('Added 1 month');
    } catch {
      this.showErrorMessage('Error adding month');
    }
  }

  addYears(): void {
    try {
      this.workingDate = this.dateService.addYears(this.workingDate, 1);
      this.showSuccessMessage('Added 1 year');
    } catch {
      this.showErrorMessage('Error adding year');
    }
  }

  resetDate(): void {
    this.workingDate = new Date(this.currentDate);
    this.showSuccessMessage('Date reset to current date');
  }

  setToSelectedDate(): void {
    if (this.dateService.isValidDate(this.selectedDate)) {
      this.workingDate = new Date(this.selectedDate);
      this.showSuccessMessage('Date set to selected date');
    } else {
      this.showErrorMessage('Invalid date selected');
    }
  }

  copyWorkingDate(): void {
    const dateString = this.workingDate.toISOString();
    navigator.clipboard.writeText(dateString).then(() => {
      this.showSuccessMessage('Date copied to clipboard');
    }).catch(() => {
      this.showErrorMessage('Failed to copy date');
    });
  }

  get formattedWorkingDate(): string {
    return this.dateService.formatDate(this.workingDate, this.selectedFormat);
  }

  get relativeWorkingDate(): string {
    return this.dateService.formatRelative(this.workingDate);
  }

  get isWorkingDateWeekend(): boolean {
    return this.dateService.isWeekend(this.workingDate);
  }

  get isWorkingDateBusinessDay(): boolean {
    return this.dateService.isBusinessDay(this.workingDate);
  }

  get durationFromNow(): string {
    return this.dateService.formatDuration(this.currentDate, this.workingDate);
  }

  get durationFromComparison(): string {
    return this.dateService.formatDuration(this.comparisonDate, this.workingDate);
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
