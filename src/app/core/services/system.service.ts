import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ISystemInfoProvider,
  IApiTester,
  SystemInfo,
  BrowserInfo,
  NetworkInfo
} from '../interfaces/system.interface';
import { environment } from '../../../environments/environment';

/**
 * System info provider following Single Responsibility Principle
 * Only responsible for gathering system information
 */
@Injectable({
  providedIn: 'root'
})
export class SystemInfoProvider implements ISystemInfoProvider {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getSystemInfo(): SystemInfo {
    return {
      timestamp: new Date(),
      apiUrl: environment.apiUrl,
      userAgent: isPlatformBrowser(this.platformId) ? navigator.userAgent : 'SSR',
      platform: isPlatformBrowser(this.platformId) ? navigator.platform : 'SSR',
      browser: this.getBrowserInfo(),
      network: this.getNetworkInfo()
    };
  }

  getBrowserInfo(): BrowserInfo {
    if (!isPlatformBrowser(this.platformId)) {
      return {
        name: 'SSR',
        version: 'SSR',
        language: 'en',
        cookieEnabled: false
      };
    }

    const nav = navigator;
    return {
      name: this.getBrowserName(),
      version: this.getBrowserVersion(),
      language: nav.language,
      cookieEnabled: nav.cookieEnabled
    };
  }

  getNetworkInfo(): NetworkInfo {
    if (!isPlatformBrowser(this.platformId)) {
      return {
        isOnline: true,
        connectionType: 'unknown',
        effectiveType: 'unknown'
      };
    }

    const nav = navigator as any;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    return {
      isOnline: nav.onLine,
      connectionType: connection?.type || 'unknown',
      effectiveType: connection?.effectiveType || 'unknown'
    };
  }

  private getBrowserName(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return 'SSR';
    }

    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getBrowserVersion(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return 'SSR';
    }

    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/);
    return match ? match[2] : 'Unknown';
  }
}

/**
 * API tester following Single Responsibility Principle
 * Only responsible for testing API connections
 */
@Injectable({
  providedIn: 'root'
})
export class ApiTester implements IApiTester {

  async testConnection(): Promise<boolean> {
    try {
      const startTime = performance.now();
      const response = await fetch(environment.apiUrl, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return true; // If we reach here, connection was successful
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  async getApiStatus(): Promise<{ status: string; responseTime: number }> {
    const startTime = performance.now();
    try {
      const response = await fetch(environment.apiUrl, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      const endTime = performance.now();
      return {
        status: 'online',
        responseTime: endTime - startTime
      };
    } catch (error) {
      const endTime = performance.now();
      return {
        status: 'offline',
        responseTime: endTime - startTime
      };
    }
  }
}

/**
 * Main system service combining both providers using Composition pattern
 * Following Dependency Inversion Principle
 */
@Injectable({
  providedIn: 'root'
})
export class SystemService {
  constructor(
    private systemInfoProvider: SystemInfoProvider,
    private apiTester: ApiTester
  ) {}

  getSystemInfo(): SystemInfo {
    return this.systemInfoProvider.getSystemInfo();
  }

  async testApiConnection(): Promise<boolean> {
    return this.apiTester.testConnection();
  }

  async getApiStatus(): Promise<{ status: string; responseTime: number }> {
    return this.apiTester.getApiStatus();
  }

  getBrowserInfo(): BrowserInfo {
    return this.systemInfoProvider.getBrowserInfo();
  }

  getNetworkInfo(): NetworkInfo {
    return this.systemInfoProvider.getNetworkInfo();
  }
}
