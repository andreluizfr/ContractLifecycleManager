import { IPersistentStorage } from "@/infrastructure/persistentStorage/IPersistentStorage";
import { get, set, del, clear } from 'idb-keyval';

export class LocalStorageImpl implements IPersistentStorage {

  async getItem<T>(key: string): Promise<T | null> {
    return (await get(key)) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    await set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await del(key);
  }

  async clearAll(): Promise<void> {
    await clear();
  }
}
