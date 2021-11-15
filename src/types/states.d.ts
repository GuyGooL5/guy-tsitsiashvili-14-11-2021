import { UnitSystem, LocationData } from '.'
import { ForecastData } from './interfaces/ForecastData';

export interface ConfigurationState {
    theme: "light" | "dark" | "default";
    unit: UnitSystem;
    default_location: LocationData;
}

export interface FavoritesState {
    favorites: { [key: string]: LocationData };
}

export interface ForecastState {
    LocalizedName: string;
    Key: string;
    forecast: ForecastData | null;
}