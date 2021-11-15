import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationData } from "../../types";
import { ForecastData } from "../../types/interfaces/ForecastData";
import { ForecastState } from "../../types/states";



const initialState: ForecastState = {
    LocalizedName: "Tel Aviv",
    Key: "215854",
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
            state.LocalizedName = payload.LocalizedName;
            state.Key = payload.Key;
        }
    }
})


export const forecastSliceActions = { ...forecastSlice.actions };

export default forecastSlice.reducer;