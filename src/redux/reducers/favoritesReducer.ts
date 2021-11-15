import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteData } from "../../types";
import { FavoritesState } from "../../types/states";
import LocalStorage from "../../utils/LocalStorage";



const initialState: FavoritesState = {
    favorites: LocalStorage.get("favorites") ?? {}
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        add_favorite: (state, { payload }: PayloadAction<FavoriteData>) => {
            state.favorites[payload.Key] = payload;
            LocalStorage.set("favorites", state.favorites);
        },
        remove_favorite: (state, { payload }: PayloadAction<string>) => {

            //TODO: error handling.
            delete state.favorites[payload];
            LocalStorage.set("favorites", state.favorites);
        }
    }
})


export const favoritesSliceActions = { ...favoritesSlice.actions };

export default favoritesSlice.reducer;