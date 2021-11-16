import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationData } from "../../types";
import { CurrentConditionData } from "../../types/interfaces/CurrentConditionData";
import { FavoriteData, FavoritesState } from "../../types/states";
import LocalStorage from "../../utils/LocalStorage";

type FavoriteMap<Data> = { [Key: string]: Data };

//These functions convert the data map from FavoriteData to LocationData.
const toLocationDataMap = (data: FavoriteMap<FavoriteData>) => Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.location]));
const toFavoriteDataMap = (data: FavoriteMap<LocationData>) => Object.fromEntries(Object.entries(data).map(([k, v]) => [k, { location: v, currentCondition: null }]));

const initialState: FavoritesState = {
    favorites: toFavoriteDataMap(LocalStorage.get("favorites") ?? {})
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        add_favorite: (state, { payload }: PayloadAction<LocationData>) => {
            state.favorites[payload.Key] = { location: payload, currentCondition: null };
            LocalStorage.set("favorites", toLocationDataMap(state.favorites));
        },
        set_current_condition: (state, { payload }: PayloadAction<{ Key: string, currentCondition: CurrentConditionData | null }>) => {
            if (!state.favorites[payload.Key]) {
                console.error(`Key "${payload.Key}" doesn't exist on favorites slice, trying to set condition to nonexistent favorite`);
                return;
            }
            state.favorites[payload.Key].currentCondition = payload.currentCondition;
        },
        remove_favorite: (state, { payload }: PayloadAction<string>) => {

            //TODO: error handling.
            delete state.favorites[payload];
            LocalStorage.set("favorites", toLocationDataMap(state.favorites));
        }
    }
})


export const favoritesSliceActions = { ...favoritesSlice.actions };

export default favoritesSlice.reducer;