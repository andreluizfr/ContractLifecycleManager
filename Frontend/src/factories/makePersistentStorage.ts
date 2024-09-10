import { IPersistentStorage } from "@/infrastructure/persistentStorage/IPersistentStorage";

import { LocalStorageImpl } from "@/infrastructure/persistentStorage/localStorage/PersistentStorageImpl";

//Factory method pattern
export function makePersistentStorage(): IPersistentStorage {

    const persistentStorage: IPersistentStorage = new LocalStorageImpl();

    return persistentStorage;
}