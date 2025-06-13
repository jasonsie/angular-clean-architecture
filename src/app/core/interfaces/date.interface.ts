/**
 * Date manipulation interfaces following Interface Segregation Principle
 */

export interface IDateCalculator {
  addDays(date: Date, days: number): Date;
  addMonths(date: Date, months: number): Date;
  addYears(date: Date, years: number): Date;
  subtractDays(date: Date, days: number): Date;
}

export interface IDateFormatter {
  formatDate(date: Date, format: string): string;
  formatRelative(date: Date): string;
  formatDuration(start: Date, end: Date): string;
}

export interface IDateValidator {
  isValidDate(date: any): boolean;
  isWeekend(date: Date): boolean;
  isBusinessDay(date: Date): boolean;
}

export interface IDateService extends IDateCalculator, IDateFormatter, IDateValidator {
  getCurrentDate(): Date;
  createDate(year: number, month: number, day: number): Date;
}
