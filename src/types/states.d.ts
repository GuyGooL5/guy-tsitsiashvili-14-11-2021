import { UnitSystem, FavoriteData } from '.'

export interface ConfigurationState {
    theme: "light" | "dark" | "default";
    unit: UnitSystem;
}

export interface FavoritesState {
    favorites: { [key: string]: FavoriteData };
}