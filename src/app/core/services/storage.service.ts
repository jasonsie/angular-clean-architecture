import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  IStorage,
  IStorageFactory,
  IStorageReader,
  IStorageWriter,
  IStorageCleaner
} from '../interfaces/storage.interface';

/**
 * Storage implementation following Single Responsibility Principle
 * Each storage type has its own implementation
 */

@Injectable({
  providedIn: 'root'
})
export class BrowserStorage implements IStorage {
  constructor(
    private storage: Storage,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // IStorageReader implementation
  getItem(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      return this.storage.getItem(key);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  getAllKeys(): string[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    try {
      return Object.keys(this.storage);
    } catch (error) {
      console.error('Error getting storage keys:', error);
      return [];
    }
  }

  // IStorageWriter implementation
  setItem(key: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      this.storage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  }

  removeItem(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  // IStorageCleaner implementation
  clear(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  clearNamespace(namespace: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const keys = this.getAllKeys().filter(key => key.startsWith(namespace));
      keys.forEach(key => this.removeItem(key));
    } catch (error) {
      console.error('Error clearing namespace:', error);
    }
  }
}

/**
 * Factory pattern implementation for creating storage instances
 * Following Dependency Inversion Principle
 */
@Injectable({
  providedIn: 'root'
})
export class StorageFactory implements IStorageFactory {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  createLocalStorage(): IStorage {
    return new BrowserStorage(typeof localStorage !== 'undefined' ? localStorage : {} as Storage, this.platformId);
  }

  createSessionStorage(): IStorage {
    return new BrowserStorage(typeof sessionStorage !== 'undefined' ? sessionStorage : {} as Storage, this.platformId);
  }
}

/**
 * Main storage service using Strategy pattern
 * Allows switching between different storage strategies
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorage {
  private currentStorage: IStorage;

  constructor(private storageFactory: StorageFactory) {
    this.currentStorage = this.storageFactory.createLocalStorage();
  }

  switchToSessionStorage(): void {
    this.currentStorage = this.storageFactory.createSessionStorage();
  }

  switchToLocalStorage(): void {
    this.currentStorage = this.storageFactory.createLocalStorage();
  }

  // Delegate all operations to current storage strategy
  getItem(key: string): string | null {
    return this.currentStorage.getItem(key);
  }

  getAllKeys(): string[] {
    return this.currentStorage.getAllKeys();
  }

  setItem(key: string, value: string): void {
    this.currentStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.currentStorage.removeItem(key);
  }

  clear(): void {
    this.currentStorage.clear();
  }

  clearNamespace(namespace: string): void {
    this.currentStorage.clearNamespace(namespace);
  }
}
