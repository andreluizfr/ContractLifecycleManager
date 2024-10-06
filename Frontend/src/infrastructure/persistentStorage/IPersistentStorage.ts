import { StateStorage } from "zustand/middleware";

//Bridge pattern
export interface IPersistentStorage extends StateStorage{
    clearAll(): void;
}