import { IPersistentStorage } from "@/infrastructure/persistentStorage/IPersistentStorage";

export class LocalStorageImpl implements IPersistentStorage {

    get<T>(key: string): T | null {

        const value = localStorage.getItem(key);

        return (value != null) ?
            JSON.parse(value) as T
            : null;
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    clearAll() {
        localStorage.clear();
    }
}