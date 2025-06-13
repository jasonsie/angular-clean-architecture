import { Injectable } from '@angular/core';
import {
  IDateService,
  IDateCalculator,
  IDateFormatter,
  IDateValidator
} from '../interfaces/date.interface';

/**
 * Date calculator implementation following Single Responsibility Principle
 * Only handles date calculations
 */
@Injectable({
  providedIn: 'root'
})
export class DateCalculator implements IDateCalculator {

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  subtractDays(date: Date, days: number): Date {
    return this.addDays(date, -days);
  }
}

/**
 * Date formatter implementation following Single Responsibility Principle
 * Only handles date formatting
 */
@Injectable({
  providedIn: 'root'
})
export class DateFormatter implements IDateFormatter {

  formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {};

    switch (format) {
      case 'short':
        return date.toLocaleDateString();
      case 'medium':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      case 'long':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'full':
        return date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      default:
        return date.toISOString();
    }
  }

  formatRelative(date: Date): string {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays === -1) return 'Tomorrow';
    if (diffDays > 0) return `${diffDays} days ago`;
    return `In ${Math.abs(diffDays)} days`;
  }

  formatDuration(start: Date, end: Date): string {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day(s)`;
    if (diffHours > 0) return `${diffHours} hour(s)`;
    return `${diffMinutes} minute(s)`;
  }
}

/**
 * Date validator implementation following Single Responsibility Principle
 * Only handles date validation
 */
@Injectable({
  providedIn: 'root'
})
export class DateValidator implements IDateValidator {

  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  }

  isBusinessDay(date: Date): boolean {
    return !this.isWeekend(date);
  }
}

/**
 * Main date service using Composition pattern
 * Following Dependency Inversion Principle
 */
@Injectable({
  providedIn: 'root'
})
export class DateService implements IDateService {

  constructor(
    private calculator: DateCalculator,
    private formatter: DateFormatter,
    private validator: DateValidator
  ) {}

  // IDateCalculator methods
  addDays(date: Date, days: number): Date {
    return this.calculator.addDays(date, days);
  }

  addMonths(date: Date, months: number): Date {
    return this.calculator.addMonths(date, months);
  }

  addYears(date: Date, years: number): Date {
    return this.calculator.addYears(date, years);
  }

  subtractDays(date: Date, days: number): Date {
    return this.calculator.subtractDays(date, days);
  }

  // IDateFormatter methods
  formatDate(date: Date, format: string): string {
    return this.formatter.formatDate(date, format);
  }

  formatRelative(date: Date): string {
    return this.formatter.formatRelative(date);
  }

  formatDuration(start: Date, end: Date): string {
    return this.formatter.formatDuration(start, end);
  }

  // IDateValidator methods
  isValidDate(date: any): boolean {
    return this.validator.isValidDate(date);
  }

  isWeekend(date: Date): boolean {
    return this.validator.isWeekend(date);
  }

  isBusinessDay(date: Date): boolean {
    return this.validator.isBusinessDay(date);
  }

  // Additional methods
  getCurrentDate(): Date {
    return new Date();
  }

  createDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day); // month is 0-indexed
  }
}
