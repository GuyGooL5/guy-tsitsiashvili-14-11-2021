import { ConfigurationState, FavoritesMap } from "../types/states";

interface LocalStorageData {
    theme: ConfigurationState["theme"];
    unit: ConfigurationState["unit"];
    favorites: FavoritesMap;
}

export default class LocalStorage {

    static get<K extends keyof LocalStorageData>(key: K): LocalStorageData[K] | null {
        const data = localStorage.getItem(key);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (ignored) { return null; }
    }

    static set<K extends keyof LocalStorageData>(key: K, data: LocalStorageData[K]): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static remove<K extends keyof LocalStorageData>(...keys: K[]): void {
        for (const key of keys) localStorage.removeItem(key);
    }
}