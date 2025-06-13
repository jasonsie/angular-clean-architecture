/**
 * System Info interfaces following Single Responsibility Principle
 */

export interface SystemInfo {
  timestamp: Date;
  apiUrl: string;
  userAgent: string;
  platform: string;
  browser?: BrowserInfo;
  network?: NetworkInfo;
}

export interface BrowserInfo {
  name: string;
  version: string;
  language: string;
  cookieEnabled: boolean;
}

export interface NetworkInfo {
  isOnline: boolean;
  connectionType?: string;
  effectiveType?: string;
}

export interface ISystemInfoProvider {
  getSystemInfo(): SystemInfo;
  getBrowserInfo(): BrowserInfo;
  getNetworkInfo(): NetworkInfo;
}

export interface IApiTester {
  testConnection(): Promise<boolean>;
  getApiStatus(): Promise<{ status: string; responseTime: number }>;
}
