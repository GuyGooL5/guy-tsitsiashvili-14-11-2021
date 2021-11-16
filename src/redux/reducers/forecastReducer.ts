import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import config from "../../config";
import { LocationData } from "../../types";
import { ForecastData } from "../../types/interfaces/ForecastData";
import { ForecastState } from "../../types/states";
import LocalStorage from "../../utils/LocalStorage";



const initialState: ForecastState = {
    location: LocalStorage.get("default_location") ?? config.defaultLocation,
    forecast: null
};

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {

        set_forecast: (state, { payload }: PayloadAction<ForecastData | null>) => {
            state.forecast = payload;
        },
        set_location: (state, { payload }: PayloadAction<LocationData>) => {
            state.location = payload;
        }
    }
})


export const forecastSliceActions = { ...forecastSlice.actions };

export default forecastSlice.reducer;