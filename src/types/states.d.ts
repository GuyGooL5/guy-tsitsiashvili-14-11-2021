import { UnitSystem, LocationData } from '.'
import { CurrentConditionData } from './interfaces/CurrentConditionData';
import { ForecastData } from './interfaces/ForecastData';

export interface ConfigurationState {
    theme: "light" | "dark" | "default";
    unit: UnitSystem;
    default_location: LocationData;
    show_night: boolean;
}


export interface FavoriteData {
    location: LocationData;
    currentCondition: CurrentConditionData | null;
}

export interface FavoritesState {
    favorites: { [key: string]: FavoriteData; };
}

export interface ForecastState {
    location: LocationData;
    forecast: ForecastData | null;

}