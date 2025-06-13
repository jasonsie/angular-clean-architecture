/**
 * Storage interface following Interface Segregation Principle
 * Separates different storage concerns into specific interfaces
 */

export interface IStorageReader {
  getItem(key: string): string | null;
  getAllKeys(): string[];
}

export interface IStorageWriter {
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface IStorageCleaner {
  clear(): void;
  clearNamespace(namespace: string): void;
}

export interface IStorage extends IStorageReader, IStorageWriter, IStorageCleaner {}

export interface IStorageFactory {
  createLocalStorage(): IStorage;
  createSessionStorage(): IStorage;
}
