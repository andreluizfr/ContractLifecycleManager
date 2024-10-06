import { IPersistentStorage } from "@/infrastructure/persistentStorage/IPersistentStorage";

export class LocalStorageImpl implements IPersistentStorage {

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
